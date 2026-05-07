"use client";

import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightToBracket,
  faChevronDown,
  faEnvelope,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const primaryLinks = ["HOME", "ABOUT US", "CO-CURRICULAR", "DEPARTMENTS", "PLACEMENTS", "ADD ON COURSES", "ACADEMICS", "CONTACT"];

const menuGroups = [
  {
    title: "ADMISSION",
    items: ["UG Admission", "PG Admission", "Fee Structure"],
  },
  {
    title: "CLUBS",
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
    title: "CELLS",
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
    title: "COMMITTEES",
    items: ["Anti Ragging", "Grievance Redressal Committee", "Internal Complaints Committee", "Energy Monitoring Committee"],
  },
  {
    title: "RESEARCH",
    items: ["Research Cell", "IIC", "IEDC"],
  },
  {
    title: "STUDENT SUPPORT",
    items: ["SQAC"],
  },
  {
    title: "IQAC",
  },
  {
    title: "FACILITIES",
  },
  {
    title: "EVENTS",
  },
];

const contactNumbers = ["0484-2XXXXX7", "0484-XXXX2XX", "04X4-2X5XX5X7"];

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
  const [display, setDisplay] = useState(false);

  return (
    <div className="hidden bg-[#18213b] text-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-sm">
        <Link href="#" className="flex items-center gap-2 font-semibold transition-colors duration-300 hover:text-[#1ab69d]">
          <span>Embase</span>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </Link>

        <div className="flex items-center gap-4 font-medium">
          <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
          {contactNumbers.map((number) => (
            <a key={number} href="tel:#" className="transition-colors duration-300 hover:text-[#1ab69d]">
              {number}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks />
          <div className="flex items-center rounded-full bg-white/10 px-2 py-1 ring-1 ring-white/15">
            <input
              type="search"
              className={`bg-transparent text-sm text-white outline-none placeholder:text-white/55 transition-all duration-300 ${
                display ? "w-40 px-2 opacity-100" : "w-0 opacity-0"
              }`}
              placeholder="Search"
            />
            <button type="button" onClick={() => setDisplay(!display)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-white hover:text-[#18213b]" aria-label="Toggle search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesktopHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const carousel = document.getElementById("home-carousel");

      if (!carousel) {
        setIsSticky(window.scrollY > 180);
        return;
      }

      setIsSticky(carousel.getBoundingClientRect().bottom <= 0);
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
      <div className="hidden lg:block">
        <DesktopHeaderContent />
      </div>

      <div
        className={`fixed left-0 right-0 top-0 z-[60] hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-700 ease-out lg:block ${
          isSticky ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <DesktopHeaderContent compact />
      </div>
    </>
  );
}

function DesktopHeaderContent({ compact = false }) {
  const leftLinks = primaryLinks.slice(0, 4);
  const rightLinks = primaryLinks.slice(4);

  return (
    <div>
      <div className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 transition-all duration-500 ${compact ? "py-2" : "py-4"}`}>
        <LinkList links={leftLinks} align="start" compact={compact} />
        <Link href="#" className="flex justify-center">
          <Image src="/images/kmm-nav-logo.png" alt="KMM College logo" width={160} height={100} priority className={`h-auto transition-all duration-500 ${compact ? "w-30" : "w-40"}`} />
        </Link>
        <LinkList links={rightLinks} align="end" compact={compact} />
      </div>

      <nav className="border-t border-white/10 bg-[#18213b] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <ul className={`flex flex-wrap items-center justify-center gap-1 font-semibold transition-all duration-500 ${compact ? "min-h-10 text-xs" : "min-h-12 text-sm"}`}>
            {menuGroups.map((group) => (
              <DesktopMenuItem key={group.title} group={group} compact={compact} />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

function LinkList({ links, align, compact = false }) {
  return (
    <ul className={`flex flex-wrap items-center gap-y-2 font-bold text-[#18213b] ${compact ? "gap-x-4 text-xs" : "gap-x-6 text-sm"} ${align === "end" ? "justify-end" : "justify-start"}`}>
      {links.map((link) => (
        <li key={link}>
          <Link href="#" className="transition-colors duration-300 hover:text-[#1ab69d]">
            {link}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopMenuItem({ group, compact = false }) {
  const hasItems = group.items?.length;

  return (
    <li className="group relative">
      <Link href="#" className={`flex items-center gap-2 rounded-full transition-colors duration-300 hover:bg-white/10 hover:text-[#1ab69d] ${compact ? "px-3 py-2" : "px-4 py-2.5"}`}>
        {group.title}
        {hasItems && <FontAwesomeIcon icon={faChevronDown} className="text-xs transition-transform duration-300 group-hover:rotate-180" />}
      </Link>
      {hasItems && (
        <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-3 rounded-2xl bg-white p-3 text-[#18213b] opacity-0 shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="#" className="flex items-center">
          <Image src="/images/kmm-nav-logo.png" alt="KMM College logo" width={145} height={100} priority className="h-auto w-36 sm:w-40" />
        </Link>

        <button type="button" onClick={() => setOpen(!open)} className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-[#18213b] shadow-lg" aria-label="Toggle navigation" aria-expanded={open}>
          <span className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`h-0.5 w-6 rounded bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </div>

      <div className={`overflow-hidden border-t border-gray-100 bg-white shadow-2xl transition-all duration-300 ${open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="max-h-[85vh] overflow-y-auto px-4 pb-6 pt-4">
          <div className="mb-4 rounded-2xl bg-[#18213b] p-4 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
              <a href="tel:#">{contactNumbers[0]}</a>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#1ab69d]" />
              <a href="mailto:info@kmmcollege.ac.in">info@kmmcollege.ac.in</a>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <SocialLinks />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-bold text-[#18213b] sm:grid-cols-4">
            {primaryLinks.map((link) => (
              <Link key={link} href="#" className="rounded-xl bg-gray-50 px-3 py-3 text-center transition-colors duration-300 hover:bg-[#179BD7]/10 hover:text-[#179BD7]">
                {link}
              </Link>
            ))}
          </div>

          <div className="mt-5 divide-y divide-gray-100 rounded-2xl border border-gray-100">
            {menuGroups.map((group) => {
              const hasItems = group.items?.length;
              const isActive = activeGroup === group.title;

              return (
                <div key={group.title}>
                  <button
                    type="button"
                    onClick={() => (hasItems ? setActiveGroup(isActive ? null : group.title) : undefined)}
                    className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm font-bold text-[#18213b] transition-colors duration-300 hover:text-[#179BD7]"
                  >
                    {group.title}
                    {hasItems && <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />}
                  </button>
                  {hasItems && (
                    <div className={`overflow-hidden bg-gray-50 transition-all duration-300 ${isActive ? "max-h-96" : "max-h-0"}`}>
                      <ul className="grid gap-1 p-3">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link href="#" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#343434] transition-colors duration-300 hover:bg-white hover:text-[#179BD7]">
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

          <div className="mt-5 flex items-center rounded-full bg-gray-100 px-4 py-2 text-[#18213b]">
            <FontAwesomeIcon icon={faSearch} className="text-[#179BD7]" />
            <input type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-gray-500" />
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
