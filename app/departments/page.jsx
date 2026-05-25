import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faArrowRight,
  faGraduationCap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { getDepartments } from "@/lib/departments";

export const dynamic = "force-dynamic";

function SectionHeader({ eyebrow, title, description, align = "center" }) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto items-center text-center" : "items-start"} mb-10 flex max-w-3xl flex-col`}>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">{eyebrow}</p>
      <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">{title}</h2>
      <Image src="/images/underline.svg" width={210} height={36} alt="" className="mt-3 h-auto w-[210px] " />
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#40506f] sm:text-base">{description}</p>
    </div>
  );
}

function FacultyAvatar({ faculty, accent }) {
  if (faculty.photo) {
    return (
      <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg shadow-[#18213b]/10">
        <Image src={faculty.photo} alt={`${faculty.name} photo`} fill className="object-cover" sizes="80px" />
      </span>
    );
  }

  return (
    <span
      className="grid h-20 w-20 shrink-0 place-items-center rounded-full text-lg font-bold text-white shadow-lg shadow-[#18213b]/10 ring-4 ring-white"
      style={{ background: `linear-gradient(135deg, ${accent}, #18213b)` }}
      aria-label={`${faculty.name} avatar`}
    >
      {faculty.initials}
    </span>
  );
}

function DepartmentQuickCard({ department }) {
  return (
    <Link
      href={`/departments#${department.id}`}
      className="group rounded-lg border border-[#dceae5] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1ab69d] hover:shadow-xl hover:shadow-[#18213b]/10"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-white" style={{ background: department.accent }}>
          <FontAwesomeIcon icon={department.icon} />
        </span>
        <FontAwesomeIcon icon={faArrowRight} className="mt-3 text-sm text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#1ab69d]" />
      </div>
      <h3 className="mt-5 text-lg font-bold leading-tight text-[#18213b]">{department.name}</h3>
      <p className="mt-2 text-sm font-semibold text-[#40506f]">{department.shortName}</p>
    </Link>
  );
}

function DepartmentSection({ department, index }) {
  return (
    <section id={department.id} className={` scroll-mt-[70px] lg:scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${index % 2 === 0 ? "bg-white" : "bg-[#f8faf7]"}`}>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg text-white shadow-lg shadow-[#18213b]/10" style={{ background: department.accent }}>
              <FontAwesomeIcon icon={department.icon} />
            </span>
            <span className={`${department.soft} rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]`}>{department.shortName}</span>
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
            Department of {department.name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#40506f] sm:text-base">{department.description}</p>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">Programmes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {department.programmes.map((programme) => (
                <span key={programme} className="rounded-full bg-[#18213b]/8 px-4 py-2 text-sm font-bold text-[#18213b]">
                  {programme}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">Focus Areas</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {department.focusAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-lg border border-[#dceae5] bg-white/80 px-4 py-3 text-sm font-semibold text-[#40506f]">
                  <span className="h-2 w-2 rounded-full" style={{ background: department.accent }} />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#dceae5] bg-white p-4 shadow-xl shadow-slate-200/70 sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">Faculty</p>
              <h3 className="mt-1 text-xl font-bold text-[#18213b]">Department Faculty</h3>
            </div>
            <span className="flex w-fit items-center gap-2 rounded-full bg-[#179BD7]/10 px-4 py-2 text-xs font-bold text-[#1469b8]">
              <FontAwesomeIcon icon={faUsers} />
              {department.faculty.length} Members
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {department.faculty.map((faculty) => (
              <article
                key={faculty.name}
                className="rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1  hover:shadow-xl hover:shadow-[#18213b]/10"
              >
                <div className="flex flex-col items-center text-center">
                  <FacultyAvatar faculty={faculty} accent={department.accent} />

                  <h4 className="mt-4 text-lg font-bold leading-tight text-[#18213b]">
                    {faculty.name}
                  </h4>

                  <p
                    className="mt-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: department.accent }}
                  >
                    {faculty.role}
                  </p>

                  {/* Info Cards */}
                  <div className="mt-4 flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between rounded-lg border border-[#d9e6f1] bg-[#f8fafc] px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#63708a]">
                        Qualification
                      </span>

                      <span className="text-sm font-semibold text-[#18213b] uppercase">
                        {faculty.qualification || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#d9e6f1] bg-[#f8fafc] px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#63708a]">
                        Experience
                      </span>

                      <span className="text-sm font-semibold text-[#18213b]">
                        {Number(faculty.experience) === 0
                          ? "Fresher"
                          : faculty.experience
                            ? `${faculty.experience} ${Number(faculty.experience) === 1 ? "Year" : "Years"
                            }`
                            : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf7] text-[#18213b]">
      <Header />

      <main className="min-h-0 flex-1">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(26,182,157,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,155,215,0.24),transparent_32%),linear-gradient(135deg,#f7fbff_0%,#eef9f7_46%,#f5f7fb_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">Academic Departments</p>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-[#18213b] sm:text-5xl lg:text-6xl">
                  Learn with focused departments and supportive faculty.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#40506f] sm:text-base">
                  Explore the academic departments of KMM College and move directly to each department from the navigation menu or the links below.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="#commerce" className="inline-flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition hover:-translate-y-1">
                    Explore Departments
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </Link>
                  <Link href="/academics" className="inline-flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white px-5 py-3 text-sm font-bold text-[#1469b8] shadow-sm ring-1 ring-[#dceae5] transition hover:-translate-y-1 hover:text-[#1ab69d]">
                    View Programmes
                    <FontAwesomeIcon icon={faGraduationCap} className="text-xs" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {departments.map((department) => (
                  <DepartmentQuickCard key={department.id} department={department} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="Departments"
            title="Choose a department"
            description="Each department section includes the main academic focus, programmes, and faculty members in a responsive layout for mobile, tablet, and desktop screens."
          />

          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <Link key={department.id} href={`#${department.id}`} className="group flex items-center gap-3 rounded-lg border border-[#dceae5] bg-[#f8faf7] p-4 transition hover:-translate-y-1 hover:border-[#1ab69d] hover:bg-white hover:shadow-lg hover:shadow-[#18213b]/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white" style={{ background: department.accent }}>
                  <FontAwesomeIcon icon={department.icon} className="text-sm" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-[#18213b]">{department.name}</span>
                  <span className="mt-0.5 block truncate text-xs font-semibold text-[#40506f]">{department.shortName}</span>
                </span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1ab69d]" />
              </Link>
            ))}
          </div>
        </section>

        {departments.map((department, index) => (
          <DepartmentSection key={department.id} department={department} index={index} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
