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
    <section id="home-carousel" className="relative isolate min-h-[480px] overflow-hidden text-white sm:min-h-[560px] lg:min-h-[680px]">
      {slides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image}
          className={`object-cover ${SLIDE_POSITION} transition-opacity duration-700 ease-in-out ${
            safeActiveSlide === index ? "opacity-100" : "opacity-0"
          }`}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
        />
      ))}
      
      {/* Background Gradients and Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#18213b]/90 via-[#18213b]/55 to-[#18213b]/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/65 via-transparent to-[#18213b]/35"></div>
      <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#179BD7]/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#1ab69d]/20 blur-3xl"></div>
      
      {/* Dynamic Slide Content */}
      <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl items-center px-4 py-20 sm:min-h-[560px] sm:px-6 lg:min-h-[680px] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-11 w-1.5 rounded-full bg-[#1ab69d]"></span>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d] sm:text-sm">{currentSlide?.eyebrow}</p>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">{currentSlide?.title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/82 sm:text-base lg:text-lg lg:leading-8">{currentSlide?.description}</p>
        
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

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={goToPrevious}
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

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:bottom-7">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
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