import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";
import { defaultAboutMessages } from "@/lib/aboutMessagesDefaults";

export const dynamic = "force-dynamic";

async function getAboutMessages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/about-messages`, {
      cache: "no-store",
    });

    if (!response.ok) return defaultAboutMessages;
    const data = await response.json();

    if (Array.isArray(data?.messages) && data.messages.length) {
      return data.messages;
    }
    return defaultAboutMessages;
  } catch (error) {
    console.warn("Falling back to static values for about page leadership text block elements:", error.message);
    return defaultAboutMessages;
  }
}

export default async function About() {
  // Pre-fetch leadership statements on the server canvas
  const initialMessages = await getAboutMessages();

  // Mocked or mapped campus asset dimensions
  const campusDetails = {
    src: "/images/program-cards-images/medium-shot-girl-holding-laptop.webp", // Replace with your actual campus image path if different
    alt: "KMM College Campus Building Layout",
  };

  return (
    <>
      
      <AboutPage collegeCampus={campusDetails} initialMessages={initialMessages} />
      
    </>
  );
}