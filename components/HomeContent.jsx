import Image from "next/image";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Header from "./Header";
import LatestUpdates from "./LatestUpdates";
import { faArrowRight, faGraduationCap, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cards from "./Cards";

export default function HomeContent({
  collegeCampus,
  campusSections,
  ugProgrammeCards,
  pgProgrammeCards,
  initialCarouselSlides, // <-- FIXED: Added this here to receive the array from app/page.jsx
  initialLatestUpdates,
}) {
  return (
    <div className="flex min-h-screen flex-col cursor-default">
      <Header />
      <main className="min-h-0 flex-1">
        {/* Forward the prop safely down into the client carousel instance */}
        <Carousel initialSlides={initialCarouselSlides} />
        
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(26,182,157,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,155,215,0.24),transparent_32%),linear-gradient(135deg,#f7fbff_0%,#eef9f7_46%,#f5f7fb_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent"></div>
          <div className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-[#179BD7]/10 blur-3xl"></div>
          <div className="absolute -right-28 bottom-16 h-80 w-80 rounded-full bg-[#1ab69d]/10 blur-3xl"></div>
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8 flex max-w-3xl items-center sm:mb-10">
              <div className="h-12 w-1.5 shrink-0 rounded-full bg-[#179BD7]"></div>
              <div className="ml-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1ab69d]">Welcome to</p>
                <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl uppercase">KMM College Kumbalam</h2>
              </div>
            </div>

            <div className="grid gap-6 ">
              <div className="grid overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 md:grid-cols-2">
                <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[460px]">
                  <Image
                    src={collegeCampus.src}
                    fill
                    alt={collegeCampus.alt}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/85 via-[#18213b]/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 p-4 shadow-xl backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#179BD7]">Since 2002</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-[#18213b]">Empowering students through quality education</h3>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-8">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#179BD7]/10 text-[#179BD7]">
                      <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl">Learning with purpose, values, and professional confidence.</h3>
                    <p className="mt-5 text-sm leading-7 text-[#343434] sm:text-base">An AICTE-approved, self-financing institution affiliated with M.G. University, Kottayam, prepares youth with a balanced mix of knowledge, skills, and a professional mindset, guided by ethical values. A part of the Jai Bharath Educational Foundation since 2002, we&apos;re known for pioneering education and empowering students from diverse backgrounds through innovative learning.</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#179BD7]/10 px-4 py-2 text-sm font-semibold text-[#1469b8]">AICTE Approved</span>
                    <span className="rounded-full bg-[#1ab69d]/10 px-4 py-2 text-sm font-semibold text-[#12836f]">M.G. University Affiliated</span>
                    <span className="rounded-full bg-[#18213b]/10 px-4 py-2 text-sm font-semibold text-[#18213b]">Jai Bharath Foundation</span>
                  </div>

                  <Link href="/about" className="group mt-7 flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:self-end">
                    MORE ABOUT US
                    <FontAwesomeIcon className="transition-transform duration-300 group-hover:translate-x-1" icon={faArrowRight} />
                  </Link>
                </div>
              </div>

              <LatestUpdates initialUpdates={initialLatestUpdates} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 w-full">
              <a href="/documents/AICTE-APPROVALS.pdf" target="_blank" rel="noopener noreferrer" className="group relative flex min-h-32 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#179BD7] via-[#1469b8] to-[#18213b] p-5 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[#179BD7]/40">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15"></div>
                <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/10"></div>
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35 transition-transform duration-300 group-hover:scale-110">
                  <FontAwesomeIcon icon={faStar} className="text-2xl text-yellow-300 drop-shadow" />
                </div>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Recognition</p>
                  <h3 className="mt-1 text-xl font-bold leading-tight">AICTE Approval</h3>
                </div>
              </a>

              <a href="/documents/AICTE-MANDATORY-DISCLOSURE.pdf" target="_blank" rel="noopener noreferrer" className="group relative flex min-h-32 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1ab69d] via-[#179BD7] to-[#18213b] p-5 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[#1ab69d]/40">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15"></div>
                <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/10"></div>
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35 transition-transform duration-300 group-hover:scale-110">
                  <FontAwesomeIcon icon={faStar} className="text-2xl text-yellow-300 drop-shadow" />
                </div>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Information</p>
                  <h3 className="mt-1 text-xl font-bold leading-tight">AICTE Mandatory Disclosure</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(26,182,157,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,155,215,0.24),transparent_32%),linear-gradient(135deg,#f7fbff_0%,#eef9f7_46%,#f5f7fb_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#179BD7]/10 blur-3xl"></div>
          <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#1ab69d]/10 blur-3xl"></div>
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8 flex max-w-3xl items-center sm:mb-10">
              <div className="h-12 w-1.5 shrink-0 rounded-full bg-[#179BD7]"></div>
              <div className="ml-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1ab69d]">Facilities</p>
                <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl uppercase">Campus overview</h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {campusSections.map((item) => (
                <article key={item.id} className="group overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#179BD7]/20">
                  <div className="relative min-h-[240px] overflow-hidden sm:min-h-[320px]">
                    <Image src={item.img} fill alt={item.alt} className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/90 via-[#18213b]/35 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1ab69d]">{item.label}</p>
                      <h3 className="mt-1 text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <p className="text-sm leading-7 text-[#343434] sm:text-base">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
              <div className="flex max-w-3xl items-center">
                <div className="h-12 w-1.5 shrink-0 rounded-full bg-[#179BD7]"></div>
                <div className="ml-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1ab69d]">Academics</p>
                  <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl uppercase">Programmes offered</h2>
                </div>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#343434] sm:text-base">Choose from career-focused undergraduate and postgraduate programmes designed to build strong fundamentals, practical skills, and professional confidence.</p>
            </div>

            <div className="space-y-12">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-[#18213b] sm:text-2xl">UG Programmes</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#179BD7]/40 to-transparent"></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {ugProgrammeCards.map((card) => (
                    <Cards
                      key={card.id}
                      course={card.course}
                      detail={card.detail}
                      img={card.img}
                      programId={card.programId}
                      level="ug"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-[#18213b] sm:text-2xl">PG Programmes</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#1ab69d]/40 to-transparent"></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {pgProgrammeCards.map((card) => (
                    <Cards
                      key={card.id}
                      course={card.course}
                      detail={card.detail}
                      img={card.img}
                      programId={card.programId}
                      level="pg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}