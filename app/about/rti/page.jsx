import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faBuildingColumns,
  faCalendarDays,
  faCircleCheck,
  faClock,
  faEnvelope,
  faExternalLinkAlt,
  faFileCircleCheck,
  faGlobe,
  faGavel,
  faLocationDot,
  faPhone,
  faScaleBalanced,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const institutionDetails = [
  { label: "Name of the Institution", value: "KMM College, Kumbalam" },
  {
    label: "Address",
    value: "KMM College, Kumbalam P O Panangad, Cochin, Kerala 682506",
  },
  {
    label: "Functions / Services",
    value:
      "Higher Education Institution affiliated to Mahatma Gandhi University, Kottayam",
  },
  { label: "Type of Institution", value: "Self-Financing College" },
  { label: "Head of the Institution", value: "Mr. Maheen M N" },
  { label: "Contact Numbers", value: "Office 8590601342 | Mobile 9497006882" },
  { label: "Email", value: "kmmkumbalam@kmmcollege.edu.in" },
  { label: "Website", value: "www.kmmcollegekumbalam.edu.in" },
];

const workingHours = [
  { label: "College", value: "08:30 AM - 04:00 PM" },
  { label: "Class", value: "09:10 AM - 02:10 PM" },
  { label: "Office", value: "08:30 AM - 04:00 PM" },
];

const officers = [
  {
    role: "First Appellate Authority",
    name: "Mr. Maheen M N",
    designation: "Principal",
    address: "KMM College, Kumbalam P O Panangad, Cochin, Kerala 682506",
    note: "The Appellate Authority will receive the appeals as required under the Act.",
  },
  {
    role: "Public Information Officer",
    name: "Lt. (Dr) Aneeb K Jose",
    designation: "Vice Principal",
    address:
      "KMM College of Arts and Science, Thrikkakara, Kerala Pin-682021",
    note: "Designated to perform the duties and responsibilities as envisaged under the RTI Act.",
  },
];

const highlights = [
  { label: "RTI Act", value: "2005", icon: faScaleBalanced },
  { label: "Passed On", value: "15 June 2005", icon: faCalendarDays },
  { label: "Status", value: "Public Authority", icon: faUserShield },
];

export default function RtiPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8faf7] text-[#18213b]">
        <section className="relative isolate overflow-hidden px-4 py-14 sm:px-6 lg:py-20">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#1ab69d]/15 blur-2xl" />
          <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#ba3e3e]/10 blur-2xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#1ab69d]/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d] shadow-sm">
                Transparency & Accountability
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Right to Information (RTI)
              </h1>
              <Image
                src="/images/underlinee.png"
                width={130}
                height={40}
                alt="Decorated underline"
                className="mt-4 brightness-0"
              />
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-lg">
                The Right To Information Act 2005 was passed by the Parliament
                on 15th June 2005. The Act mandates that organizations defined
                as Public Authorities provide information to the public and
                create necessary arrangements to promote transparency and
                accountability.
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                KMM College, Kumbalam has been declared as a Public Authority
                under the Act.
              </p>
            </div>

            <div className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl backdrop-blur sm:p-7">
              <div className="rounded-2xl bg-[#18213b] p-6 text-white sm:p-8">
                <FontAwesomeIcon
                  icon={faGavel}
                  className="text-5xl text-[#1ab69d]"
                />
                <h2 className="mt-6 text-2xl font-semibold">
                  Implementation of RTI Act, 2005
                </h2>
                <p className="mt-4 leading-8 text-white/80">
                  The Act provides citizens the right to secure access to
                  information under the control of public authorities. Necessary
                  steps for implementation, including proactive disclosure of
                  information, shall be made available to the public through the
                  website.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
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
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Statutory Declaration
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-4xl">
                Under Sec - 4(1)(B) of RTI Act 2005
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                The following particulars state the organization, functions and
                duties of KMM College, Kumbalam as required for institutional
                disclosure.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-[#18213b] p-6 text-white sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#1ab69d]">
                      <FontAwesomeIcon icon={faBuildingColumns} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                        Managed By
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold">
                        Institution Details
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {institutionDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="grid gap-2 p-5 sm:grid-cols-[230px_1fr] sm:p-6"
                    >
                      <p className="text-sm font-bold text-slate-500">
                        {detail.label}
                      </p>
                      <p className="font-semibold leading-7 text-[#18213b]">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <aside className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-[#f8faf7] p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1ab69d]/12 text-[#1ab69d]">
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    <h3 className="text-xl font-semibold">Working Hours</h3>
                  </div>

                  <div className="mt-6 space-y-3">
                    {workingHours.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
                      >
                        <p className="font-bold text-slate-600">
                          {item.label}
                        </p>
                        <p className="text-right text-sm font-bold text-[#18213b]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    The College shall remain closed on Second Saturdays,
                    Sundays and Public Holidays declared by the Government of
                    Kerala and such other days the Principal may declare from
                    time to time.
                  </p>
                </div>

                <div className="rounded-3xl bg-[#1ab69d] p-6 text-white shadow-sm sm:p-8">
                  <FontAwesomeIcon icon={faFileCircleCheck} className="text-4xl" />
                  <h3 className="mt-5 text-xl font-semibold">
                    Public Disclosure
                  </h3>
                  <p className="mt-3 leading-7 text-white/85">
                    Information under proactive disclosure shall be made
                    available to the public at large through the institution
                    website.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                RTI Officers
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-4xl">
                Officers as per Right to Information Act - 2005
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {officers.map((officer, index) => (
                <article
                  key={officer.role}
                  className={`rounded-3xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    index === 0
                      ? "border-[#18213b] bg-[#18213b] text-white"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
                        index === 0
                          ? "bg-white/10 text-[#1ab69d]"
                          : "bg-[#1ab69d]/12 text-[#1ab69d]"
                      }`}
                    >
                      <FontAwesomeIcon icon={faUserShield} className="text-xl" />
                    </span>
                    <div>
                      <p
                        className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          index === 0 ? "text-white/55" : "text-slate-400"
                        }`}
                      >
                        {officer.role}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {officer.name}
                      </h3>
                      <p
                        className={`mt-1 font-medium ${
                          index === 0 ? "text-white/70" : "text-slate-500"
                        }`}
                      >
                        {officer.designation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <p
                      className={`flex gap-3 leading-7 ${
                        index === 0 ? "text-white/82" : "text-slate-700"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mt-1 shrink-0 text-[#1ab69d]"
                      />
                      <span>{officer.address}</span>
                    </p>
                    <p
                      className={`flex gap-3 leading-7 ${
                        index === 0 ? "text-white/82" : "text-slate-700"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="mt-1 shrink-0 text-[#1ab69d]"
                      />
                      <span>{officer.note}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
  <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
    
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
        Contact & Reference
      </p>

      <h3 className="mt-3 text-2xl font-semibold">
        RTI communication details
      </h3>

      <div className="mt-5 grid gap-4 text-slate-700 sm:grid-cols-2">

        {/* Email */}
        <a
          href="mailto:kmmkumbalam@kmmcollege.edu.in"
          className="flex items-center gap-3 font-semibold transition-colors duration-300 hover:text-[#1ab69d] min-w-0"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[#1ab69d] shrink-0"
          />
          <span className="break-all">
            kmmkumbalam@kmmcollege.edu.in
          </span>
        </a>

        {/* Phone */}
        <a
          href="tel:8590601342"
          className="flex items-center gap-3 font-semibold transition-colors duration-300 hover:text-[#1ab69d]"
        >
          <FontAwesomeIcon
            icon={faPhone}
            className="text-[#1ab69d] shrink-0"
          />
          <span>8590601342</span>
        </a>

        {/* Website */}
        <a
          href="https://www.kmmcollegekumbalam.edu.in"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 font-semibold transition-colors duration-300 hover:text-[#1ab69d] min-w-0"
        >
          <FontAwesomeIcon
            icon={faGlobe}
            className="text-[#1ab69d] shrink-0"
          />
          <span className="break-all">
            www.kmmcollegekumbalam.edu.in
          </span>
        </a>

      </div>
    </div>

    {/* RTI Button */}
    <a
      href="https://rti.gov.in/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#18213b] px-6 py-4 text-center font-bold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#1ab69d] lg:w-auto"
    >
      Visit RTI Website
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </a>

  </div>
</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
