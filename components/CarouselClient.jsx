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

export default function CarouselClient({ initialSlides }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const transitionTimeout = useRef(null);

  const slides = initialSlides || [];

  // Autoplay setup
  useEffect(() => {
    if (!slides.length) return undefined;

    const autoplay = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => clearTimeout(autoplay);
  }, [activeSlide, slides.length]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearTimeout(transitionTimeout.current);
  }, []);

  if (!slides.length) {
    return null;
  }

  const safeActiveSlide = Math.min(activeSlide, slides.length - 1);
  const currentSlide = slides[safeActiveSlide];

  const changeSlide = (getNextSlide) => {
    if (isChanging) return;

    setIsChanging(true);
    setActiveSlide(getNextSlide);
    clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setIsChanging(false);
    }, 550);
  };

  const goToPrevious = () => {
    changeSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    changeSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section id="home-carousel" className="relative isolate h-[480px] w-full overflow-hidden bg-[#18213b] text-white sm:h-[560px] lg:h-[680px]">
      
      {/* Dynamic Slide Background Images Container */}
      {slides.map((slide, index) => (
        <div
          key={slide.id || index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
            safeActiveSlide === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          {slide.image && (
            <Image
              src={slide.image}
              className={`object-cover ${SLIDE_POSITION}`}
              alt={slide.alt || slide.title || "College Banner"}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          )}
        </div>
      ))}
      
      {/* Fixed Background Gradients and Accents - Set at z-15 to sit cleanly between image and content */}
      <div className="absolute inset-0 z-15 bg-gradient-to-r from-[#18213b]/95 via-[#18213b]/55 to-[#18213b]/20"></div>
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-[#18213b]/65 via-transparent to-[#18213b]/35"></div>
      <div className="absolute -left-28 top-20 z-15 h-72 w-72 rounded-full bg-[#179BD7]/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-0 z-15 h-80 w-80 rounded-full bg-[#1ab69d]/20 blur-3xl"></div>
      
      {/* Dynamic Slide Content Layer */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-11 w-1.5 rounded-full bg-[#1ab69d]"></span>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d] sm:text-sm">
              {currentSlide?.eyebrow || "KMM COLLEGE"}
            </p>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl transition-all duration-500">
            {currentSlide?.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base lg:text-lg lg:leading-8">
            {currentSlide?.description}
          </p>
        
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/admission" className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#179BD7]/25 transition-all duration-300 hover:-translate-y-1">
              Explore Admissions
              <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/academics" className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white/12 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#18213b]">
              View Programmes
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons Controls */}
      <button
        type="button"
        onClick={goToPrevious}
        disabled={isChanging}
        className="absolute bottom-6 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-[#18213b] disabled:cursor-not-allowed disabled:opacity-50 sm:left-auto sm:right-20 lg:bottom-auto lg:left-4 lg:right-auto lg:top-1/2 lg:-translate-y-1/2"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        disabled={isChanging}
        className="absolute bottom-6 left-18 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-[#18213b] disabled:cursor-not-allowed disabled:opacity-50 sm:left-auto sm:right-4 lg:bottom-auto lg:right-4 lg:top-1/2 lg:-translate-y-1/2"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3 sm:bottom-7">
        {slides.map((slide, index) => (
          <button
            key={slide.id || index}
            type="button"
            onClick={() => changeSlide(() => index)}
            disabled={isChanging || safeActiveSlide === index}
            className={`h-2.5 rounded-full ring-1 ring-white/20 transition-all duration-300 ${
              safeActiveSlide === index ? "w-9 bg-[#1ab69d]" : "w-2.5 bg-white/45 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}