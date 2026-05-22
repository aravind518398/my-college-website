"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faBriefcase,
  faBullhorn,
  faBuilding,
  faChalkboardTeacher,
  faEnvelope,
  faHandshake,
  faRoute,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { defaultPlacedStudents } from "@/lib/placementDefaults";
import { useEffect, useState } from "react";

const highlights = [
  { value: "Career", label: "guidance and mentoring", icon: faRoute },
  { value: "Industry", label: "connects and hiring drives", icon: faBuilding },
  { value: "Training", label: "sessions at regular intervals", icon: faChalkboardTeacher },
];

const supportAreas = [
  {
    title: "Career Guidance",
    description:
      "Students receive structured guidance to understand career paths, prepare profiles, and identify roles that match their strengths.",
    icon: faUserGraduate,
  },
  {
    title: "Employer Partnerships",
    description:
      "The cell works with companies, industries, and alumni to create meaningful internship and employment opportunities.",
    icon: faHandshake,
  },
  {
    title: "Placement Updates",
    description:
      "Regular communication through college channels helps students stay informed about drives, training sessions, and opportunities.",
    icon: faBullhorn,
  },
];

const placementProcess = [
  "Skill-building and aptitude training",
  "Resume, interview, and group discussion preparation",
  "Campus drives, internships, and employer interactions",
  "Continuous updates through placement communication channels",
];

function SectionTitle({ kicker, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
        {kicker}
      </p>
      <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <Image
        src="/images/underline.svg"
        width={210}
        height={36}
        alt="Decorated underline"
        className="mx-auto mt-3 "
      />
      {description && (
        <p className="mt-4 text-sm leading-6 text-[#40506f] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Placements() {
  const [placedStudents, setPlacedStudents] = useState(defaultPlacedStudents);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/placed-students")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data?.students) && data.students.length) {
          setPlacedStudents(data.students);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#f8faf7] text-[#18213b]">
        <section className="relative bg-white px-4 py-12 sm:px-6 lg:py-20 ">
          <div className="absolute inset-x-0 top-0 h-1/2  " />

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#10172b] shadow-2xl shadow-[#18213b]/20 lg:grid lg:grid-cols-[1.05fr_0.95fr] border border-[#dceae5] ">
            <div className="p-6 text-white sm:p-8 lg:p-12 ">
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                Placement & Training Cell
              </p>
              <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                From campus training to career opportunities.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">
                The Placement and Training Cell helps students prepare for
                internships and employment through guidance, skill-building,
                employer connections, alumni support, and timely placement
                updates.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-4"
                  >
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#1ab69d] text-white">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="mailto:placements@kmmcollege.edu.in"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#18213b] transition hover:bg-[#1ab69d] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#1ab69d]/25"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                placements@kmmcollege.edu.in
              </a>
            </div>

            <div className="relative bg-[#f8faf7] p-6 sm:p-8 lg:p-10">
              <div className="grid h-full gap-5">
                <div className="rounded-[24px] border border-[#dceae5] bg-white p-5 shadow-xl shadow-[#18213b]/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                        Career Pipeline
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-[#18213b]">
                        Prepare. Connect. Place.
                      </h2>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#18213b] text-white">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {placementProcess.slice(0, 3).map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-2xl bg-[#f8faf7] p-4"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1ab69d] text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-sm font-semibold leading-6 text-[#40506f]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="overflow-hidden rounded-[24px] bg-white shadow-xl shadow-[#18213b]/10">
                    <Image
                      src="/images/close-up-graduation-certificate.png"
                      width={360}
                      height={440}
                      alt="Graduate holding a certificate"
                      priority
                      className="h-full min-h-[250px] w-full object-cover"
                    />
                  </div>
                  <div className="rounded-[24px] bg-[#18213b] p-5 text-white shadow-xl shadow-[#18213b]/15">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                      Student Focus
                    </p>
                    <p className="mt-4 text-2xl font-bold leading-snug">
                      Confidence for interviews, drives, internships, and first
                      jobs.
                    </p>
                    <div className="mt-6 flex -space-x-5">
                      {placedStudents.map((student) => (
                        <div
                          key={student.id}
                          className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-[#18213b] bg-white"
                        >
                          <Image
                            src={student.image}
                            alt={student.alt}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                What We Do
              </p>
              <h2 className="max-w-2xl text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
                A practical support system from preparation to placement.
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt="Decorated underline"
                className="mt-3 "
              />
              <p className="mt-5 text-sm leading-7 text-[#40506f] sm:text-base">
                Through regular placement drives, training sessions, employer
                relationships, and alumni networks, the cell helps students
                explore a diverse range of employment options and prepare for
                professional expectations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportAreas.map((area, index) => (
                <article
                  key={area.title}
                  className={`rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-6 shadow-sm ${
                    index === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white text-[#12826f] shadow-[0_10px_22px_-18px_rgba(24,33,59,0.7)]">
                    <FontAwesomeIcon icon={area.icon} className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-[#18213b]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#40506f]">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[28px] border border-[#d6e8e2] bg-[#18213b] shadow-[0_24px_60px_-40px_rgba(24,33,59,0.75)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] sm:min-h-[360px] lg:min-h-full">
                <Image
                  src="/images/close-up-graduation-certificate.png"
                  alt="Graduate holding a certificate"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="p-6 text-white sm:p-8 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                  Preparation Path
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Training that keeps students placement-ready.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                  The placement cell organizes focused sessions at regular
                  intervals so students can build confidence, sharpen skills, and
                  respond quickly when opportunities arrive.
                </p>
                <div className="mt-8 grid gap-3">
                  {placementProcess.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1ab69d] text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="self-center text-sm font-semibold leading-6 text-white/90 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              kicker="Placed Students"
              title="Students placed with various companies"
              description="A glimpse of recent placement achievements shared by the Placement and Training Cell."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {placedStudents.map((student) => (
                <article
                  key={student.id}
                  className="group overflow-hidden rounded-2xl border border-[#dceae5] bg-[#f8faf7] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#18213b]/10"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white">
                    <Image
                      src={student.image}
                      alt={student.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="border-t border-[#dceae5] bg-white p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1ab69d]/12 text-[#12826f]">
                        <FontAwesomeIcon icon={faBriefcase} />
                      </span>
                      <h3 className="text-base font-bold text-[#18213b]">
                        {student.title}
                      </h3>
                    </div>
                  </div>
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
