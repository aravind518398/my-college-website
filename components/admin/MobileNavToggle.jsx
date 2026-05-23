"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAdminCms } from "./AdminCmsLayout";

export default function MobileNavToggle() {
  const { navOpen, toggleNav } = useAdminCms();

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
