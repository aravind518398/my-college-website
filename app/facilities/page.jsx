import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getFacilitiesPage } from "@/lib/facilities";
import {
  faArrowRight,
  faBus,
  faChalkboardUser,
  faCircleCheck,
  faLaptop,
  faMicrophone,
  faSchool,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Facilities | KMM College Kumbalam",
  description:
    "Campus infrastructure and student facilities at K.M.M. College, Kumbalam.",
};

const facilityIcons = [
  faUtensils,
  faBus,
  faChalkboardUser,
  faLaptop,
  faMicrophone,
  faSchool,
  faCircleCheck,
];

function FacilityIcon({ index }) {
  const icon =
    index < facilityIcons.length
      ? facilityIcons[index]
      : faCircleCheck;

  return <FontAwesomeIcon icon={icon} className="text-xl" />;
}

export default async function FacilitiesPage() {
  const { hero, items } = await getFacilitiesPage();

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#f7faf8] text-[#18213b]">
        <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[680px]">
  {/* Background Image */}
  <Image
    src="/images/kmm_college_kumbalam.webp"
    alt="KMM College campus facilities"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-[#0f172a]/75" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/70 to-[#0f172a]/20" />

  {/* Decorative Blur */}
  <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#1ab69d]/20 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#179BD7]/20 blur-3xl" />

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[480px] sm:min-h-[560px] lg:min-h-[680px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      {/* Tag */}
      <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1ab69d]">
          {hero.eyebrow}
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
        {hero.title}
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
        {hero.description}
      </p>

      {/* Button */}
      <div className="mt-10">
        <Link 
          href="/contact" 
          className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1"
        >
          Contact the College
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-xs transition-transform duration-300 group-hover:translate-x-1" 
          />
        </Link>
      </div>
    </div>
  </div>
</section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
                On Campus
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#18213b] sm:text-3xl">
                What we offer
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt=""
                className="mx-auto mt-3"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
  {/* Header */}
  <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 py-6 sm:px-10 sm:py-8">
    <div className="inline-flex items-center gap-2 rounded-full bg-[#179BD7]/10 px-4 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#179BD7]" />
      <span className="text-xs font-semibold uppercase tracking-wider text-[#179BD7]">
        Infrastructure & Facilities
      </span>
    </div>
  </div>

  {/* Facilities Grid */}
  <div className="px-6 py-6 sm:px-10 sm:py-8">
    <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="group flex gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-[#179BD7]/30 hover:bg-white hover:shadow-md"
        >
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#179BD7] to-[#1ab69d] text-white shadow-lg shadow-[#179BD7]/20 transition-transform duration-300 group-hover:scale-105">
            <FacilityIcon index={index} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
