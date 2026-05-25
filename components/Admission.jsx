import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faArrowRight,
  faBookOpen,
  faBuildingColumns,
  faCheck,
  faClipboardCheck,
  faEnvelope,
  faFileLines,
  faGraduationCap,
  faIndianRupeeSign,
  faPhone,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const ugProgrammes = [
  { program: "B.Com", specialisation: "Finance and Taxation", seats: 40 },
  { program: "BSc", specialisation: "Psychology", seats: 40 },
  { program: "BBA Honours", specialisation: "General Management", seats: 40 },
  { program: "BCA Honours", specialisation: "Computer Applications", seats: 40 },
];

const pgProgrammes = [
  { program: "MSc", specialisation: "Psychology", seats: 40 },
  { program: "MBA", specialisation: "General Management", seats: 40 },
  { program: "MCA", specialisation: "Computer Applications", seats: 40 },
];

const admissionSteps = [
  {
    title: "Enquire",
    description: "Contact the admissions desk for programme details, availability, and guidance.",
  },
  {
    title: "Check Eligibility",
    description: "Confirm the required academic qualification and documents for your selected course.",
  },
  {
    title: "Submit Application",
    description: "Complete the application process with accurate personal and academic details.",
  },
  {
    title: "Complete Admission",
    description: "Finish document verification and fee procedures as guided by the college office.",
  },
];

const documents = [
  "Recent passport size photographs",
  "SSLC / equivalent certificate",
  "Plus Two / degree mark lists and certificates",
  "Transfer Certificate",
  "Conduct Certificate",
  "Migration Certificate, if applicable",
  "Community / income certificate, if applicable",
  "Aadhaar or valid identity proof",
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <Image
        src="/images/underline.svg"
        width={210}
        height={36}
        alt="Decorated underline"
        className="mx-auto mt-3 "
      />
      <p className="mt-4 text-sm leading-7 text-[#40506f] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ProgrammeCard({ programme, index }) {
  return (
    <article className="group rounded-2xl border border-[#dceae5] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1ab69d] hover:shadow-xl hover:shadow-[#18213b]/10">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1ab69d]/12 text-[#12826f] transition duration-300 group-hover:bg-[#1ab69d] group-hover:text-white">
          <FontAwesomeIcon icon={faUserGraduate} />
        </span>
        <span className="rounded-full bg-[#179BD7]/10 px-3 py-1 text-xs font-bold text-[#1469b8]">
          {programme.seats} Seats
        </span>
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#7a879d]">
        Programme {index + 1}
      </p>
      <h3 className="mt-2 text-xl font-bold text-[#18213b]">{programme.program}</h3>
      <p className="mt-2 text-sm leading-6 text-[#40506f]">
        {programme.specialisation}
      </p>
    </article>
  );
}

function ProgrammeSection({ id, eyebrow, title, description, programmes }) {
  return (
    <section id={id} className="scroll-mt-[70px] lg:scroll-mt-20 px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="flex flex-wrap justify-center gap-5">
  {programmes.map((programme, index) => (
    <div
      key={`${programme.program}-${programme.specialisation}`}
      className="basis-full sm:basis-[calc(50%-10px)] lg:basis-[calc(25%-15px)]"
    >
      <ProgrammeCard programme={programme} index={index} />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}

export default function Admission({ collegeCampus, admissionPhone }) {
  return (
    <>
      <Header />
      <main id="admission" className="scroll-mt-[70px] lg:scroll-mt-28 overflow-hidden bg-[#f8faf7] text-[#18213b]">
        <section className="px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="flex min-h-[460px] flex-col justify-between rounded-[28px] bg-[#10172b] p-6 text-white shadow-2xl shadow-[#10172b]/25 sm:p-8 lg:p-10">
              <div>
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                  Admissions
                </p>
                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Start your academic journey at K.M.M. College.
                </h1>
                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">
                  Explore undergraduate and postgraduate programmes, check the
                  admission process, and connect with the college office for
                  personalised guidance.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${admissionPhone}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1ab69d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#18213b]"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  Call Admissions Desk
                </a>
                <Link
                  href="/contact#enquiry-form"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#18213b]"
                >
                  Enquiry Form
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-[#dceae5] bg-white shadow-xl shadow-[#18213b]/10 sm:min-h-[380px] lg:min-h-[460px]">
                <Image
        src={collegeCampus.src}         
        fill
        alt={collegeCampus.alt}
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/85 via-[#18213b]/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-5 shadow-xl backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">
                    Programmes Offered
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold text-[#18213b]">4</p>
                      <p className="text-xs font-semibold text-[#40506f]">UG</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#18213b]">3</p>
                      <p className="text-xs font-semibold text-[#40506f]">PG</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#18213b]">280</p>
                      <p className="text-xs font-semibold text-[#40506f]">Seats</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Admission Process"
              title="A clear path from enquiry to enrolment."
              description="The admissions team helps students and parents understand course choices, eligibility, documents, and final joining steps."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="relative rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#179BD7]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#18213b]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#40506f]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

<a href="#admission">

        <ProgrammeSection
          id="ug-admission"
          eyebrow="UG Admission"
          title="Undergraduate programmes"
          description="Career-focused degree programmes with strong academic foundations and practical learning support."
          programmes={ugProgrammes}
        />
</a>
<a href="#admission">

        <ProgrammeSection
          id="pg-admission"
          eyebrow="PG Admission"
          title="Postgraduate programmes"
          description="Advanced programmes designed for professional growth, subject depth, and industry readiness."
          programmes={pgProgrammes}
        />
</a>

        <section className="bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
                Eligibility & Documents
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
                Keep your admission documents ready.
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt="Decorated underline"
                className="mt-3 "
              />
              <p className="mt-5 text-sm leading-7 text-[#40506f] sm:text-base">
                Eligibility depends on the selected programme and university
                guidelines. Contact the admissions desk before submission to
                confirm the latest document requirements for your course.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#18213b]">
                    UG Eligibility
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#40506f]">
                    Plus Two or equivalent qualification as per applicable
                    university norms.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#18213b]">
                    PG Eligibility
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#40506f]">
                    Relevant undergraduate degree or equivalent qualification as
                    prescribed for the chosen programme.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d6e8e2] bg-[#f8faf7] p-5 shadow-[0_20px_55px_-35px_rgba(24,33,59,0.6)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#18213b] text-white">
                  <FontAwesomeIcon icon={faFileLines} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1ab69d]">
                    Checklist
                  </p>
                  <h3 className="text-xl font-bold text-[#18213b]">
                    Required Documents
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {documents.map((document) => (
                  <div
                    key={document}
                    className="flex gap-3 rounded-2xl border border-[#dceae5] bg-white p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1ab69d] text-xs text-white">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p className="text-sm font-semibold leading-6 text-[#40506f]">
                      {document}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="fee-structure" className=" scroll-mt-[70px] lg:scroll-mt-20 px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[#d6e8e2] bg-[#18213b] shadow-[0_24px_60px_-40px_rgba(24,33,59,0.75)] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-6 text-white sm:p-8 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Fee Structure
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                View approved fee information.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                Students can refer to the approved fee structure and contact the
                college office for programme-specific admission guidance.
              </p>
              <a
                href="https://cap.mgu.ac.in/collegeinfo/fees_view_unaided.jsp"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#18213b] transition hover:bg-[#1ab69d] hover:text-white"
              >
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                Approved Fee Structure
              </a>
            </div>

            <div className="grid gap-4 bg-white p-6 sm:grid-cols-2 sm:p-8 lg:p-12">
              <a
                href={`tel:${admissionPhone}`}
                className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5 transition hover:border-[#1ab69d]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <p className="mt-4 text-sm font-bold text-[#18213b]">
                  Admission Helpline
                </p>
                <p className="mt-1 text-sm leading-6 text-[#40506f]">{admissionPhone}</p>
              </a>
              <a
                href="mailto:kmmkumbalam@gmail.com"
                className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5 transition hover:border-[#1ab69d]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <p className="mt-4 text-sm font-bold text-[#18213b]">
                  Email Admissions
                </p>
                <p className="mt-1 break-words text-sm leading-6 text-[#40506f]">
                  kmmkumbalam@gmail.com
                </p>
              </a>
              <Link
                href="/academics"
                className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5 transition hover:border-[#1ab69d] sm:col-span-2"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                  <FontAwesomeIcon icon={faBuildingColumns} />
                </span>
                <p className="mt-4 text-sm font-bold text-[#18213b]">
                  Explore Academics
                </p>
                <p className="mt-1 text-sm leading-6 text-[#40506f]">
                  Review academic programmes, seats, and calendar details.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
