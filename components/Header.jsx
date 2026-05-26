import HeaderClient from "./HeaderClient";

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
    console.warn("Failed to fetch live site settings for Header:", error.message);
    return null;
  }
}

export default async function Header() {
  const settings = await getSiteSettings();

  return <HeaderClient initialSettings={settings} />;
}