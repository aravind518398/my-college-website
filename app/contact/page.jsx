"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  faClock,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faPaperPlane,
  faPhone,
  faRoute,
  faShieldHalved,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

import { defaultSiteSettings } from "@/lib/siteSettingsDefaults";

const defaultContactSettings = defaultSiteSettings.contact;

function mergeContactSettings(saved = {}) {
  const merged = { ...defaultContactSettings };

  for (const [key, value] of Object.entries(saved)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    merged[key] = value;
  }

  return merged;
}

const enquiryTypes = [
  "General",
  "Admissions",
  "Academics",
  "Placements",
  "Student Support",
  "Grievance / Complaint",
];

const quickInfo = [
  {
    title: "Office Hours",
    description: "Monday to Saturday, 9:00 AM - 4:30 PM",
    icon: faClock,
  },
  {
    title: "Admissions Desk",
    description: "Speak to our team for UG, PG, eligibility, and fee enquiries.",
    icon: faGraduationCap,
  },
  {
    title: "Student Support",
    description: "Get directed to the right department, cell, or faculty office.",
    icon: faUserTie,
  },
  {
    title: "Campus Safety",
    description: "Reach the college office for urgent campus-related support.",
    icon: faShieldHalved,
  },
];

function ContactCard({ card }) {
  const isExternal = card.href?.startsWith("http");

  return (
    <a
      href={card.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group rounded-2xl border border-[#dceae5] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1ab69d] hover:shadow-xl hover:shadow-[#18213b]/10 sm:p-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#1ab69d]/12 text-[#12826f] transition duration-300 group-hover:bg-[#1ab69d] group-hover:text-white">
        <FontAwesomeIcon icon={card.icon} />
      </span>
      <h3 className="mt-5 text-lg font-bold text-[#18213b]">{card.title}</h3>
      <p className="mt-2 break-words text-sm font-bold leading-6 text-[#18213b]">
        {card.detail}
      </p>
      <p className="mt-1 text-sm leading-6 text-[#40506f]">{card.subDetail}</p>
    </a>
  );
}

export default function Contact() {
  const [contactSettings, setContactSettings] = useState(defaultContactSettings);
  const [formStatus, setFormStatus] = useState({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    let isMounted = true;

    fetch("/api/site-settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && data?.settings?.contact) {
          setContactSettings(mergeContactSettings(data.settings.contact));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const contactCards = [
    {
      title: "Call Us",
      detail: contactSettings.primaryPhone,
      subDetail: contactSettings.secondaryPhone,
      href: `tel:${contactSettings.primaryPhone}`,
      icon: faPhone,
    },
    {
      title: "Email",
      detail: contactSettings.email,
      subDetail: "For general college enquiries",
      href: `mailto:${contactSettings.email}`,
      icon: faEnvelope,
    },
    {
      title: "Visit Campus",
      detail: contactSettings.address,
      subDetail: "Open in Google Maps",
      href: contactSettings.mapUrl,
      icon: faLocationDot,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus({
      type: "loading",
      message: "Sending your enquiry...",
    });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          type: formData.get("type"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit your enquiry.");
      }

      form.reset();
      setFormStatus({
        type: "success",
        message: result.message || "Your enquiry has been submitted successfully.",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while sending your enquiry. Please try again.",
      });
    }
  };

  const isSubmitting = formStatus.type === "loading";

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#f8faf7] text-[#18213b]">
        <section className="relative   px-4 py-12 text-white sm:px-6 lg:py-20">
          <div className="absolute inset-x-0 bottom-0 h-24" />

          <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex min-h-[430px] flex-col justify-between rounded-[28px] bg-[#10172b] p-6 shadow-2xl shadow-[#10172b]/25 sm:p-8 lg:p-10 border border-[#dceae5]">
              <div>
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                  Contact KMM College
                </p>
                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Reach the right desk without waiting around.
                </h1>
                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">
                  For admissions, academics, placements, campus facilities, or
                  student support, contact the college office and we will guide
                  your enquiry to the right department.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${contactSettings.primaryPhone}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition hover:border-[#1ab69d] hover:bg-[#1ab69d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#18213b]">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <span className="mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                    Call Office
                  </span>
                  <span className="mt-1 block text-lg font-bold text-white">
                    {contactSettings.primaryPhone}
                  </span>
                </a>
                <a
                  href={`mailto:${contactSettings.email}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition hover:border-[#1ab69d] hover:bg-[#1ab69d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#18213b]">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span className="mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                    Email Us
                  </span>
                  <span className="mt-1 block break-words text-sm font-bold leading-6 text-white">
                    {contactSettings.email}
                  </span>
                </a>
              </div>
            </div>

            <div className="grid  gap-6 ">
              <div className="rounded-[28px] bg-white p-5 text-[#18213b] shadow-xl shadow-[#18213b]/10 sm:p-6 border border-[#dceae5]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1ab69d]">
                  Campus Address
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight">
                  {contactSettings.address}
                </h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#40506f]">
                  Open in Google Maps
                </p>

                <div className="mt-8 space-y-4">
                  {quickInfo.slice(0, 3).map((item) => (
                    <div key={item.title} className="flex gap-3 ">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1ab69d]/12 text-[#12826f]">
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#18213b]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#40506f]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=KMM+College+Kumbalam+Kerala"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#18213b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1ab69d]"
                >
                  <FontAwesomeIcon icon={faRoute} />
                  Get Directions
                </a>
              </div>
              <div className="overflow-hidden rounded-[28px] shadow-xl shadow-[#18213b]/10 border border-[#dceae5] ">
    <iframe
      title="KMM College location map"
      src="https://www.google.com/maps?q=KMM%20College%20Kumbalam%20Kerala&output=embed"
      className="h-[320px] w-full border-0 sm:h-[420px] md:h-full md:min-h-[480px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
             
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 pt-8 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Quick Contacts
              </p>
              <h2 className="text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl">
                Choose the easiest way to reach us.
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt="Decorated underline"
                className="mt-3 "
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {contactCards.map((card) => (
                <ContactCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section id="enquiry-form" className="scroll-mt-[70px] lg:scroll-mt-20 bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Enquiry Form
              </p>
              <h2 className="max-w-2xl text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
                Send us your enquiry and we will get back to you.
              </h2>
              <Image
                src="/images/underline.svg"
                width={210}
                height={36}
                alt="Decorated underline"
                className="mt-3 "
              />
              <p className="mt-5 text-sm leading-7 text-[#40506f] sm:text-base">
                Share a few details about your question. This form is designed
                for general enquiries and can be connected to your backend or
                email service later.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {quickInfo.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#dceae5] bg-[#f8faf7] p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#12826f] shadow-sm">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-[#18213b]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#40506f]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#d6e8e2] bg-[#f8faf7] p-5 shadow-[0_20px_55px_-35px_rgba(24,33,59,0.6)] sm:p-7 lg:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[#18213b]">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-2xl border border-[#d6e8e2] bg-white px-4 py-3 text-sm text-[#18213b] outline-none transition placeholder:text-[#7a879d] focus:border-[#1ab69d] focus:ring-4 focus:ring-[#1ab69d]/15"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-[#18213b]">Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter phone number"
                    className="mt-2 w-full rounded-2xl border border-[#d6e8e2] bg-white px-4 py-3 text-sm text-[#18213b] outline-none transition placeholder:text-[#7a879d] focus:border-[#1ab69d] focus:ring-4 focus:ring-[#1ab69d]/15"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[#18213b]">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email address"
                    className="mt-2 w-full rounded-2xl border border-[#d6e8e2] bg-white px-4 py-3 text-sm text-[#18213b] outline-none transition placeholder:text-[#7a879d] focus:border-[#1ab69d] focus:ring-4 focus:ring-[#1ab69d]/15"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-[#18213b]">Enquiry Type</span>
                  <select
                    name="type"
                    defaultValue=""
                    required
                    className="mt-2 w-full rounded-2xl border border-[#d6e8e2] bg-white px-4 py-3 text-sm text-[#18213b] outline-none transition focus:border-[#1ab69d] focus:ring-4 focus:ring-[#1ab69d]/15"
                  >
                    <option value="" disabled>
                      Select enquiry type
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-bold text-[#18213b]">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Write your message"
                  className="mt-2 w-full resize-none rounded-2xl border border-[#d6e8e2] bg-white px-4 py-3 text-sm text-[#18213b] outline-none transition placeholder:text-[#7a879d] focus:border-[#1ab69d] focus:ring-4 focus:ring-[#1ab69d]/15"
                />
              </label>

              {formStatus.message && (
                <p
                  role="status"
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${
                    formStatus.type === "success"
                      ? "border-[#1ab69d]/30 bg-[#1ab69d]/10 text-[#12826f]"
                      : formStatus.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-[#d6e8e2] bg-white text-[#40506f]"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#18213b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#18213b]/15 transition hover:bg-[#1ab69d] focus:outline-none focus:ring-4 focus:ring-[#1ab69d]/25 disabled:cursor-not-allowed disabled:bg-[#40506f] sm:w-auto"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[#d6e8e2] bg-[#18213b] shadow-[0_24px_60px_-40px_rgba(24,33,59,0.75)] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-6 text-white sm:p-8 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                Find Us
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Plan your visit to K.M.M. College.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                The campus is located at Kumbalam, Kerala. Use the map for
                directions, or contact the college office before your visit for
                department-specific appointments.
              </p>
              <a
                href={contactSettings.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#18213b] transition hover:bg-[#1ab69d] hover:text-white"
              >
                <FontAwesomeIcon icon={faRoute} />
                Get Directions
              </a>
            </div>

            <div className="min-h-[320px] bg-white p-3 sm:min-h-[400px] lg:min-h-full">
              {contactSettings.mapEmbedUrl ? (
                <iframe
                  title="KMM College location map"
                  src={contactSettings.mapEmbedUrl}
                  className="h-[320px] w-full rounded-2xl border-0 sm:h-[400px] lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
