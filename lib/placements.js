import { revalidatePath } from "next/cache";

import { defaultPlacedStudents } from "@/lib/placementDefaults";
import { connectDB } from "@/lib/mongodb";
import Placement from "@/models/Placement";

export { defaultPlacedStudents };

function normalizeStudent(student, index) {
  const title = String(student.title || "").trim();
  const image = String(student.image || "").trim();

  return {
    id: String(student.id || `placed-${index + 1}`).trim(),
    image,
    title,
    alt: String(student.alt || "").trim() || title,
  };
}

export function normalizePlacedStudents(students = []) {
  return students
    .map((student, index) => normalizeStudent(student, index))
    .filter((student) => student.title && student.image);
}

export async function getPlacedStudents() {
  try {
    await connectDB();

    let placement = await Placement.findOne({ key: "placed-students" }).lean();

    if (!placement) {
      placement = await Placement.create({
        key: "placed-students",
        students: defaultPlacedStudents,
      });
      placement = placement.toObject();
    }

    const students = normalizePlacedStudents(placement.students);

    return students.length ? students : defaultPlacedStudents;
  } catch {
    return defaultPlacedStudents;
  }
}

export async function savePlacedStudents(students) {
  await connectDB();

  const normalizedStudents = normalizePlacedStudents(students);

  await Placement.findOneAndUpdate(
    { key: "placed-students" },
    { $set: { key: "placed-students", students: normalizedStudents } },
    { new: true, upsert: true }
  );

  revalidatePath("/placements");

  return normalizedStudents;
}
