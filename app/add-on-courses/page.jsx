import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAddOnCoursesPage } from "@/lib/addOnCourses";
import { faArrowRight, faClock, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Add-On Courses | KMM COLLEGE KUMBALAM",
  description:
    "Industry-focused add-on courses at K.M.M. College, Kumbalam alongside UG and PG programmes.",
};

export default async function AddOnCoursesPage() {
  const { hero, groups } = await getAddOnCoursesPage();

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#f7faf8] text-[#18213b]">
        <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[680px]">
  {/* Background Image */}
  <Image
    src="/images/kmm_college_kumbalam.webp"
    alt="KMM College campus"
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
          href="/admission" 
          className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1"
        >
          Apply for Admission
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
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
                Programmes
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#18213b] sm:text-3xl">
                Add-on options by degree
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt=""
                className="mx-auto mt-3"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
  {groups.map((group, index) => (
    <article
      key={group.id}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#179BD7]/30"
    >
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 py-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#179BD7]/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#179BD7]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#179BD7]">
            Add-On Course
          </span>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#179BD7] to-[#1ab69d] text-white shadow-lg shadow-[#179BD7]/25">
            <FontAwesomeIcon icon={faGraduationCap} className="text-lg" />
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
              {group.programmeName}
            </h3>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="px-6 py-4">
        <ul className="space-y-3">
          {group.courses.map((course, courseIndex) => (
            <li
              key={`${group.id}-${courseIndex}`}
              className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
            >
              <svg 
                className="mt-1 h-5 w-5 shrink-0 text-[#1ab69d]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="flex-1 font-medium">{course}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional Footer - Uncomment if needed */}
      
      {/* <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3">
        <p className="text-xs text-slate-600">
          <FontAwesomeIcon icon={faClock} className="mr-1.5" />
          Duration varies by course
        </p>
      </div> */}
     
    </article>
  ))}
</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
