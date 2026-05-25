import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCompass, faGraduationCap, faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { pickCollegeCampusImage } from "@/lib/collegeImageDefaults";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

async function getCollegeCampus() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return pickCollegeCampusImage(settings?.images);
  } catch {
    return pickCollegeCampusImage({});
  }
}

const helpfulLinks = [
  {
    label: "Home",
    href: "/",
    icon: faHouse,
  },
  {
    label: "Academics",
    href: "/academics",
    icon: faGraduationCap,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: faPhone,
  },
];

export default async function NotFound() {
  const collegeCampus = await getCollegeCampus();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(26,182,157,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,155,215,0.22),transparent_34%),linear-gradient(135deg,#f7fbff_0%,#eef9f7_48%,#f5f7fb_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/85 to-transparent"></div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1469b8] shadow-lg ring-1 ring-black/5">
              <FontAwesomeIcon icon={faCompass} className="text-[#1ab69d]" />
              Page not found
            </div>

            <h1 className="mt-6 text-7xl font-black leading-none text-[#18213b] sm:text-8xl lg:text-9xl">404</h1>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#18213b] sm:text-4xl lg:text-5xl">This campus path seems to be missing.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#343434] sm:text-lg">
              The page may have moved, the address may be incorrect, or the content is still being prepared. You can return to the main site or explore the most useful sections below.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="group inline-flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1">
                Back to Home
                <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a href="tel:9037002130" className="inline-flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white px-5 py-3 text-sm font-bold text-[#1469b8] shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:text-[#179BD7]">
                Contact Office
                <FontAwesomeIcon icon={faPhone} className="text-xs" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {helpfulLinks.map((item) => (
                <Link key={item.label} href={item.href} className="group flex items-center gap-3 rounded-2xl bg-white/92 p-4 font-bold text-[#18213b] shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:text-[#179BD7]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#179BD7]/10 text-[#179BD7] transition-colors duration-300 group-hover:bg-[#179BD7] group-hover:text-white">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#18213b] shadow-2xl ring-1 ring-black/5 sm:min-h-[460px] lg:min-h-[560px]">
            <Image src={collegeCampus.src} fill priority alt={collegeCampus.alt} className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/95 via-[#18213b]/35 to-transparent"></div>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/94 p-5 shadow-2xl backdrop-blur sm:inset-x-7 sm:bottom-7 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1ab69d]">KMM College</p>
              <h3 className="mt-2 text-xl font-bold leading-tight text-[#18213b] sm:text-2xl">Let&apos;s get you back to the right place.</h3>
              <p className="mt-3 text-sm leading-7 text-[#343434]">Use the navigation above or choose a quick link to continue browsing admissions, programmes, departments, and campus information.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
