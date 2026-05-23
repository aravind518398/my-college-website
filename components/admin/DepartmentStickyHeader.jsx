"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function DepartmentStickyHeader({ id, name, facultyCount }) {
  const [visible, setVisible] = useState(true);
  const prevId = useRef(id);

  useEffect(() => {
    if (prevId.current !== id) {
      setVisible(false);
      const timer = setTimeout(() => {
        prevId.current = id;
        setVisible(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [id]);

  return (
  <div
  className={` sticky top-20 lg:top-1 z-20 
    rounded-xl border border-[#dce7f0] bg-[#fbfdff]/10
    px-3 py-3 sm:px-4 sm:py-4
    mb-4 sm:mb-5
    flex gap-2 sm:gap-3 flex-row items-start justify-between
    backdrop-blur
    transition-all duration-150 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
>
  <div className="min-w-0">
    <p
      className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm
      font-bold uppercase tracking-[0.16em] text-[#1ab69d]"
    >
      Department
    </p>

    <h3
      className="mt-1 text-base sm:text-lg md:text-xl lg:text-2xl
      leading-tight font-bold text-[#18213b] break-words"
    >
      {name}
    </h3>

    <Link
      href={`/departments#${id}`}
      target="_blank"
      className="mt-1 inline-block
      text-[10px] sm:text-xs md:text-sm
      font-semibold text-[#179BD7]"
    >
      View public section
    </Link>
  </div>

  <span
    className="shrink-0 w-fit rounded-full bg-[#179BD7]/10
    px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
    text-[9px] sm:text-[11px] md:text-sm
    font-bold text-[#1469b8]"
  >
    {facultyCount} faculty cards
  </span>
</div>
);
}