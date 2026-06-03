import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutClient from "@/components/AboutClient";

export default function AboutPage({ collegeCampus, initialMessages }) {
  return (
    <>
      <Header />
      <AboutClient collegeCampus={collegeCampus} initialMessages={initialMessages} />
      <Footer />
    </>
  );
}
