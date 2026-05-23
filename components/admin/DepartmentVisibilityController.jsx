"use client";

import { useEffect } from "react";

export default function DepartmentVisibilityController({ ids = [] }) {
  useEffect(() => {
    function show(id) {
      const sections = document.querySelectorAll(".department-section");
      sections.forEach((s) => s.classList.add("hidden"));

      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.classList.remove("hidden");
        // ensure the target is scrolled into view if hash navigation didn't
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (sections[0]) {
        sections[0].classList.remove("hidden");
      }
    }

    function handleHashChange() {
      const id = window.location.hash ? window.location.hash.slice(1) : null;
      show(id);
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [ids]);

  return null;
}
