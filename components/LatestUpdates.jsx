"use client";

import { faCalendarDays, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect, useMemo } from "react";

export default function LatestUpdates() {
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  const VISIBLE_COUNT = 3;

  const allUpdates = useMemo(
    () => [
      "ADMISSIONS STARTED",
      "UG & PG 2025-2026 ADMISSION STARTED",
      "New courses available for 2025",
      "Scholarship applications are open",
      "Campus interview registrations started",
    ],
    []
  );

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, [allUpdates]);

  const visibleUpdates = showAll
    ? allUpdates
    : allUpdates.slice(0, VISIBLE_COUNT);

  return (
    <div className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur flex flex-col">
                <div className="bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-4 shrink-0">
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Latest Updates</h2>
                </div>

                <div
                  ref={listRef}
                  className="divide-y divide-gray-100 flex-1 overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: showAll
                      ? `${listHeight}px`
                      : `${VISIBLE_COUNT * 100}px`,
                  }}
                >
                  {allUpdates.map((update, index) => (
                    <div key={`${update}-${index}`} className="group p-5 transition-colors duration-300 hover:bg-[#179BD7]/5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#179BD7]">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span>March 17, {
                          (() => {
                            const now = new Date();
                            const thisYearMar17 = new Date(now.getFullYear(), 2, 17); // Month is 0-indexed
                            return now >= thisYearMar17 ? now.getFullYear() : now.getFullYear() - 1;
                          })()
                        }</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold leading-snug text-[#18213b] transition-colors duration-300 group-hover:text-[#179BD7]">
                        {update}
                      </h3>
                    </div>
                  ))}
                </div>

                {allUpdates.length > VISIBLE_COUNT && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="shrink-0 flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-bold text-[#8a3b1f] transition-colors duration-300 hover:bg-[#8a3b1f]/5"
                  >
                    {showAll ? "Show Less" : "Show More"}
                    <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
                  </button>
                )}
              </div>
  );
}