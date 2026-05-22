"use client";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext, useEffect, useState } from "react";

const AdminCmsContext = createContext(null);

export const ADMIN_CMS_SECTIONS = [
  { id: "carousel", label: "Home Carousel" },
  { id: "college-campus-image", label: "Campus Image" },
  { id: "campus-sections", label: "Campus Overview" },
  { id: "ug-programmes", label: "UG Programmes" },
  { id: "placed-students", label: "Placed Students" },
  { id: "departments", label: "Departments" },
];

export function AdminCmsProvider({ children, defaultSection = "carousel" }) {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const syncFromHash = () => {
      const sectionId = window.location.hash.replace("#", "");
      if (ADMIN_CMS_SECTIONS.some((section) => section.id === sectionId)) {
        setActiveSection(sectionId);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  return (
    <AdminCmsContext.Provider value={{ activeSection, selectSection }}>
      {children}
    </AdminCmsContext.Provider>
  );
}

export function useAdminCms() {
  const context = useContext(AdminCmsContext);
  if (!context) {
    throw new Error("useAdminCms must be used within AdminCmsProvider");
  }
  return context;
}

export function AdminCmsNavLink({ id, label, icon }) {
  const { activeSection, selectSection } = useAdminCms();
  const isActive = activeSection === id;

  return (
    <a
      type="button"
      href="#"
      onClick={() => selectSection(id)}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
        isActive
          ? "bg-white/15 text-white shadow-inner shadow-black/10"
          : "text-white/78 hover:bg-white/10 hover:text-white"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-[#8fe8db]" />
      {label}
    </a>
  );
}

export function AdminCmsSection({ id, children }) {
  const { activeSection } = useAdminCms();
  if (activeSection !== id) {
    return null;
  }

  return <div className="pb-8">{children}</div>;
}

export function AdminStickySave({ label = "Save changes" }) {
  return (
    <div className="sticky bottom-4 z-20 mt-6 flex justify-end rounded-xl border border-[#dce7f0] bg-white/95 p-3 shadow-xl backdrop-blur">
      <button
        type="submit"
        className="inline-flex h-12 items-center gap-3 rounded-lg bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-6 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition hover:-translate-y-0.5"
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        {label}
      </button>
    </div>
  );
}
