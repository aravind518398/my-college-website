"use client";

import { useAdminCms } from "./AdminCmsLayout";

export default function AdminSidebar({ children }) {
  const { navOpen, closeNav } = useAdminCms();

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed  inset-0 z-20 bg-black/20 backdrop-blur-[2px] transition-opacity lg:hidden ${navOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeNav}
        aria-hidden
      />

      <div
  className={`fixed left-0 top-0 z-30
    h-screen w-[280px] overflow-y-auto
    border-r border-[#dce7f0]
    bg-[#10172b]
    px-5 pt-24 pb-6 text-white
    transition-transform duration-200

    md:pt-16
    lg:sticky lg:top-0 lg:h-screen lg:pt-4 lg:translate-x-0

    ${navOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  {children}
</div>
    </>
  );
}
