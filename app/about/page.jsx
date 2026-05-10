"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faBullseye,
  faGraduationCap,
  faQuoteLeft,
  faRocket,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useMemo, useState } from "react";

const values = [
  { label: "Critical Thinking", icon: faStar },
  { label: "Academic Excellence", icon: faGraduationCap },
  { label: "Social Commitment", icon: faUsers },
];

const messages = [
  {
    title: "Message From Chairman",
    name: "A M Aboobacker",
    role: "Chairman, KMM Group of Institutions",
    image: "/images/peoples/chairman.webp",
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    paragraphs: [
      "At KMM College Thrikkakara, Vazhakkala, we believe that education is the foundation for transforming individuals and society. Our institution is committed to nurturing curious minds, creative thinkers, and compassionate individuals who contribute meaningfully to the world.",
      "With a dedicated faculty, modern facilities, and a curriculum that blends tradition with innovation, we strive to create an environment where students are encouraged to question, explore, and grow. Beyond academics, we emphasize ethical leadership, empathy, and resilience - qualities that prepare students not just for careers but for life.",
      "Our vision is rooted in the belief that education holds the power to uplift communities. We are dedicated to instilling values of integrity, compassion, and service, ensuring our students emerge as responsible global citizens.",
      "As you embark on this journey with us, I encourage you to embrace every opportunity for growth and discovery. Together, let us build a future where knowledge drives positive change and learning shapes a better world.",
      "Welcome to KMM College, Thrikkakara Vazhakkala - where ambitions are nurtured and the journey towards excellence knows no limits.",
    ],
  },
  {
    title: "Message From Principal",
    name: "Dr Maheen M N",
    role: "Principal",
    image: "/images/peoples/principal.webp",
    quote:
      "Education is not the learning of facts, but the training of the mind to think.",
    author: "Albert Einstein",
    paragraphs: [
      "Greetings from KMM College, Thrikkakara Vazhakkala.",
      "At KMM College, we believe that education is the foundation for personal growth and societal transformation. Our institution is dedicated to nurturing inquisitive minds, fostering creativity, and building ethical leaders. We strive to create a dynamic learning environment where students are encouraged to think critically, embrace challenges, and develop the skills needed to thrive in an ever-evolving world.",
      "Beyond academics, we place great emphasis on character building, discipline, and social responsibility. Our goal is to shape individuals who are not only academically proficient but also compassionate, resilient, and committed to making a positive impact.",
      "With a team of dedicated faculty, modern facilities, and a student-centric approach, we empower learners to excel in both academics and co-curricular pursuits. We encourage students to step out of their comfort zones, discover their potential, and embrace lifelong learning.",
      "I am confident that every student at KMM will leave as a capable, confident, and responsible individual, ready to contribute meaningfully to society and lead with integrity.",
    ],
  },
];

function SectionTitle({ align = "left", kicker, title }) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {kicker && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
          {kicker}
        </p>
      )}
      <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <Image
        src="/images/underlinee.png"
        width={110}
        height={35}
        alt="Decorated underline"
        className="mt-3 brightness-0"
      />
    </div>
  );
}

function ParallaxShape({ mouse, speed, className }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute hidden rounded-full lg:block ${className}`}
      style={{
        transform: `translate3d(${mouse.x * speed}px, ${mouse.y * speed}px, 0)`,
      }}
    />
  );
}

export default function AboutPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const parallaxImageStyle = useMemo(
    () => ({
      transform: `translate3d(${mouse.x * -10}px, ${mouse.y * -8}px, 0) scale(1.03)`,
    }),
    [mouse]
  );

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;

    setMouse({
      x: (event.clientX / innerWidth - 0.5) * 2,
      y: (event.clientY / innerHeight - 0.5) * 2,
    });
  };

  return (
    <>
      <Header />
      <main
        onMouseMove={handleMouseMove}
        className="overflow-hidden bg-[#f8faf7] text-[#18213b]"
      >
        <section className="relative px-4 py-12 sm:px-6 lg:py-20">
          <ParallaxShape
            mouse={mouse}
            speed={28}
            className="-left-14 top-16 h-44 w-44 bg-[#1ab69d]/15 blur-sm"
          />
          <ParallaxShape
            mouse={mouse}
            speed={-22}
            className="right-8 top-28 h-24 w-24 border border-[#ba3e3e]/25"
          />
          <ParallaxShape
            mouse={mouse}
            speed={18}
            className="bottom-12 right-1/3 h-16 w-16 bg-[#ba3e3e]/10"
          />

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="relative z-10">
              <p className="mb-3 inline-flex rounded-full border border-[#1ab69d]/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d] shadow-sm">
                About KMM College
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-[#18213b] sm:text-5xl lg:text-6xl">
                Shaping thoughtful learners for a better society.
              </h1>
              <Image
                src="/images/underlinee.png"
                width={130}
                height={40}
                alt="Decorated underline"
                className="mt-4 brightness-0"
              />
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-lg">
                KMM College, Kumbalam strives to create a future society where
                ignorance, inequality, ill-health, illiteracy, poverty and
                powerlessness can be eradicated. The institution believes in the
                strong linkage of training, education, research and action for
                sustainable development.
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                KMM is committed to excellence, helping students think
                critically, communicate effectively, and live with purpose in a
                wide range of settings within and outside the country.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {values.map((value) => (
                  <div
                    key={value.label}
                    className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1ab69d]/12 text-[#1ab69d]">
                      <FontAwesomeIcon icon={value.icon} />
                    </span>
                    <span className="text-sm font-bold text-[#18213b]">
                      {value.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-[#1ab69d]/15 sm:-left-6 sm:-top-6" />
              <div
                className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl transition-transform duration-200 ease-out"
                style={parallaxImageStyle}
              >
                <Image
                  src="/images/college2.png"
                  width={760}
                  height={560}
                  alt="KMM College campus"
                  priority
                  className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[560px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#18213b]/85 to-transparent p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                    Kumbalam Campus
                  </p>
                  <p className="mt-2 max-w-sm text-xl font-semibold">
                    A learning space built around knowledge, skill and service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-white px-4 py-16 sm:px-6 lg:py-24 scroll-mt-24" id="vision">
          <ParallaxShape
            mouse={mouse}
            speed={-18}
            className="left-20 top-24 h-20 w-20 bg-[#ba3e3e]/10"
          />
          <ParallaxShape
            mouse={mouse}
            speed={24}
            className="-right-10 bottom-10 h-40 w-40 bg-[#1ab69d]/12 blur-sm"
          />

          <div className="mx-auto max-w-7xl " >
            <SectionTitle
              
              align="center"
              kicker="Direction"
              title="Our Vision & Mission"
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f8faf7] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-10">
                <span className="absolute right-6 top-6 h-24 w-24 rounded-full bg-[#1ab69d]/10 transition duration-300 group-hover:scale-125" />
                <FontAwesomeIcon
                  icon={faBullseye}
                  className="relative text-5xl text-[#1ab69d] drop-shadow-sm"
                />
                <h3 className="relative mt-8 text-2xl font-bold text-[#18213b] sm:text-3xl">
                  Vision
                </h3>
                <p className="relative mt-5 text-base leading-8 text-slate-700">
                  To emerge as an institution par excellence, we integrate
                  innovative technological capabilities, upholding ethical values
                  and societal commitments with the right blend of knowledge,
                  skill sets and professional attitude for the development of
                  individuals.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[#18213b] p-7 text-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-10">
                <span className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10 transition duration-300 group-hover:scale-125" />
                <FontAwesomeIcon
                  icon={faRocket}
                  className="relative text-5xl text-[#1ab69d] drop-shadow-sm"
                />
                <h3 className="relative mt-8 text-2xl font-bold sm:text-3xl">
                  Mission
                </h3>
                <p className="relative mt-5 text-base leading-8 text-white/80">
                  Our college strives to achieve excellence in education by
                  practicing innovative teaching-learning pedagogical approach,
                  and thereby creating a unique atmosphere in which our dedicated
                  faculty and excellent infrastructure can produce young
                  professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-16 sm:px-6 lg:py-24 scroll-mt-24" id="messages">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker="Leadership" title="Messages" />

            <div className="mt-10 grid gap-8">
              {messages.map((message, index) => (
                <article
                  key={message.title}
                  className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-[300px_1fr]"
                >
                  <div
                    className={`relative min-h-[300px] ${
                      index % 2 === 0 ? "bg-[#18213b]" : "bg-[#1ab69d]"
                    }`}
                  >
                    <Image
                      src={message.image}
                      alt={message.name}
                      width={300}
                      height={380}
                      className="absolute top-6 left-1/2 max-h-[92%] w-auto -translate-x-1/2 object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
                          {message.title}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-[#18213b] sm:text-3xl">
                          {message.name}
                        </h3>
                        <p className="mt-1 font-medium text-slate-500">
                          {message.role}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={faQuoteLeft}
                        className="hidden text-4xl text-[#1ab69d]/25 sm:block"
                      />
                    </div>

                    <blockquote className="mt-6 rounded-xl border-l-4 border-[#1ab69d] bg-[#f8faf7] p-4 text-sm font-semibold leading-7 text-[#18213b] sm:text-base">
                      &quot;{message.quote}&quot; - {message.author}
                    </blockquote>

                    <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                      {message.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
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
