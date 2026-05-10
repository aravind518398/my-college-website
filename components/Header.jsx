"use client";

import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faArrowRightToBracket,
  faBars,
  faChevronDown,
  faEnvelope,
  faMagnifyingGlass,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    items: [
      { label: "About us", href: "/about" },
      { label: "Vision", href: "/about#vision" },
      { label: "Messages", href: "/about#messages" },
      { label: "Code of Conduct", href: "/about/code-of-conduct" },
      { label: "RTI", href: "/about/rti" },
    ],
  },
  {
    label: "Department",
    href: "/departments",
    items: [
      { label: "Department of Commerce", href: "/departments/commerce" },
      { label: "Department of Computer Application", href: "/departments/computer-application" },
      { label: "Department of Psychology", href: "/departments/psychology" },
      { label: "Department of Business Administration", href: "/departments/business-administration" },
      { label: "Department of Mathematics", href: "/departments/mathematics" },
      { label: "Department of Languages", href: "/departments/languages" },
    ],
  },
  { label: "Placements", href: "/placements" },
  {
    label: "Academics",
    href: "/academics",
    items: [
      { label: "UG Programmes", href: "/academics/ug-programmes" },
      { label: "PG Programmes", href: "/academics/pg-programmes" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
    ],
  },
  {
    label: "Co-Curricular",
    href: "/co-curricular",
    items: [
      { label: "NSS", href: "/co-curricular/nss" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
const quickLinks = [
  { label: "Add On Courses", href: "/add-on-courses" },
];

const menuGroups = [
  {
    title: "Admission",
    items: ["UG Admission", "PG Admission", "Fee Structure"],
  },
  {
    title: "Clubs",
    items: [
      "Nature Club",
      "Literary Club",
      "Media Club",
      "Staff Recreation Club",
      "KMM Veranda",
      "Sports Club",
      "Entrepreneurship Development Club",
      "Social Outreach Club",
      "Scholarship Support Club",
      "Quiz Club",
      "Yoga Club",
      "Electoral Literacy Club",
      "Arts Club",
    ],
  },
  {
    title: "Cells",
    items: [
      "Internal Exam and Test Paper",
      "OBC Cell",
      "SC/ST Cell",
      "RTI Act Cell",
      "Women's Cell",
      "Anti Drug Narcotic Cell",
      "Minority Cell",
      "Research Cell",
      "Placement and Training Cell",
      "IPR Cell",
      "Counseling Cell",
    ],
  },
  {
    title: "Committees",
    items: ["Anti Ragging", "Grievance Redressal Committee", "Internal Complaints Committee", "Energy Monitoring Committee"],
  },
  {
    title: "Research",
    items: ["Research Cell", "IIC", "IEDC"],
  },
  {
    title: "Student Support",
    items: ["SQAC"],
  },
  {
    title: "IQAC",
  },
  {
    title: "Facilities",
  },
  {
    title: "Events",
  },
  {
    title: "Approved Fee Structure",
  },
];

const contactNumbers = [
  { label: "9037002130", href: "tel:9037002130" },
  { label: "8590601342", href: "tel:8590601342" },
  { label: "04X4-2X5XX5X7", href: "tel:04X42X5XX5X7" },
];


export default function Header() {
  return (
    <header className="relative z-50 bg-white shadow-sm">
      <RunningRibon />
      <ContactBar />
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}

export function RunningRibon() {
  const message = "KMM College of Arts and Science has been NAAC Accredited with B Grade.";

  return (
    <div className="overflow-hidden bg-[#ba3e3e] text-xs font-bold text-white sm:text-sm">
      <div className="flex w-max whitespace-nowrap py-1.5 animate-marquee pause-on-hover">
        {Array(6)
          .fill()
          .map((_, i) => (
            <div key={i} className="mr-16 flex gap-16">
              <p>{message}</p>
              <p>{message}</p>
              <p>{message}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export function ContactBar() {
  return (
    <div className="hidden bg-[#18213b] text-white xl:block">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-6 px-6 text-sm">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="#" className="flex items-center gap-2 font-semibold transition-colors duration-300 hover:text-[#1ab69d]">
            <FontAwesomeIcon icon={faArrowRightToBracket} className="text-[#1ab69d]" />
            <span>Embase Login</span>
          </Link>
          <a href="mailto:kmmkumbalam@kmmcollege.edu.in" className="hidden items-center gap-2 text-white/75 transition-colors duration-300 hover:text-white xl:flex">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#1ab69d]" />
            <span>kmmkumbalam@kmmcollege.edu.in</span>
          </a>
        </div>

        <div className="flex items-center gap-5 font-medium">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
            {contactNumbers.map((number) => (
              <a key={number.label} href={number.href} className="whitespace-nowrap transition-colors duration-300 hover:text-[#1ab69d]">
                {number.label}
              </a>
            ))}
          </div>
          <SocialLinks />
          <DesktopSearch />
        </div>
      </div>
    </div>
  );
}

export function DesktopHeader() {
  const [isSticky, setIsSticky] = useState(false);
  const desktopHeaderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = desktopHeaderRef.current;

      if (!header) {
        setIsSticky(window.scrollY > 120);
        return;
      }

      setIsSticky(header.getBoundingClientRect().bottom <= 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={desktopHeaderRef} className="hidden xl:block">
        <DesktopHeaderContent />
      </div>

      <div
        className={`fixed left-0 right-0 top-0 z-[60] hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-700 ease-out xl:block ${
          isSticky ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <DesktopHeaderContent compact />
      </div>
    </>
  );
}

function DesktopHeaderContent({ compact = false }) {
  return (
    <div className="bg-white">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-500 2xl:gap-6 ${compact ? "min-h-14" : "min-h-16"}`}>
        <Link href="#" className="flex min-w-0 items-center gap-3">
          <Image src="/images/kmm-nav-logo.png" alt="KMM College logo" width={160} height={100} priority className={`w-auto shrink-0 transition-all duration-500 ${compact ? "h-11" : "h-12"}`} />
        </Link>

        <nav aria-label="Primary navigation" className="min-w-0 flex-1">
          <ul className={`flex flex-nowrap items-center justify-end gap-x-1 font-bold text-[#18213b] transition-all duration-500 ${compact ? "text-xs" : "text-sm"}`}>
            {primaryLinks.map((link) => (
              <DesktopPrimaryMenuItem key={link.label} link={link} />
            ))}
            {quickLinks.map((link) => (
              <li key={link.label} className="hidden xl:block">
                <Link href={link.href} className="block whitespace-nowrap rounded-full px-2.5 py-2 text-[#1469b8] transition-colors duration-300 hover:bg-[#179BD7]/10 2xl:px-3">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="#" className="group flex shrink-0 items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-3.5 py-3 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition-all duration-300 hover:-translate-y-0.5 2xl:px-4">
          Admission
          <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="border-t border-gray-100 bg-[#18213b] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <nav aria-label="Secondary navigation" className="min-w-0 flex-1">
            <ul className={`flex flex-wrap items-center gap-1 font-semibold transition-all duration-500 ${compact ? "min-h-10 text-xs" : "min-h-12 text-[13px] 2xl:text-sm"}`}>
              {menuGroups.map((group) => (
                <DesktopMenuItem key={group.title} group={group} compact={compact} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

function DesktopPrimaryMenuItem({ link }) {
  const hasItems = link.items?.length;

  return (
    <li className="group relative">
      <Link href={link.href} className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 transition-colors duration-300 hover:bg-[#179BD7]/10 hover:text-[#179BD7] 2xl:px-3">
        {link.label}
        {hasItems && <FontAwesomeIcon icon={faChevronDown} className="text-xs transition-transform duration-300 group-hover:rotate-180" />}
      </Link>
      {hasItems && (
        <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-3 rounded-2xl bg-white p-3 text-[#18213b] opacity-0 shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="grid max-h-[420px] gap-1 overflow-y-auto">
            {link.items.map((item, index) => (
              <li key={item.label ?? index}>
                <Link href={item.href} className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-[#179BD7]/10 hover:text-[#179BD7]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function DesktopMenuItem({ group, compact = false }) {
  const hasItems = group.items?.length;

  return (
    <li className="group relative">
      <Link href="#" className={`flex items-center gap-1 rounded-full whitespace-nowrap transition-colors duration-300 hover:bg-white/10 hover:text-[#1ab69d] ${compact ? "px-2.5 py-2" : "px-2.5 py-2.5 2xl:px-3.5"}`}>
        {group.title}
        {hasItems && <FontAwesomeIcon icon={faChevronDown} className="text-xs transition-transform duration-300 group-hover:rotate-180" />}
      </Link>
      {hasItems && (
        <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-3 rounded-2xl bg-white p-3 text-[#18213b] opacity-0 shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="grid max-h-[420px] gap-1 overflow-y-auto">
            {group.items.map((item) => (
              <li key={item}>
                <Link href="#" className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-[#179BD7]/10 hover:text-[#179BD7]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function DesktopSearch({ compact = false }) {
  const [display, setDisplay] = useState(false);

  return (
    <div className={`relative z-[80] flex shrink-0 items-center rounded-full bg-white/10 px-2 ring-1 ring-white/15 transition-all duration-300 ${compact ? "py-1" : "py-1.5"}`}>
      <input
        type="search"
        className={`bg-transparent text-sm text-white outline-none placeholder:text-white/55 transition-all duration-300 ${
          display ? "w-44 px-2 opacity-100" : "w-0 opacity-0"
        }`}
        placeholder="Search"
      />
      <button type="button" onClick={() => setDisplay(!display)} className="relative z-[90] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-white hover:text-[#18213b]" aria-label="Toggle search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="relative z-[100]" />
      </button>
    </div>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  const closeMenu = () => {
    setOpen(false);
    setActiveGroup(null);
  };

  const toggleMenu = () => {
    if (open) {
      setActiveGroup(null);
    }

    setOpen(!open);
  };

  return (
    <div className="sticky top-0 z-[60] bg-white shadow-lg ring-1 ring-black/5 xl:hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <Link href="#" className="flex min-w-0 items-center">
          <Image src="/images/kmm-nav-logo.png" alt="KMM College logo" width={145} height={100} priority className="h-auto w-36 sm:w-40" />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="#" className="hidden rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#179BD7]/20 sm:inline-flex">
            Admission
          </Link>
          <button type="button" onClick={toggleMenu} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#18213b] text-white shadow-lg transition-colors duration-300 hover:bg-[#179BD7]" aria-label="Toggle navigation" aria-expanded={open}>
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ${open ? "max-h-[calc(100vh-76px)] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="max-h-[calc(100vh-76px)] overflow-y-auto px-4 pb-6 pt-4">
          <div className="rounded-2xl bg-[#18213b] p-4 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1ab69d]">Quick Contact</p>
            <div className="mt-4 space-y-3 text-sm font-semibold">
              <a href={contactNumbers[0].href} className="flex items-center gap-2 transition-colors duration-300 hover:text-[#1ab69d]">
                <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
                <span>{contactNumbers[0].label}</span>
              </a>
              <a href="mailto:kmmkumbalam@kmmcollege.edu.in" className="flex min-w-0 items-center gap-2 transition-colors duration-300 hover:text-[#1ab69d]">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#1ab69d]" />
                <span className="break-all">kmmkumbalam@kmmcollege.edu.in</span>
              </a>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <SocialLinks />
              <Link href="#" className="flex items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white px-4 py-2 text-xs font-bold text-[#1469b8]">
                Embase
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </Link>
            </div>
          </div>

          <div className="relative z-[80] mt-4 flex items-center rounded-full bg-gray-100 px-4 py-2 text-[#18213b] ring-1 ring-gray-200">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="relative z-[90] text-[#179BD7]" />
            <input type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-gray-500" />
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 bg-white text-sm font-bold text-[#18213b] shadow-sm">
            {[...primaryLinks, ...quickLinks].map((link) => {
              const hasItems = link.items?.length;
              const isActive = activeGroup === link.label;

              return (
                <div key={link.label} className="border-b border-gray-100 last:border-b-0">
                  {hasItems ? (
                    <button
                      type="button"
                      onClick={() => setActiveGroup(isActive ? null : link.label)}
                      className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left transition-colors duration-300 hover:text-[#179BD7]"
                    >
                      {link.label}
                      <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link href={link.href} onClick={closeMenu} className="block px-4 py-3.5 transition-colors duration-300 hover:text-[#179BD7]">
                      {link.label}
                    </Link>
                  )}

                  {hasItems && (
                    <div className={`overflow-hidden bg-gray-50 transition-all duration-300 ${isActive ? "max-h-[24rem]" : "max-h-0"}`}>
                      <ul className="grid gap-1 p-3">
                        {link.items.map((item) => (
                          <li key={item.label}>
                            <Link href={item.href} onClick={closeMenu} className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#343434] transition-colors duration-300 hover:bg-white hover:text-[#179BD7]">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {menuGroups.map((group) => {
              const hasItems = group.items?.length;
              const isActive = activeGroup === group.title;

              return (
                <div key={group.title} className="border-b border-gray-100 last:border-b-0">
                  {hasItems ? (
                    <button
                      type="button"
                      onClick={() => setActiveGroup(isActive ? null : group.title)}
                      className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-[#18213b] transition-colors duration-300 hover:text-[#179BD7]"
                    >
                      {group.title}
                      <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link href="#" onClick={closeMenu} className="block px-4 py-3.5 text-sm font-bold text-[#18213b] transition-colors duration-300 hover:text-[#179BD7]">
                      {group.title}
                    </Link>
                  )}

                  {hasItems && (
                    <div className={`overflow-hidden bg-gray-50 transition-all duration-300 ${isActive ? "max-h-[28rem]" : "max-h-0"}`}>
                      <ul className="grid gap-1 p-3">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link href="#" onClick={closeMenu} className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#343434] transition-colors duration-300 hover:bg-white hover:text-[#179BD7]">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#1ab69d]" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#1ab69d]" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#1ab69d]" aria-label="YouTube">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
    </div>
  );
}
