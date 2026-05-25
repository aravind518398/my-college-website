import { getHomeProgrammeCards } from "@/lib/homeProgrammeCards";

export const runtime = "nodejs";

export async function GET() {
  const data = await getHomeProgrammeCards();

  return Response.json({ success: true, ...data });
}
