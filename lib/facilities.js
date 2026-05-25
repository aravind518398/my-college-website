import { revalidatePath } from "next/cache";

import { defaultFacilitiesPage, MAX_FACILITIES } from "@/lib/facilitiesDefaults";
import { connectDB } from "@/lib/mongodb";
import FacilitiesPage from "@/models/FacilitiesPage";

export { defaultFacilitiesPage, MAX_FACILITIES };

function normalizeItem(item, index) {
  const title = String(item.title || "").trim();

  return {
    id: String(item.id || `facility-${index + 1}`).trim(),
    title,
    description: String(item.description || "").trim(),
  };
}

function normalizeHero(hero = {}) {
  return {
    eyebrow: String(hero.eyebrow || defaultFacilitiesPage.hero.eyebrow).trim(),
    title: String(hero.title || defaultFacilitiesPage.hero.title).trim(),
    description: String(hero.description || defaultFacilitiesPage.hero.description).trim(),
  };
}

export function normalizeFacilitiesPage(data = {}) {
  const items = (Array.isArray(data.items) ? data.items : [])
    .map((item, index) => normalizeItem(item, index))
    .filter((item) => item.title)
    .slice(0, MAX_FACILITIES);

  return {
    hero: normalizeHero(data.hero),
    items: items.length ? items : defaultFacilitiesPage.items,
  };
}

export async function getFacilitiesPage() {
  await connectDB();

  let record = await FacilitiesPage.findOne({ key: "page" }).lean();

  if (!record) {
    record = await FacilitiesPage.create({
      key: "page",
      ...defaultFacilitiesPage,
    });
    record = record.toObject();
  }

  return normalizeFacilitiesPage(record);
}

export async function saveFacilitiesPage(data) {
  await connectDB();

  const normalized = normalizeFacilitiesPage(data);

  await FacilitiesPage.findOneAndUpdate(
    { key: "page" },
    { $set: { key: "page", ...normalized } },
    { new: true, upsert: true }
  );

  revalidatePath("/facilities");

  return normalized;
}
