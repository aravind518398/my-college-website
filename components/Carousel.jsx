import CarouselClient from "./CarouselClient";
import { getCarouselSlides } from "@/lib/carousel"; // ✅ direct DB function




export default async function Carousel() {
  const slides = await getCarouselSlides(); // ✅ direct MongoDB call

  return <CarouselClient initialSlides={slides} />;
}