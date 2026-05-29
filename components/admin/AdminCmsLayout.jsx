"use client";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext, useEffect, useState } from "react";

const AdminCmsContext = createContext(null);

export const ADMIN_CMS_SECTIONS = [
  { id: "carousel", label: "Home Carousel" },
  { id: "latest-updates", label: "Latest Updates" },
  { id: "home-programme-cards", label: "Home Programme Cards" },
  { id: "college-campus-image", label: "Campus Image" },
  { id: "contact-settings", label: "Contact & Social" },
  { id: "about-messages", label: "About Messages" },
  { id: "add-on-courses", label: "Add-On Courses" },
  { id: "facilities", label: "Facilities" },
  { id: "campus-sections", label: "Campus Overview" },
  { id: "ug-programmes", label: "UG Programmes" },
  { id: "pg-programmes", label: "PG Programmes" },
  { id: "placed-students", label: "Placed Students" },
  { id: "departments", label: "Departments" },
  { id: "nss-programme-officers", label: "NSS Programme Officers" },
];

export function AdminCmsProvider({ children, defaultSection = "carousel" }) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [navOpen, setNavOpen] = useState(true);
  const [uploadingCount, setUploadingCount] = useState(0);

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

  useEffect(() => {
    // default nav open state depends on screen width (open on lg and above)
    const handleResize = () => setNavOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  const toggleNav = () => setNavOpen((v) => !v);

  const closeNav = () => setNavOpen(false);

  const startUpload = () => setUploadingCount((c) => c + 1);
  const finishUpload = () => setUploadingCount((c) => Math.max(0, c - 1));

  return (
    <AdminCmsContext.Provider
      value={{
        activeSection,
        selectSection,
        navOpen,
        toggleNav,
        closeNav,
        uploadingCount,
        startUpload,
        finishUpload,
      }}
    >
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
  const { activeSection, selectSection, closeNav } = useAdminCms();
  const isActive = activeSection === id;

  return (
    <a
      type="button"
      href="#"
      onClick={() => {
        selectSection(id);
        if (window.innerWidth < 1024) {
          closeNav();
        }
      }}
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
  const { uploadingCount } = useAdminCms();

  return (
    <div className="sticky bottom-1  z-20 mt-3 flex justify-end rounded-xl border border-[#dce7f0] bg-white/10 p-3 shadow-xs backdrop-blur">
      <button
        type="submit"
        disabled={uploadingCount > 0}
        className={`inline-flex h-12 items-center  gap-3 rounded-lg px-6 text-sm font-bold text-white shadow-lg transition ${
          uploadingCount > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#179BD7] to-[#1ab69d] hover:-translate-y-0.5 shadow-[#179BD7]/20"
        }`}
        title={uploadingCount > 0 ? "Please wait for image uploads to finish" : undefined}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        {uploadingCount > 0 ? "Uploading images..." : label}
      </button>
    </div>
  );
}


