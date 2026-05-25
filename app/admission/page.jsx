import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { defaultSiteSettings } from "@/lib/siteSettingsDefaults";
import { getSiteSettings } from "@/lib/siteSettings";
import Admission from "@/components/Admission";

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
  const [collegeCampus, settings] = await Promise.all([
    getCollegeCampus(),
    getSiteSettings(),
  ]);

  const admissionPhone =
    settings.contact.admissionPhone || defaultSiteSettings.contact.admissionPhone;

  return <Admission collegeCampus={collegeCampus} admissionPhone={admissionPhone} />;
}