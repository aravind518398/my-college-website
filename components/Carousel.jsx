import CarouselClient from "./CarouselClient";
import { defaultCarouselSlides } from "@/lib/carouselDefaults";

// Forces Next.js to bypass static caching so you always get fresh MongoDB data on reload
export const dynamic = "force-dynamic";

async function getCarouselSlides() {
  try {
    // NOTE: Because this runs on the server, relative URLs like "/api/carousel" won't work.
    // It's highly recommended to call your MongoDB query function directly here instead!
    // If using the API, you must provide an absolute URL:
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
   const response = await fetch(`${baseUrl}/api/carousel`, {
  next: { revalidate: 3600 } // Match your page's revalidation setting
});

    if (!response.ok) return defaultCarouselSlides;

    const data = await response.json();
    return Array.isArray(data?.slides) && data.slides.length ? data.slides : defaultCarouselSlides;
  } catch (error) {
    console.error("Database fetch failed, falling back to defaults:", error);
    return defaultCarouselSlides;
  }
}

export default async function Carousel() {
  const slides = await getCarouselSlides();

  return <CarouselClient initialSlides={slides} />;
}