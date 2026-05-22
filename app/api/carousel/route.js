import { getCarouselSlides } from "@/lib/carousel";

export const runtime = "nodejs";

export async function GET() {
  const slides = await getCarouselSlides();

  return Response.json({ success: true, slides });
}
