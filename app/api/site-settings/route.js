import { getSiteSettings } from "@/lib/siteSettings";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getSiteSettings();

  return Response.json({ success: true, settings });
}
