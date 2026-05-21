import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faBookOpen,
  faBriefcase,
  faCalendarCheck,
  faChalkboardTeacher,
  faCircleCheck,
  faClipboardList,
  faGraduationCap,
  faHandshakeAngle,
  faLandmark,
  faPeopleGroup,
  faShieldHalved,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const conductGroups = [
  {
    title: "Working Hours & Attendance",
    icon: faCalendarCheck,
    points: [
      "College office, departments and the library shall work on all days except holidays from 9.00 AM to 4.00 PM.",
      "All faculty members have to mark the attendance twice a day: before 9.00 AM in the morning and from 3.00 PM onwards in the evening.",
      "All non-teaching staff have to mark the attendance twice a day: before 8.30 AM in the morning and from 4.00 PM onwards in the evening.",
      "All staff members have to be in the College during working hours and follow the proper dress code.",
    ],
  },
  {
    title: "Academic Duties",
    icon: faChalkboardTeacher,
    points: [
      "Faculty members have to handle theory, laboratory and practical sessions.",
      "Invigilation in internal and university examinations, supervision of students' project work, evaluation of answer scripts and project reports, and mentoring of students are mandatory for all faculty members.",
      "All faculties should be actively involved in curricular, co-curricular and extracurricular activities.",
      "Faculty members have to take active participation in conducting value added courses to enhance students' employability.",
    ],
  },
  {
    title: "Campus Discipline & Ethics",
    icon: faShieldHalved,
    points: [
      "Teachers hold the responsibility of maintaining the general discipline of the campus, and anything inappropriate should be reported to the Principal.",
      "The staff members are prohibited from accepting valuable gifts in any form from students, parents, or organizations having official transactions with the College.",
      "All correspondences to the management have to be routed through proper channels.",
      "All teachers should keep the Code of Professional Ethics for University and College Teachers given by UGC and other statutory bodies from time to time.",
    ],
  },
  {
    title: "Professional Growth & Service",
    icon: faBriefcase,
    points: [
      "Staff members are encouraged to take up consultancy, extension and outreach activities with the prior approval of the management.",
      "Faculty members should continuously update their knowledge by making use of print and digital resources available in the library.",
      "Each faculty member with teaching experience of more than 3 years has to publish at least one research paper and attend one seminar or webinar per year.",
    ],
  },
  {
    title: "Leave & Institutional Rules",
    icon: faClipboardList,
    points: [
      "Staff members have to avail leave with prior written permission from the HOD and the Principal. Leave can be informed over phone in case of emergency.",
      "The Principal has the right to prevent any staff member from availing a portion or the whole of vacation if the service of the particular staff member is considered essential.",
      "Faculty members have to abide by the rules and regulations of the institution framed from time to time for the effective functioning of the College.",
    ],
  },
];

const quickStats = [
  { label: "Working Hours", value: "9 AM - 4 PM", icon: faBookOpen },
  { label: "Faculty Attendance", value: "Twice Daily", icon: faUserTie },
  { label: "Core Focus", value: "Holistic Growth", icon: faGraduationCap },
];

export default function CodeOfConductPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8faf7] text-[#18213b]">
        <section className="relative isolate overflow-hidden px-4 py-14 sm:px-6 lg:py-20">
          <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-[#1ab69d]/15 blur-2xl" />
          <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#ba3e3e]/10 blur-2xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#1ab69d]/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d] shadow-sm">
                Employee Guidelines
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Employee Code of Conduct
              </h1>
              <Image
                src="/images/underline.svg"
                width={210}
                height={40}
                alt="Decorated underline"
                className="mt-4 "
              />
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-lg">
                The teachers should uphold the vision and mission of the
                College, and work for the holistic development of the students.
                These guidelines help every staff member serve with discipline,
                integrity and academic responsibility.
              </p>
            </div>

            <div className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl backdrop-blur sm:p-7">
              <div className="rounded-2xl bg-[#18213b] p-6 text-white sm:p-8">
                <FontAwesomeIcon
                  icon={faLandmark}
                  className="text-5xl text-[#1ab69d]"
                />
                <h2 className="mt-6 text-2xl font-semibold">
                  Objectives
                </h2>
                <p className="mt-4 leading-8 text-white/80">
                  To build a responsible campus culture where every employee
                  contributes to student growth, institutional excellence,
                  professional ethics and smooth academic functioning.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-[#f8faf7] p-4"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-xl text-[#1ab69d]"
                    />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#18213b]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Conduct Policy
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-4xl">
                Responsibilities expected from teaching and non-teaching staff
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                The following code brings together attendance, academic,
                administrative, ethical and professional responsibilities in a
                clear format for everyday reference.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {conductGroups.map((group, index) => (
                <article
                  key={group.title}
                  className={`rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    index === 0
                      ? "border-[#18213b] bg-[#18213b] text-white lg:row-span-2"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                        index === 0
                          ? "bg-white/10 text-[#1ab69d]"
                          : "bg-[#1ab69d]/12 text-[#1ab69d]"
                      }`}
                    >
                      <FontAwesomeIcon icon={group.icon} className="text-xl" />
                    </span>
                    <div>
                      <p
                        className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          index === 0 ? "text-white/55" : "text-slate-400"
                        }`}
                      >
                        Section {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-7 space-y-4">
                    {group.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-7">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className={`mt-1 shrink-0 ${
                            index === 0 ? "text-[#1ab69d]" : "text-[#1ab69d]"
                          }`}
                        />
                        <span
                          className={
                            index === 0 ? "text-white/82" : "text-slate-700"
                          }
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#18213b] shadow-2xl">
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
              <div className="flex items-center gap-4 text-white">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#1ab69d] text-2xl">
                  <FontAwesomeIcon icon={faHandshakeAngle} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                    Commitment
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                    A shared standard of conduct
                  </h2>
                </div>
              </div>
              <p className="leading-8 text-white/75">
                Every member of staff is expected to support the effective
                functioning of the College, respect institutional procedures,
                guide students responsibly, and contribute to a disciplined,
                inclusive and academically vibrant campus.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
