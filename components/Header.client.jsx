"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faMagnifyingGlass, faXmark, faArrowRight, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function HeaderClient({ settings, primaryLinks, quickLinks, menuGroups }) {
  return (
    <>
      <DesktopHeader settings={settings} primaryLinks={primaryLinks} quickLinks={quickLinks} menuGroups={menuGroups} />
      <MobileHeader settings={settings} primaryLinks={primaryLinks} quickLinks={quickLinks} />
    </>
  );
}

function DesktopHeader({ settings, primaryLinks, quickLinks, menuGroups }) {
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
        <DesktopHeaderContent settings={settings} primaryLinks={primaryLinks} quickLinks={quickLinks} menuGroups={menuGroups} />
      </div>

      <div
        className={`fixed left-0 right-0 top-0 z-[60] hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-700 ease-out xl:block ${isSticky ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
          }`}
      >
        <DesktopHeaderContent compact settings={settings} primaryLinks={primaryLinks} quickLinks={quickLinks} menuGroups={menuGroups} />
      </div>
    </>
  );
}

function DesktopHeaderContent({ compact = false, settings, primaryLinks, quickLinks }) {
  return (
    <div className="bg-white">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-500 2xl:gap-6 ${compact ? "min-h-14" : "min-h-16"}`}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex min-w-0 items-center gap-3">
          <Image src={settings.images.navLogo} alt="KMM College logo" width={160} height={100} priority className={`w-auto shrink-0 transition-all duration-500 ${compact ? "h-11" : "h-12"}`} />
        </a>

        <nav aria-label="Primary navigation" className="min-w-0 flex-1">
          <ul className={`flex flex-nowrap items-center justify-end gap-x-1 font-bold text-[#18213b] transition-all duration-500 ${compact ? "text-xs" : "text-sm"}`}>
            {primaryLinks.map((link) => (
              <DesktopPrimaryMenuItem key={link.label} link={link} />
            ))}
            {quickLinks.map((link) => (
              <li key={link.label} className="hidden xl:block">
                <Link href={link.href} className="block whitespace-nowrap rounded-full px-2.5 py-2 text-[#1469b8] transition-colors duration-300 hover:bg-[#179BD7]/10 2xl:px-0.5">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/admission" className="group flex shrink-0 items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-3.5 py-3 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition-all duration-300 hover:-translate-y-0.5 2xl:px-4">
          Admission
          <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="border-t border-gray-100 bg-[#18213b] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <nav aria-label="Secondary navigation" className="min-w-0 flex-1">
            <ul className={`flex flex-wrap items-center gap-1 font-semibold transition-all duration-500 ${compact ? "min-h-10 text-xs" : "min-h-12 text-[13px] 2xl:text-sm"}`}>
              {/* menu groups rendered on server portion */}
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
      <Link href={group.href} target={group.target} className={`flex items-center gap-1 rounded-full whitespace-nowrap transition-colors duration-300 hover:bg-white/10 hover:text-[#1ab69d] ${compact ? "px-2.5 py-2" : "px-2.5 py-2.5 2xl:px-3.5"}`}>
        {group.title}
        {hasItems && <FontAwesomeIcon icon={faChevronDown} className="text-xs transition-transform duration-300 group-hover:rotate-180" />}
      </Link>
      {hasItems && (
        <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-3 rounded-2xl bg-white p-3 text-[#18213b] opacity-0 shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="grid max-h-[420px] gap-1 overflow-y-auto">
            {group.items.map((item) => (
              <li key={typeof item === "string" ? item : item.label}>
                <Link href={typeof item === "string" ? "#" : item.href} className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-[#179BD7]/10 hover:text-[#179BD7]">
                  {typeof item === "string" ? item : item.label}
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
        className={`bg-transparent text-sm text-white outline-none placeholder:text-white/55 transition-all duration-300 ${display ? "w-44 px-2 opacity-100" : "w-0 opacity-0"
          }`}
        placeholder="Search"
      />
      <button type="button" onClick={() => setDisplay(!display)} className="relative z-[90] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-white hover:text-[#18213b]" aria-label="Toggle search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="relative z-[100]" />
      </button>
    </div>
  );
}

function MobileHeader({ settings, primaryLinks, quickLinks }) {
  const menuScrollRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    menuScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setActiveGroup(null);
  };


  const toggleMenu = () => {
    if (open) {
      setActiveGroup(null);
    }

    setOpen((currentOpen) => !currentOpen);
  };


  return (
    <div className="sticky top-0 z-60 bg-white shadow-lg ring-1 ring-black/5 xl:hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex min-w-0 items-center">
          <Image src={settings.images.navLogo} alt="KMM College logo" width={145} height={100} priority className="h-auto w-36 sm:w-40" />
        </a>

        <div className="flex items-center gap-2">
          <Link href="/admission" className="rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#179BD7]/20 sm:inline-flex">
            Admission
          </Link>
          <button type="button" onClick={toggleMenu} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#18213b] text-white shadow-lg transition-colors duration-300 hover:bg-[#179BD7]" aria-label="Toggle navigation" aria-expanded={open}>
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ${open ? "max-h-[calc(100vh-76px)] opacity-100 " : "max-h-0 opacity-0"}`}>
        <div ref={menuScrollRef} className="max-h-[calc(100vh-76px)] overflow-y-auto px-4  pb-6 pt-4">
          <div className="rounded-2xl bg-[#18213b] p-4 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1ab69d]">Quick Contact</p>
            <div className="mt-4 space-y-3 text-sm font-semibold">
              <a href={`tel:${settings.contact.primaryPhone}`} className="flex items-center gap-2 transition-colors duration-300 hover:text-[#1ab69d]">
                <FontAwesomeIcon icon={faPhone} className="text-[#1ab69d]" />
                <span>{settings.contact.primaryPhone}</span>
              </a>
              <a href="contact#enquiry-form" className="flex min-w-0 items-center gap-2 transition-colors duration-300 hover:text-[#1ab69d]">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#1ab69d]" />
                <span className="break-all">{settings.contact.email}</span>
              </a>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div />
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

        </div>
      </div>
    </div>
  );
}
