import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import Admission from "@/components/Admission"; // move your current code here

async function getCollegeCampus() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return pickCollegeCampusImage(settings?.images);
  } catch {
    return pickCollegeCampusImage({});
  }
}

export default async function AdmissionPage() {
  const collegeCampus = await getCollegeCampus();
  return <Admission collegeCampus={collegeCampus} />;
}