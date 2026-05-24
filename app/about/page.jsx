import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import AboutPage from "@/components/AboutPage";

async function getCollegeCampus() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return pickCollegeCampusImage(settings?.images);
  } catch {
    return pickCollegeCampusImage({});
  }
}

export default async function About() {
  const collegeCampus = await getCollegeCampus();
  return <AboutPage collegeCampus={collegeCampus} />;
}