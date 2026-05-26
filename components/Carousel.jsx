import CarouselClient from "./CarouselClient";
import { getCarouselSlides } from "@/lib/carousel"; // ✅ direct DB function

// Remove force-dynamic ❌
// ISR - rebuilds once per hour as safety net
export const revalidate = 3600;

export default async function Carousel() {
  const slides = await getCarouselSlides(); // ✅ direct MongoDB call

  return <CarouselClient initialSlides={slides} />;
}