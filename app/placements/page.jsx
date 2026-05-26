import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlacementsClientContent from "@/components/PlacementsClientContent";
import { defaultPlacedStudents } from "@/lib/placementDefaults";

export const dynamic = "force-dynamic";

async function getPlacedStudents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    const response = await fetch(`${baseUrl}/api/placed-students`, {
      cache: "no-store", // Ensure it requests fresh data per request pass
    });

    if (!response.ok) return defaultPlacedStudents;

    const data = await response.json();
    if (Array.isArray(data?.students) && data.students.length) {
      return data.students;
    }
    return defaultPlacedStudents;
  } catch (error) {
    console.warn("Using fallback static defaults for placements during server setup:", error.message);
    return defaultPlacedStudents;
  }
}

export default async function PlacementsPage() {
  // Pre-fetch the dynamic dataset on the server structure before UI assembly
  const initialPlacedData = await getPlacedStudents();

  return (
    <>
      <Header />
      <PlacementsClientContent initialStudents={initialPlacedData} />
      <Footer />
    </>
  );
}