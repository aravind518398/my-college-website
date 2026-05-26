import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactClientContent from "@/components/ContactClientContent";
import { defaultSiteSettings } from "@/lib/siteSettingsDefaults";

export const revalidate = 3600; // Cache optimization architecture layout

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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/site-settings`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return defaultSiteSettings.contact;
    const data = await response.json();

    if (data?.settings?.contact) {
      return mergeContactSettings(data.settings.contact);
    }
    return defaultSiteSettings.contact;
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