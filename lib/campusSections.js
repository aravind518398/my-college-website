import {
  defaultCampusSections,
  MAX_CAMPUS_SECTIONS,
} from "@/lib/campusSectionDefaults";
import { connectDB } from "@/lib/mongodb";
import CampusSection from "@/models/CampusSection";

export { defaultCampusSections, MAX_CAMPUS_SECTIONS };

function normalizeSection(section, index) {
  const title = String(section.title || "").trim();
  const img = String(section.img || "").trim();

  return {
    id: String(section.id || `campus-${index + 1}`).trim(),
    title,
    label: String(section.label || "").trim(),
    img,
    imgPublicId: String(section.imgPublicId || "").trim(),
    alt: String(section.alt || "").trim() || title,
    description: String(section.description || "").trim(),
  };
}

export function normalizeCampusSections(sections = []) {
  return sections
    .map((section, index) => normalizeSection(section, index))
    .filter((section) => section.title && section.img)
    .slice(0, MAX_CAMPUS_SECTIONS);
}

export async function getCampusSections() {
  await connectDB();

  let campusSection = await CampusSection.findOne({ key: "overview" }).lean();

  if (!campusSection) {
    campusSection = await CampusSection.create({
      key: "overview",
      sections: defaultCampusSections,
    });
    campusSection = campusSection.toObject();
  }

  const sections = normalizeCampusSections(campusSection.sections);

  if (!sections.length) {
    return defaultCampusSections;
  }

  return sections;
}

export async function saveCampusSections(sections) {
  await connectDB();

  const normalizedSections = normalizeCampusSections(sections);

  await CampusSection.findOneAndUpdate(
    { key: "overview" },
    { $set: { key: "overview", sections: normalizedSections } },
    { new: true, upsert: true }
  );

  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/");
  } catch {}

  return normalizedSections;
}
