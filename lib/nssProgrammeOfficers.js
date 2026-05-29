
import { revalidatePath } from "next/cache";

import {
  defaultNssProgrammeOfficers,
  MAX_NSS_PROGRAMME_OFFICERS,
} from "@/lib/nssProgrammeOfficersDefaults";

import { connectDB } from "@/lib/mongodb";

import NssProgrammeOfficers from "@/models/NssProgrammeOfficers";

export {
  defaultNssProgrammeOfficers,
  MAX_NSS_PROGRAMME_OFFICERS,
};

function normalizeOfficer(officer, index) {
  const name = String(officer.name || "").trim();

  const designation = String(
    officer.designation || ""
  ).trim();

  return {
    id: String(
      officer.id || `nss-officer-${index + 1}`
    ).trim(),

    name,

    designation,

    department: String(
      officer.department || ""
    ).trim(),

    unit: String(officer.unit || "").trim(),

    image: String(officer.image || "").trim(),

    alt: String(officer.alt || "").trim(),

    description: String(
      officer.description || ""
    ).trim(),
  };
}

export function normalizeNssProgrammeOfficers(
  officers = []
) {
  return officers
    .map((officer, index) =>
      normalizeOfficer(officer, index)
    )
    .filter(
      (officer) =>
        officer.name && officer.designation
    )
    .slice(0, MAX_NSS_PROGRAMME_OFFICERS);
}

export async function getNssProgrammeOfficers() {
  try {
    await connectDB();

    let record = await NssProgrammeOfficers.findOne({
      key: "nss-programme-officers",
    }).lean();

    if (!record) {
      record = await NssProgrammeOfficers.create({
        key: "nss-programme-officers",
        officers: defaultNssProgrammeOfficers,
      });
      record = record.toObject();
    }

    const officers = normalizeNssProgrammeOfficers(record.officers);

    return officers.length ? officers : defaultNssProgrammeOfficers;
  } catch {
    return defaultNssProgrammeOfficers;
  }
}

export async function saveNssProgrammeOfficers(
  officers
) {
  await connectDB();

  const normalizedOfficers =
    normalizeNssProgrammeOfficers(officers);

  await NssProgrammeOfficers.findOneAndUpdate(
    {
      key: "nss-programme-officers",
    },

    {
      $set: {
        key: "nss-programme-officers",
        officers: normalizedOfficers,
      },
    },

    {
      new: true,
      upsert: true,
    }
  );

  revalidatePath("/co-curricular");

  return normalizedOfficers;
}
