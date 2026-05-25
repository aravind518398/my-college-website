import { revalidatePath } from "next/cache";

import {
  defaultAddOnCoursesPage,
  MAX_ADD_ON_GROUPS,
  MAX_COURSES_PER_GROUP,
} from "@/lib/addOnCoursesDefaults";
import { connectDB } from "@/lib/mongodb";
import AddOnCourses from "@/models/AddOnCourses";

export { defaultAddOnCoursesPage, MAX_ADD_ON_GROUPS, MAX_COURSES_PER_GROUP };

function cleanList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeGroup(group, index) {
  const programmeName = String(group.programmeName || "").trim();

  return {
    id: String(group.id || `group-${index + 1}`).trim(),
    programmeName,
    courses: cleanList(group.courses).slice(0, MAX_COURSES_PER_GROUP),
  };
}

function normalizeHero(hero = {}) {
  return {
    eyebrow: String(hero.eyebrow || defaultAddOnCoursesPage.hero.eyebrow).trim(),
    title: String(hero.title || defaultAddOnCoursesPage.hero.title).trim(),
    description: String(hero.description || defaultAddOnCoursesPage.hero.description).trim(),
  };
}

export function normalizeAddOnCoursesPage(data = {}) {
  const groups = (Array.isArray(data.groups) ? data.groups : [])
    .map((group, index) => normalizeGroup(group, index))
    .filter((group) => group.programmeName && group.courses.length)
    .slice(0, MAX_ADD_ON_GROUPS);

  return {
    hero: normalizeHero(data.hero),
    groups: groups.length ? groups : defaultAddOnCoursesPage.groups,
  };
}

export async function getAddOnCoursesPage() {
  await connectDB();

  let record = await AddOnCourses.findOne({ key: "page" }).lean();

  if (!record) {
    record = await AddOnCourses.create({
      key: "page",
      ...defaultAddOnCoursesPage,
    });
    record = record.toObject();
  }

  return normalizeAddOnCoursesPage(record);
}

export async function saveAddOnCoursesPage(data) {
  await connectDB();

  const normalized = normalizeAddOnCoursesPage(data);

  await AddOnCourses.findOneAndUpdate(
    { key: "page" },
    { $set: { key: "page", ...normalized } },
    { new: true, upsert: true }
  );

  revalidatePath("/add-on-courses");

  return normalized;
}
