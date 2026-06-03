import { connectDB } from "@/lib/mongodb";
import AcademicCalendar from "@/models/AcademicCalendar";

export const defaultAcademicCalendar = {
  title: "",
  pdfUrl: "",
  pdfPublicId: "",
};

export function normalizeAcademicCalendar(calendar = {}) {
  return {
    title: String(calendar.title || "").trim(),
    pdfUrl: String(calendar.pdfUrl || calendar.href || "").trim(),
    pdfPublicId: String(calendar.pdfPublicId || calendar.publicId || "").trim(),
  };
}

export async function getAcademicCalendar() {
  try {
    await connectDB();

    const record = await AcademicCalendar.findOne({
      key: "academic-calendar",
    }).lean();

    if (!record) {
      return defaultAcademicCalendar;
    }

    return normalizeAcademicCalendar(record);
  } catch {
    return defaultAcademicCalendar;
  }
}

export async function saveAcademicCalendar(calendar) {
  await connectDB();

  const normalizedCalendar = normalizeAcademicCalendar(calendar);

  await AcademicCalendar.findOneAndUpdate(
    { key: "academic-calendar" },
    {
      $set: {
        key: "academic-calendar",
        ...normalizedCalendar,
      },
    },
    { new: true, upsert: true }
  );

  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/academics");
  } catch {}

  return normalizedCalendar;
}
