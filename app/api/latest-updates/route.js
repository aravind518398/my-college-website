import { getLatestUpdates } from "@/lib/latestUpdates";

export const runtime = "nodejs";

export async function GET() {
  const updates = await getLatestUpdates();

  return Response.json({ success: true, updates });
}
