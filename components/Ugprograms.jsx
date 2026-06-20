"use client";

import { defaultUgDocumentsRequired, defaultUgProgrammes } from "@/lib/ugProgrammeDefaults";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DownloadPdfButton from "./DownloadPdfButton";

const FALLBACK_PROGRAMMES = defaultUgProgrammes;
const FALLBACK_DOCUMENTS = defaultUgDocumentsRequired;

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253",
    download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    check: "M5 13l4 4L19 7",
    clock: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
    users: "M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z",
    file: "M7 3h7l5 5v13H7V3zm7 0v5h5",
  };

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[name]} />
    </svg>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4">
      <div className="flex text-center text-white/70">
        <p className="text-xs font-bold uppercase ">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function SyllabusItem({ item, programme }) {
  const isAvailable = item.status === "Available";

  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${isAvailable ? programme.softAccent : "bg-slate-100 text-slate-400"}`}>
          <Icon name="file" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-[#18213b]">{item.label}</h4>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
              {item.status}
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
        </div>
      </div>

      {isAvailable ? (
        <DownloadPdfButton pdfUrl={item.href || item.pdfUrl || ""} title={item.label} />
      ) : (
        <span className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-400">
          Awaiting PDF
        </span>
      )}
    </div>
  );
}

export default function UGProgramme({ initialProgrammes = FALLBACK_PROGRAMMES, initialDocumentsRequired = FALLBACK_DOCUMENTS }) {
  const programmes = initialProgrammes;
  const documentsRequired = initialDocumentsRequired;
  const searchParams = useSearchParams();
  const programParam = searchParams.get("program");

  const [activeId, setActiveId] = useState(() =>
    programmes.some((programme) => programme.id === programParam)
      ? programParam
      : programmes[0]?.id || ""
  );

  const activeProgramme = useMemo(
     () => programmes.find((programme) => programme.id === activeId) || programmes[0],
    [activeId, programmes]
  );

  if (!activeProgramme) {
    return null;
  }

  const availableCount = (activeProgramme.syllabus || []).filter((item) => item.status === "Available").length;

  return (
    <section className="scroll-mt-[70px] lg:scroll-mt-24 bg-white px-4 py-14 sm:px-6 lg:py-20" id="ug-programme-details">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
              Syllabus & Eligibility
            </p>
            <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
              Undergraduate Programme Details
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Select a programme to view admission eligibility, syllabus availability and official downloadable PDFs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 sm:grid-cols-4">
            {programmes.map((programme) => (
              <button
                type="button"
                key={programme.id}
                onClick={() => setActiveId(programme.id)}
                className={`rounded-md px-3 py-3 text-left transition-all duration-200 ${activeProgramme.id === programme.id
                    ? `${programme.accent} text-white shadow-lg shadow-slate-300/50`
                    : "bg-white text-slate-600 hover:text-[#18213b]"
                  }`}
              >
                <span className="block text-sm font-bold">{programme.shortName}</span>
                <span className={`mt-1 block text-[11px] font-semibold ${activeProgramme.id === programme.id ? "text-white/70" : "text-slate-400"}`}>
                  {programme.programType || "Regular"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#f7faf8] shadow-xl shadow-slate-200/70 ">
          <div className={`${activeProgramme.accent} p-5 text-white sm:p-7 lg:p-8`}>
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">
                  Department of {activeProgramme.department}
                </p>
                <h3 className="mt-3 max-w-3xl text-2xl font-bold leading-tight sm:text-3xl">
                  {activeProgramme.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
                  {activeProgramme.focus}
                </p>
              </div>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                <Stat label="Duration" value={`${activeProgramme.duration} years`} />
                <Stat label="Semesters" value={activeProgramme.semesters} />
                <Stat label="Seats" value={activeProgramme.seats} />
                <Stat label="Fees / sem" value={activeProgramme.fees ? `₹${activeProgramme.fees}` : "—"} />
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
            <aside className="border-b border-slate-200 bg-white p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <h4 className="text-lg font-bold text-[#18213b]">Specialisations</h4>
              <div className="mt-4 grid gap-3">
                {(activeProgramme.specialisations || []).map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                    <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${activeProgramme.softAccent}`}>
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className={`mt-5 rounded-lg border-l-4 ${activeProgramme.borderAccent} bg-slate-50 p-4`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Syllabus PDFs
                </p>
                <p className="mt-2 text-3xl font-bold text-[#18213b]">
                  {availableCount}
                  <span className="text-base text-slate-400">/{(activeProgramme.syllabus || []).length}</span>
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Available for download now.
                </p>
              </div>
            </aside>

            <div className="p-5 sm:p-6 lg:p-8">
              <div className="grid gap-6 xl:grid-cols-2">
                <section>
                  <h4 className="text-lg font-bold text-[#18213b]">
                    Eligibility Criteria for Admission
                  </h4>
                  <div className="mt-4 grid gap-3">
                    {(activeProgramme.eligibility || []).map((item, index) => (
                      <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                        <span className={`${activeProgramme.softAccent} grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold`}>
                          {index + 1}
                        </span>
                        <p className="text-sm leading-6 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-[#18213b]">Documents Required</h4>
                  <div className="mt-4 grid gap-2">
                    {documentsRequired.map((document) => (
                      <div key={document} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                          <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        {document}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="mt-8">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-[#18213b]">Syllabus Downloads</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Official syllabus documents are provided as PDFs.
                    </p>
                  </div>
                  <span className={`${activeProgramme.softAccent} w-fit rounded-full px-3 py-1 text-xs font-bold`}>
                    {activeProgramme.shortName} 
                    {activeProgramme.programType ? ` ${activeProgramme.programType}` : " Regular"}
                  </span>
                </div>

                <div className="grid gap-3">
                              {(activeProgramme.syllabus || []).map((item) => (
                                <SyllabusItem key={item.label} item={item} programme={activeProgramme} />
                              ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
