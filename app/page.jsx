// app/page.jsx


import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { defaultCampusSections } from "@/lib/campusSectionDefaults";
import { getHomeProgrammeCards } from "@/lib/homeProgrammeCards";
import { defaultCarouselSlides } from "@/lib/carouselDefaults";
import { getCarouselSlides } from "@/lib/carousel";
import { getLatestUpdates } from "@/lib/latestUpdates";
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
// Server-side: fetch carousel slides directly from the DB helper
// (keeps ISR and avoids internal API roundtrip)

export default async function Home() {
  // Run all your initialization fetches concurrently on the server
  const [collegeCampus, campusSections, programmeCards, carouselSlides, latestUpdates] = await Promise.all([
    getCollegeCampus(),
    getCampusSections(),
    getHomeProgrammeCards(),
    getCarouselSlides(),
    getLatestUpdates(),
  ]);

  return (
    <HomeContent
      collegeCampus={collegeCampus}
      campusSections={campusSections}
      ugProgrammeCards={programmeCards.ugCards}
      pgProgrammeCards={programmeCards.pgCards}
      initialCarouselSlides={carouselSlides} // Pass the data cleanly into your wrapper component
      initialLatestUpdates={latestUpdates}
    />
  );
}