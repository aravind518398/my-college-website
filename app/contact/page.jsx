import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactClientContent from "@/components/ContactClientContent";
import { defaultSiteSettings } from "@/lib/siteSettingsDefaults";
import { getSiteSettings } from "@/lib/siteSettings";



function mergeContactSettings(saved = {}) {
  const defaultContactSettings = defaultSiteSettings.contact;
  const merged = { ...defaultContactSettings };

  for (const [key, value] of Object.entries(saved)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    merged[key] = value;
  }
  return merged;
}

async function getContactSettings() {
  try {
    const settings = await getSiteSettings();
    return mergeContactSettings(settings.contact || {});
  } catch (error) {
    console.warn("Using fallback defaults for contact page details during server build pass:", error.message);
    return defaultSiteSettings.contact;
  }
}

export default async function ContactPage() {
  const initialSettings = await getContactSettings();

  return (
    <>
      <Header />
      <ContactClientContent initialContactSettings={initialSettings} />
      <Footer />
    </>
  );
}