// app/page.jsx
import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { defaultCampusSections } from "@/lib/campusSectionDefaults";
import { getHomeProgrammeCards } from "@/lib/homeProgrammeCards";
import HomeContent from "@/components/HomeContent";
import { connectDB } from "@/lib/mongodb";        // your DB connection
import SiteSettings from "@/models/SiteSettings"; // your mongoose model
import CampusSection from "@/models/CampusSection"; // your mongoose model

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

export default async function Home() {
  const [collegeCampus, campusSections, programmeCards] = await Promise.all([
    getCollegeCampus(),
    getCampusSections(),
    getHomeProgrammeCards(),
  ]);

  return (
    <HomeContent
      collegeCampus={collegeCampus}
      campusSections={campusSections}
      ugProgrammeCards={programmeCards.ugCards}
      pgProgrammeCards={programmeCards.pgCards}
    />
  );
}