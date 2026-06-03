
"use client";

import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faArrowRight, faEnvelope, faLocationDot, faPhone, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { defaultSiteSettings as sharedDefaults } from "@/lib/siteSettingsDefaults";
import { useMemo } from "react";


const defaultSiteSettings = {
  identity: {
    shortName: sharedDefaults.identity.shortName,
    tagline: sharedDefaults.identity.tagline,
    affiliation: sharedDefaults.identity.affiliation,
    footerText: sharedDefaults.identity.footerText,
  },
  contact: sharedDefaults.contact,
  social: sharedDefaults.social,
  images: {
    footerLogo: "/images/kmm-logo.webp",
  },
};

function FooterLink({ children, href }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-sm leading-6 text-white/70 transition-colors duration-300 hover:text-white">
        <FontAwesomeIcon icon={faArrowRight} className="mt-1.5 text-[10px] text-[#1ab69d] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        <span>{children}</span>
      </Link>
    </li>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-[#1ab69d]">{title}</h4>
      <div className="mt-3 h-0.5 w-10 rounded-full bg-[#179BD7]"></div>
      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <FooterLink href={item.href} key={`${item.label}-${item.href}`}>
            {item.label}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
}

export default function FooterClient({
  initialSettings = defaultSiteSettings,
  initialUgProgrammes = [],
  initialPgProgrammes = [],
  initialDepartments = [],
}) {
  const settings = initialSettings;
  const departments = initialDepartments;
  const ugProgrammes = initialUgProgrammes;
  const pgProgrammes = initialPgProgrammes;

  const footerDepartments = useMemo(() => departments.map((department) => ({
    label: `Department of ${department.name}`,
    href: `/departments#${department.id}`,
  })), [departments]);

  const ugFooterProgrammes = useMemo(() => ugProgrammes.map((programme) => ({
    label: `${programme.shortName} (${programme.programType})`,
    href: `/academics?program=${programme.id}#ug-programme-details`,
  })), [ugProgrammes]);


  const pgFooterProgrammes = useMemo(() => pgProgrammes.map((programme) => ({
    label: `${programme.shortName} (${programme.programType})`,
    href: `/academics?program=${programme.id}#pg-programme-details`,
  })), [pgProgrammes]);


  const socialLinks = [
    { label: "Facebook", icon: faFacebook, href: settings.social.facebook },
    { label: "Instagram", icon: faInstagram, href: settings.social.instagram },
    { label: "YouTube", icon: faYoutube, href: settings.social.youtube },
    { label: "WhatsApp", icon: faWhatsapp, href: settings.social.whatsapp },
  ].filter((item) => item.href);
  const phoneNumbers = [
    settings.contact.primaryPhone,
    settings.contact.secondaryPhone,
  ].filter(Boolean);

  return (
    <footer className="relative mt-10 overflow-hidden bg-[#18213b] text-white">
      <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#179BD7]/15 blur-3xl"></div>
      <div className="absolute -right-28 bottom-8 h-80 w-80 rounded-full bg-[#1ab69d]/15 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1.85fr] lg:gap-12">
          <div className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur sm:p-7">
            <Link href="#" className="inline-flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-xl">
                <Image src={settings.images.footerLogo} width={84} height={84} alt="KMM College logo" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-xl font-bold leading-tight uppercase">{settings.identity.shortName}</span>
                <span className="mt-1 block text-sm font-semibold text-[#1ab69d] uppercase">{settings.identity.tagline}</span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-white/72">{settings.identity.footerText}</p>

            <div className="mt-6 space-y-3 text-sm text-white/75">
              <Link href={settings.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors duration-300 hover:text-white">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-[#1ab69d]" />
                <span>{settings.contact.address}</span>
              </Link>
              {phoneNumbers.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="flex w-fit items-center gap-3 transition-colors duration-300 hover:text-white">
                  <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
                  <span>{phone}</span>
                </a>
              ))}
              <a href="contact#enquiry-form" className="flex items-center gap-3 break-all transition-colors duration-300 hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#1ab69d]" />
                <span>{settings.contact.email}</span>
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ab69d]">
                  <FontAwesomeIcon icon={item.icon} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <FooterColumn title="Departments" items={footerDepartments} />
            <FooterColumn title="UG Programmes" items={ugFooterProgrammes} />
            <FooterColumn title="PG Programmes" items={pgFooterProgrammes} />
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] p-5 shadow-2xl shadow-[#179BD7]/20 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/75">Affiliation</p>
              <p className="mt-1 font-semibold leading-snug">{settings.identity.affiliation}</p>
            </div>
          </div>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white px-5 py-3 text-sm font-bold text-[#1469b8] shadow-lg transition-all duration-300 hover:-translate-y-1 sm:mt-0">
            Contact Us
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} {settings.identity.shortName}, Kumbalam. All rights reserved.</p>
          <p>Designed for student-focused academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
