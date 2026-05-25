import { getAboutMessages } from "@/lib/aboutMessages";

export const runtime = "nodejs";

export async function GET() {
  const messages = await getAboutMessages();

  return Response.json({ success: true, messages });
}
