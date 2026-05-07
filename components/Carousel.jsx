"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "KMM College of Arts and Science",
    image: "/images/college.png",
    alt: "KMM College campus",
  },
  {
    title: "KMM College Kumbalam",
    image: "/images/college2.png",
    alt: "KMM College Kumbalam",
  },
  {
    title: "Catalyst Arts",
    image: "/images/catalyst_arts_2026.png",
    alt: "Catalyst Arts",
  },
  {
    title: "Dance",
    image: "/images/image.png",
    alt:"Arabic Dance"
  }
  // Add more carousel images here after placing them in public/images.
  // Example:
  // {
  //   title: "College Event",
  //   image: "/images/event.jpg",
  //   alt: "Students attending a college event",
  // },
];

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const transitionTimeout = useRef(null);

  useEffect(() => {
    const autoplay = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => clearTimeout(autoplay);
  }, [activeSlide]);

  useEffect(() => {
    return () => clearTimeout(transitionTimeout.current);
  }, []);

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
    <section className="relative isolate h-full min-h-[520px] overflow-hidden  text-white">
      {slides.map((slide, index) => (
        <Image
          key={slide.title}
          src={slide.image}
          className={`object-cover transition-opacity duration-500 ease-in-out ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
        />
      ))}
     

      <button
        type="button"
        onClick={goToPrevious}
        disabled={isChanging}
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition-colors duration-300 hover:bg-white hover:text-[#18213b] sm:flex"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        disabled={isChanging}
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition-colors duration-300 hover:bg-white hover:text-[#18213b] sm:flex"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => changeSlide(() => index)}
            disabled={isChanging || activeSlide === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === index ? "w-9 bg-white" : "w-2.5 bg-white/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
