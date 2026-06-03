import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import AboutPage from "@/components/AboutPage";
import { getAboutMessages } from "@/lib/aboutMessages";

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
  const [collegeCampus, messages] = await Promise.all([
    getCollegeCampus(),
    getAboutMessages(),
  ]);

  return <AboutPage collegeCampus={collegeCampus} initialMessages={messages} />;
}