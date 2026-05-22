import { getPlacedStudents } from "@/lib/placements";

export const runtime = "nodejs";

export async function GET() {
  const students = await getPlacedStudents();

  return Response.json({ success: true, students });
}
