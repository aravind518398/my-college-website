"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAdminCms } from "./AdminCmsLayout";
import { useEffect } from "react";

export default function MobileNavToggle() {
  const { navOpen, toggleNav } = useAdminCms();

useEffect(() => {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (navOpen && !isDesktop) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [navOpen]);

  return (
    <button
      type="button"
      onClick={toggleNav}
      className="inline-flex h-10 items-center gap-2 rounded-3xl border border-[#d9e6f1] bg-white px-3 text-sm font-semibold text-[#18213b] transition hover:bg-white/90 lg:hidden"
      aria-label={navOpen ? "Close navigation" : "Open navigation"}
    >
      <FontAwesomeIcon icon={navOpen ? faXmark : faBars} />
    </button>
  );
}
