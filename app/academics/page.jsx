import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UGProgramme from "../../components/Ugprograms";
import { getUgProgrammes } from "@/lib/ugProgrammes";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const pgProgrammes = [
  { id: 1, program: "MSc", specialisation: "Psychology", seats: 40 },
  { id: 2, program: "MBA", specialisation: "General Management", seats: 40 },
  { id: 3, program: "MCA", specialisation: "Computer Applications", seats: 40 },
];

const ugCalendar = [
  { sem: "I & II (2024-25 Admission)", start: "-", end: "-", remarks: "Will inform later", holiday: false },
  { sem: "III (2023-24 Admission)", start: "03.06.2024", end: "30.10.2024", remarks: "95 Working Days", holiday: false },
  { sem: "IV (2023-24 Admission)", start: "01.11.2024", end: "28.03.2025", remarks: "98 Working Days", holiday: false },
  { sem: "V (2022-23 Admission)", start: "03.06.2024", end: "30.10.2024", remarks: "95 Working Days", holiday: false },
  { sem: "VI (2022-23 Admission)", start: "01.11.2024", end: "28.03.2025", remarks: "98 Working Days", holiday: false },
  { sem: "Onam Holidays *", start: "13.09.2024", end: "22.09.2024", remarks: "Re-opens 23.09.2024", holiday: true },
  { sem: "Christmas Holidays *", start: "20.12.2024", end: "29.12.2024", remarks: "Re-opens 30.12.2024", holiday: true },
  { sem: "Mid Summer Vacation", start: "01.04.2025", end: "31.05.2025", remarks: "-", holiday: true },
];

const pgCalendar = [
  { sem: "I & II (2024-25 Admission)", start: "-", end: "-", remarks: "Will inform later", holiday: false },
  { sem: "III (2023-24 Admission)", start: "03.06.2024", end: "30.10.2024", remarks: "95 Working Days", holiday: false },
  { sem: "IV (2023-24 Admission)", start: "01.11.2024", end: "28.03.2025", remarks: "98 Working Days", holiday: false },
  { sem: "Onam Holidays *", start: "13.09.2024", end: "22.09.2024", remarks: "Re-opens 23.09.2024", holiday: true },
  { sem: "Christmas Holidays *", start: "20.12.2024", end: "29.12.2024", remarks: "Re-opens 30.12.2024", holiday: true },
  { sem: "Mid Summer Vacation", start: "01.04.2025", end: "31.05.2025", remarks: "-", holiday: true },
];

const workingDays = [
  { month: "June 2024", days: 19 },
  { month: "July 2024", days: 22 },
  { month: "Aug 2024", days: 18 },
  { month: "Sep 2024", days: 15 },
  { month: "Oct 2024", days: 21 },
  { month: "Nov 2024", days: 21 },
  { month: "Dec 2024", days: 16 },
  { month: "Jan 2025", days: 22 },
  { month: "Feb 2025", days: 19 },
  { month: "Mar 2025", days: 20 },
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <Image
        src="/images/underline.svg"
        width={210}
        height={36}
        alt="Decorated underline"
        className="mt-3 "
      />
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ProgrammeSection({ title, description, programmes, accent, accentSoft, label }) {
  const totalSeats = programmes.reduce((sum, item) => sum + item.seats, 0);

  return (
    <section className="px-4 py-14 sm:px-6 lg:py-20">
      <SectionHeader title={title} description={description} />

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[280px_1fr]">
        <aside className={`${accent} p-5 text-white sm:p-6 lg:p-8`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/65">
              {label}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              Academic Programmes
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-1">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="text-3xl font-bold">{programmes.length}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                Programmes
              </p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="text-3xl font-bold">{totalSeats}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                Total Seats
              </p>
            </div>
          </div>
        </aside>

        <div className="p-4 sm:p-6">
          <div className="hidden overflow-hidden rounded-lg border border-slate-200 md:block">
            <table className="w-full text-left text-sm">
              <thead className={`${accent} text-xs uppercase tracking-[0.16em] text-white`}>
                <tr>
                  <th className="px-5 py-4">Sl No</th>
                  <th className="px-5 py-4">Name of Program</th>
                  <th className="px-5 py-4">Specialisation</th>
                  <th className="px-5 py-4 text-right">No of Seats</th>
                  <th className="px-5 py-4 text-right">Fees</th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-100 last:border-b-0 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-5 py-4 font-bold text-[#18213b]">{row.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{row.program}</td>
                    <td className="px-5 py-4 text-slate-600">{row.specialisation}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`${accentSoft} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>
                        {row.seats} Seats
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-[#18213b]">
                      {row.fees ? `₹${row.fees}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {programmes.map((row) => (
              <article key={row.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      Programme {row.id}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#18213b]">{row.program}</h3>
                  </div>
                  <span className={`${accentSoft} shrink-0 rounded-full px-3 py-1 text-xs font-bold`}>
                    {row.seats} Seats
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{row.specialisation}</p>
                <p className="mt-3 text-sm font-semibold text-[#18213b]">Fees: {row.fees ? `₹${row.fees}` : "—"}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarIcon({ type }) {
  if (type === "building") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function CalendarTable({ title, rows, accent, textAccent, holidayTone, icon }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className={`${accent} flex flex-col gap-3 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
            <CalendarIcon type={icon} />
          </span>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          2024-25
        </span>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.14em] text-slate-700">
            <tr>
              <th className="px-5 py-4">Semester</th>
              <th className="px-5 py-4">Date of Commencement</th>
              <th className="px-5 py-4">Date of Closing</th>
              <th className="px-5 py-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.sem}-${index}`}
                className={`border-b border-slate-100 last:border-b-0 ${
                  row.holiday ? holidayTone : index % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className={`px-5 py-4 font-bold ${textAccent}`}>{row.sem}</td>
                <td className="px-5 py-4 text-slate-600">{row.start}</td>
                <td className="px-5 py-4 text-slate-600">{row.end}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${row.holiday ? "bg-white text-slate-700" : `${accent} text-white`}`}>
                    {row.remarks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {rows.map((row, index) => (
          <div
            key={`${row.sem}-mobile-${index}`}
            className={`rounded-lg border p-4 ${
              row.holiday ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className={`text-sm font-bold leading-6 ${textAccent}`}>{row.sem}</h4>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                row.holiday ? "bg-amber-200 text-amber-900" : `${accent} text-white`
              }`}>
                {row.remarks}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Start
                </p>
                <p className="mt-1 font-semibold text-slate-700">{row.start}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Closing
                </p>
                <p className="mt-1 font-semibold text-slate-700">{row.end}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default async function AcademicsPage() {
  const { tableRows: ugProgrammes } = await getUgProgrammes();

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#f7faf8] text-[#18213b]">
        <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[680px]">
  {/* Background Image */}
  <Image
    src="/images/peoples/banner-03.webp"
    alt="Students in an academic laboratory"
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
          KMM College
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
        Academic Excellence
        <span className="mt-2 block bg-gradient-to-l from-[#179BD7] to-[#1ab69d] bg-clip-text text-transparent">
  For Your Future
</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
        Explore undergraduate and postgraduate programmes, semester
        schedules, academic resources, holidays, and the official
        academic calendar designed to support your educational journey.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/academics#ug-programme-details" className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1">
              Explore Programmes
              <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

        <Link href="/academics#academic-calendar" className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white/12 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#18213b]">
               Academic Calendar
            </Link>
      </div>
    </div>
  </div>
</section>
    <div id="ug-programmes" className="scroll-mt-14">
        <ProgrammeSection
          id="ug-programmes"
          title="UG Programmes"
          description="Undergraduate programmes designed for focused learning, practical growth and future leadership."
          programmes={ugProgrammes}
          accent="bg-[#18213b]"
          accentSoft="bg-[#18213b]/10 text-[#18213b]"
          label="Undergraduate"
        />
    </div>

    <Suspense fallback={<div className="h-96 bg-white" />}>
      <UGProgramme />
    </Suspense>

        <div className="bg-white scroll-mt-14" id="pg-programmes">
          <ProgrammeSection
            title="PG Programmes"
            description="Postgraduate programmes for advanced academic excellence and professional readiness."
            programmes={pgProgrammes}
            accent="bg-[#1ab69d]"
            accentSoft="bg-[#1ab69d]/12 text-[#087a68]"
            label="Postgraduate"
          />
        </div>

        <section  className=" px-4 py-14 sm:px-6 lg:py-20 scroll-mt-14" id="academic-calendar">
          <SectionHeader
            eyebrow="Mahatma Gandhi University"
            title="Academic Calendar"
            description="Academic schedule for UG and PG programmes for the 2024-25 academic year."
          />

          <div className="mx-auto grid max-w-6xl gap-6 lg:gap-8">
            <CalendarTable
              title="UG Programme"
              rows={ugCalendar}
              accent="bg-[#18213b]"
              textAccent="text-[#18213b]"
              holidayTone="bg-amber-50"
              icon="book"
            />

            <CalendarTable
              title="PG Programme"
              rows={pgCalendar}
              accent="bg-[#1ab69d]"
              textAccent="text-[#087a68]"
              holidayTone="bg-teal-50"
              icon="building"
            />

            <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
              <div className="flex items-center gap-3 bg-[#224f86] px-4 py-4 text-white sm:px-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold">Working Days - 2024-25</h3>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {workingDays.map((item) => (
                    <div key={item.month} className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-center">
                      <p className="text-3xl font-bold text-[#224f86]">{item.days}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{item.month}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg bg-[#224f86] p-5 text-center text-white sm:flex sm:items-center sm:justify-between sm:text-left">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                      Total Working Days
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      June 2024 to March 2025
                    </p>
                  </div>
                  <p className="mt-3 text-4xl font-bold sm:mt-0">193</p>
                </div>
              </div>
            </article>

            <div className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">
                  Official Notification
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#18213b]">
                  Academic Calendar 2024-25
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Official notification from Mahatma Gandhi University, Kottayam.
                </p>
              </div>

              <a
                href="/documents/Academic-Calendar_2024-25).pdf"
                download="Academic-Calendar-2024-25.pdf"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#18213b] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1ab69d] sm:w-auto"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
