"use client";

import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDE_POSITION = "object-center";

export default function Carousel({ initialSlides }) {
  // Use the pre-fetched server slides as the initial state
  const [slides] = useState(initialSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const transitionTimeout = useRef(null);

  useEffect(() => {
    if (!slides || !slides.length) return undefined;

    const autoplay = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => clearTimeout(autoplay);
  }, [activeSlide, slides?.length]);

  if (!slides || !slides.length) return null;

  const safeActiveSlide = Math.min(activeSlide, slides.length - 1);

  const goToPrev = () => {
    if (isChanging) return;
    setIsChanging(true);
    setActiveSlide((current) => (current === 0 ? slides.length - 1 : current - 1));
    transitionTimeout.current = setTimeout(() => setIsChanging(false), 500);
  };

  const goToNext = () => {
    if (isChanging) return;
    setIsChanging(true);
    setActiveSlide((current) => (current + 1) % slides.length);
    transitionTimeout.current = setTimeout(() => setIsChanging(false), 500);
  };

  return (
    <div className="relative h-[460px] w-full overflow-hidden bg-[#10172b] sm:h-[540px] lg:h-[640px]">
      {slides.map((slide, index) => {
        const isActive = index === safeActiveSlide;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.title || "Carousel banner slide layout"}
                fill
                priority={index === 0}
                className={`object-cover ${SLIDE_POSITION}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#10172b]/85 via-[#10172b]/50 to-transparent" />
            
            <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-8 lg:px-16">
              <div className="max-w-xl text-white">
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 text-sm text-white/85 sm:text-base">
                  {slide.description}
                </p>
                {slide.ctaLink && (
                  <Link
                    href={slide.ctaLink}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1ab69d] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#18213b]"
                  >
                    {slide.ctaText || "Learn More"}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Nav Controls */}
      <button
        type="button"
        onClick={goToPrev}
        disabled={isChanging}
        className="absolute bottom-6 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-[#18213b] disabled:cursor-not-allowed disabled:opacity-50 sm:left-auto sm:right-20 lg:bottom-auto lg:left-4 lg:right-auto lg:top-1/2 lg:-translate-y-1/2"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        disabled={isChanging}
        className="absolute bottom-6 left-18 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-[#18213b] disabled:cursor-not-allowed disabled:opacity-50 sm:left-auto sm:right-4 lg:bottom-auto lg:right-4 lg:top-1/2 lg:-translate-y-1/2"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}