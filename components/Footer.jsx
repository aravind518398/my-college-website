
"use client";

import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faArrowRight, faEnvelope, faLocationDot, faPhone, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


const departments = [
  { label: "Department of Commerce", href: "/departments#commerce" },
  { label: "Department of Computer Applications", href: "/departments#computer-application" },
  { label: "Department of Psychology", href: "/departments#psychology" },
  { label: "Department of Business Administration", href: "/departments#business-administration" },
  { label: "Department of Mathematics", href: "/departments#mathematics" },
  { label: "Department of Languages", href: "/departments#languages" },
];

const ugProgrammes = [
  { label: "B.Com Finance and Taxation", href: "academics?program=bcom#ug-programme-details" },
  { label: "BSc Psychology", href: "academics?program=bsc-psychology#ug-programme-details" },
  { label: "BBA", href: "academics?program=bba#ug-programme-details" },
  { label: "BCA", href: "academics?program=bca#ug-programme-details" },
  
];

const pgProgrammes = [
  { label: "MBA", href: "academics?program=mba#pg-programme-details" },
  { label: "MCA", href: "academics?program=mca#pg-programme-details" },
  { label: "M.Sc Psychology", href: "academics?program=msc-psychology#pg-programme-details" },
];

const defaultSiteSettings = {
  identity: {
    shortName: "KMM College",
    tagline: "Kumbalam",
    affiliation: "Affiliated to MG University",
    footerText: "K.M.M. College, Kumbalam is committed to quality education, professional confidence, and student-focused academic growth.",
  },
  contact: {
    email: "kmmkumbalam@gmail.com",
    primaryPhone: "9037002130",
    address: "K.M.M. College, Kumbalam, Kerala - 682506",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=KMM+College+Kumbalam+Kerala",
  },
  social: {
    facebook: "https://facebook.com/Kmmcollegekumbalam",
    instagram: "https://www.instagram.com/kmmcollege_kumbalam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@kmmcollegeofartsandscience1164",
    whatsapp: "https://wa.me/919037002130?text=Hi",
  },
  images: {
    footerLogo: "/images/kmm-logo.png",
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
          <FooterLink href={item.href} key={item.label}>
            {item.label}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/site-settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && data?.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const socialLinks = [
    { label: "Facebook", icon: faFacebook, href: settings.social.facebook },
    { label: "Instagram", icon: faInstagram, href: settings.social.instagram },
    { label: "YouTube", icon: faYoutube, href: settings.social.youtube },
    { label: "WhatsApp", icon: faWhatsapp, href: settings.social.whatsapp },
  ].filter((item) => item.href);
  const phoneNumbers = [
    settings.contact.primaryPhone,
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
                <span className="block text-xl font-bold leading-tight">{settings.identity.shortName}</span>
                <span className="mt-1 block text-sm font-semibold text-[#1ab69d]">{settings.identity.tagline}</span>
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
              <a href={`mailto:${settings.contact.email}`} className="flex items-center gap-3 break-all transition-colors duration-300 hover:text-white">
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
            <FooterColumn title="Departments" items={departments} />
            <FooterColumn title="UG Programmes" items={ugProgrammes} />
            <FooterColumn title="PG Programmes" items={pgProgrammes} />
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
