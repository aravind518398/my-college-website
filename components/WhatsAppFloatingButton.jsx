import WhatsAppFloatingButtonClient from "@/components/WhatsAppFloatingButtonClient";
import { getSiteSettings, getWhatsappHref } from "@/lib/siteSettings";

export default async function WhatsAppFloatingButton() {
  const settings = await getSiteSettings();

  return <WhatsAppFloatingButtonClient whatsappHref={getWhatsappHref(settings)} />;
}
