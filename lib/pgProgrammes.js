import { revalidatePath } from "next/cache";

import {
  defaultPgDocumentsRequired,
  defaultPgProgrammes,
} from "@/lib/pgProgrammeDefaults";
import { connectDB } from "@/lib/mongodb";
import PgProgramme from "@/models/PgProgramme";

export { defaultPgDocumentsRequired, defaultPgProgrammes };

function cleanList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSyllabusItem(item = {}) {
  return {
    label: String(item.label || "").trim(),
    detail: String(item.detail || "").trim(),
    href: String(item.href || "").trim(),
    pdfPublicId: String(item.pdfPublicId || "").trim(),
    pdfTitle: String(item.pdfTitle || item.title || item.label || "").trim(),
    status: String(item.status || "Coming soon").trim() || "Coming soon",
  };
}

function normalizeProgramme(programme, index) {
  const id = String(programme.id || `pg-programme-${index + 1}`).trim();
  const shortName = String(programme.shortName || "").trim();
  const title = String(programme.title || "").trim();
  const focus = String(programme.focus || "").trim();

  return {
    id,
    shortName,
    title,
    programType: String(programme.programType || programme.programmeType || "").trim(),
    department: String(programme.department || "").trim(),
    focus,
    seats: Number(programme.seats) || 0,
    fees: Number(programme.fees) || 0,
    duration: String(programme.duration || "").trim(),
    semesters: Number(programme.semesters) || 0,
    accent: String(programme.accent || "bg-[#1ab69d]").trim(),
    softAccent: String(programme.softAccent || "bg-[#1ab69d]/12 text-[#087a68]").trim(),
    borderAccent: String(programme.borderAccent || "border-[#1ab69d]").trim(),
    eligibility: cleanList(programme.eligibility),
    specialisations: cleanList(programme.specialisations || []),
    syllabus: (Array.isArray(programme.syllabus) ? programme.syllabus : [])
      .map(normalizeSyllabusItem)
      .filter((item) => item.label),
  };
}

export function normalizePgProgrammes(programmes = []) {
  return programmes
    .map((programme, index) => normalizeProgramme(programme, index))
    .filter((programme) => programme.id && programme.shortName && programme.title);
}

export function toPgProgrammeTableRows(programmes = []) {
  return programmes.map((programme, index) => ({
    id: index + 1,
    shortName: programme.shortName,
    programType: programme.programType,
    department: programme.department,
    seats: programme.seats,
    fees: programme.fees || 0,
  }));
}

function buildPgProgrammeResponse(programmes, documentsRequired) {
  const resolvedProgrammes = programmes.length ? programmes : defaultPgProgrammes;
  const resolvedDocuments = documentsRequired.length
    ? documentsRequired
    : defaultPgDocumentsRequired;

  return {
    programmes: resolvedProgrammes,
    documentsRequired: resolvedDocuments,
    tableRows: toPgProgrammeTableRows(resolvedProgrammes),
  };
}

export async function getPgProgrammes() {
  try {
    await connectDB();

    let record = await PgProgramme.findOne({ key: "pg" }).lean();

    if (!record) {
      record = await PgProgramme.create({
        key: "pg",
        programmes: defaultPgProgrammes,
        documentsRequired: defaultPgDocumentsRequired,
      });
      record = record.toObject();
    }

    const programmes = normalizePgProgrammes(record.programmes);
    const documentsRequired = cleanList(record.documentsRequired);

    return buildPgProgrammeResponse(programmes, documentsRequired);
  } catch {
    return buildPgProgrammeResponse(defaultPgProgrammes, defaultPgDocumentsRequired);
  }
}

export async function savePgProgrammes({ programmes, documentsRequired }) {
  await connectDB();

  const normalizedProgrammes = normalizePgProgrammes(programmes);
  const normalizedDocuments = cleanList(documentsRequired);

  await PgProgramme.findOneAndUpdate(
    { key: "pg" },
    {
      $set: {
        key: "pg",
        programmes: normalizedProgrammes,
        documentsRequired: normalizedDocuments,
      },
    },
    { new: true, upsert: true }
  );

  revalidatePath("/academics");

  return {
    programmes: normalizedProgrammes,
    documentsRequired: normalizedDocuments,
    tableRows: toPgProgrammeTableRows(normalizedProgrammes),
  };
}
