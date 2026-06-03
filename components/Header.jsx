import HeaderClient from "@/components/HeaderClient";
import { getSiteSettings } from "@/lib/siteSettings";

function toClientData(value) {
  return JSON.parse(JSON.stringify(value));
}

export default async function Header() {
  const settings = await getSiteSettings();

  return <HeaderClient initialSettings={toClientData(settings)} />;
}
