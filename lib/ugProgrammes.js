import { revalidatePath } from "next/cache";

import {
  defaultUgDocumentsRequired,
  defaultUgProgrammes,
} from "@/lib/ugProgrammeDefaults";
import { connectDB } from "@/lib/mongodb";
import UgProgramme from "@/models/UgProgramme";

export { defaultUgDocumentsRequired, defaultUgProgrammes };

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
    status: String(item.status || "Not Available").trim() || "Not Available",
  };
}

function normalizeProgramme(programme, index) {
  const id = String(programme.id || `ug-programme-${index + 1}`).trim();
  const shortName = String(programme.shortName || "").trim();
  const title = String(programme.title || "").trim();
  const focus = String(programme.focus || "").trim();

  return {
    id,
    shortName,
    title,
    programType: String(programme.programType || programme.programmeType || "Regular").trim(),
    specialisations: cleanList(programme.specialisations || []),
    department: String(programme.department || "").trim(),
    focus,
    seats: Number(programme.seats) || 0,
    fees: Number(programme.fees) || 0,
    duration: String(programme.duration || "").trim(),
    semesters: Number(programme.semesters) || 0,
    accent: String(programme.accent || "bg-[#18213b]").trim(),
    softAccent: String(programme.softAccent || "bg-[#18213b]/10 text-[#18213b]").trim(),
    borderAccent: String(programme.borderAccent || "border-[#18213b]").trim(),
    eligibility: cleanList(programme.eligibility),
    syllabus: (Array.isArray(programme.syllabus) ? programme.syllabus : [])
      .map(normalizeSyllabusItem)
      .filter((item) => item.label),
  };
}

export function normalizeUgProgrammes(programmes = []) {
  return programmes
    .map((programme, index) => normalizeProgramme(programme, index))
    .filter((programme) => programme.id && programme.shortName && programme.title);
}

export function toUgProgrammeTableRows(programmes = []) {
  return programmes.map((programme, index) => ({
    id: index + 1,
    shortName: programme.shortName,
    program: programme.program,
    programType: programme.programType,
    department: programme.department,
    seats: programme.seats,
    fees: programme.fees || 0,
  }));
}

function buildUgProgrammeResponse(programmes, documentsRequired) {
  const resolvedProgrammes = programmes.length ? programmes : defaultUgProgrammes;
  const resolvedDocuments = documentsRequired.length
    ? documentsRequired
    : defaultUgDocumentsRequired;

  return {
    programmes: resolvedProgrammes,
    documentsRequired: resolvedDocuments,
    tableRows: toUgProgrammeTableRows(resolvedProgrammes),
  };
}

export async function getUgProgrammes() {
  try {
    await connectDB();

    let record = await UgProgramme.findOne({ key: "ug" }).lean();

    if (!record) {
      record = await UgProgramme.create({
        key: "ug",
        programmes: defaultUgProgrammes,
        documentsRequired: defaultUgDocumentsRequired,
      });
      record = record.toObject();
    }

    const programmes = normalizeUgProgrammes(record.programmes);
    const documentsRequired = cleanList(record.documentsRequired);

    return buildUgProgrammeResponse(programmes, documentsRequired);
  } catch {
    return buildUgProgrammeResponse(defaultUgProgrammes, defaultUgDocumentsRequired);
  }
}

export async function saveUgProgrammes({ programmes, documentsRequired }) {
  await connectDB();

  const normalizedProgrammes = normalizeUgProgrammes(programmes);
  const normalizedDocuments = cleanList(documentsRequired);

  await UgProgramme.findOneAndUpdate(
    { key: "ug" },
    {
      $set: {
        key: "ug",
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
    tableRows: toUgProgrammeTableRows(normalizedProgrammes),
  };
}
