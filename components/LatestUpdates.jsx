"use client";

import { faCalendarDays, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

import {
  defaultLatestUpdates,
  formatUpdateDate,
} from "@/lib/latestUpdatesDefaults";

const VISIBLE_COUNT = 3;

export default function LatestUpdates() {
  const [showAll, setShowAll] = useState(false);
  const [allUpdates, setAllUpdates] = useState(defaultLatestUpdates);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/latest-updates")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data?.updates) && data.updates.length) {
          setAllUpdates(data.updates);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, [allUpdates, showAll]);

  if (!allUpdates.length) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur">
      <div className="shrink-0 bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Latest Updates</h2>
      </div>

      <div
        ref={listRef}
        className="flex-1 divide-y divide-gray-100 overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: showAll ? `${listHeight}px` : `${VISIBLE_COUNT * 100}px`,
        }}
      >
        {allUpdates.map((update, index) => (
          <div key={update.id || `${update.title}-${index}`} className="group p-5 transition-colors duration-300 hover:bg-[#179BD7]/5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#179BD7]">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>{formatUpdateDate(update.date)}</span>
            </div>
            <h3 className="mt-2 text-sm font-bold leading-snug text-[#18213b] transition-colors duration-300 group-hover:text-[#179BD7]">
              {update.title}
            </h3>
          </div>
        ))}
      </div>

      {allUpdates.length > VISIBLE_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="flex w-full shrink-0 cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-bold text-[#8a3b1f] transition-colors duration-300 hover:bg-[#8a3b1f]/5"
        >
          {showAll ? "Show Less" : "Show More"}
          <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
        </button>
      )}
    </div>
  );
}
