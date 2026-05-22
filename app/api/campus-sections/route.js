import { getCampusSections } from "@/lib/campusSections";

export const runtime = "nodejs";

export async function GET() {
  const sections = await getCampusSections();

  return Response.json({ success: true, sections });
}
