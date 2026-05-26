// app/page.jsx

export const revalidate = 3600; // Keep your 1-hour static regeneration rule

import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { defaultCampusSections } from "@/lib/campusSectionDefaults";
import { getHomeProgrammeCards } from "@/lib/homeProgrammeCards";
import { defaultCarouselSlides } from "@/lib/carouselDefaults";
import HomeContent from "@/components/HomeContent";
import { connectDB } from "@/lib/mongodb";        
import SiteSettings from "@/models/SiteSettings"; 
import CampusSection from "@/models/CampusSection"; 

async function getCollegeCampus() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return pickCollegeCampusImage(settings?.images);
  } catch {
    return pickCollegeCampusImage({});
  }
}

async function getCampusSections() {
  try {
    await connectDB();
    const data = await CampusSection.findOne().lean();
    return Array.isArray(data?.sections) && data.sections.length
      ? data.sections
      : defaultCampusSections;
  } catch {
    return defaultCampusSections;
  }
}

// Pre-fetch your carousel data right here on the server
async function getCarouselSlides() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    // IMPORTANT: Match the page revalidation rule so Next.js doesn't throw a build conflict
    const response = await fetch(`${baseUrl}/api/carousel`, {
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) return defaultCarouselSlides;
    const data = await response.json();

    if (Array.isArray(data?.slides) && data.slides.length) {
      return data.slides;
    }
    return defaultCarouselSlides;
  } catch (error) {
    console.warn("Falling back to static defaults for home page carousel elements:", error.message);
    return defaultCarouselSlides;
  }
}

export default async function Home() {
  // Run all your initialization fetches concurrently on the server
  const [collegeCampus, campusSections, programmeCards, carouselSlides] = await Promise.all([
    getCollegeCampus(),
    getCampusSections(),
    getHomeProgrammeCards(),
    getCarouselSlides(),
  ]);

  return (
    <HomeContent
      collegeCampus={collegeCampus}
      campusSections={campusSections}
      ugProgrammeCards={programmeCards.ugCards}
      pgProgrammeCards={programmeCards.pgCards}
      initialCarouselSlides={carouselSlides} // Pass the data cleanly into your wrapper component
    />
  );
}