import FooterClient from "./FooterClient";

export const dynamic = "force-dynamic";

async function getSiteSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    const response = await fetch(`${baseUrl}/api/site-settings`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data?.settings || null;
  } catch (error) {
    // This catches the "Failed to fetch" safely during boot up transitions
    console.warn("Using fallback local defaults for Footer during server setup:", error.message);
    return null;
  }
}

export default async function Footer() {
  const settings = await getSiteSettings();
  return <FooterClient initialSettings={settings} />;
}