import { revalidatePath } from "next/cache";

import {
  defaultCarouselSlides,
  MAX_CAROUSEL_SLIDES,
} from "@/lib/carouselDefaults";
import { connectDB } from "@/lib/mongodb";
import Carousel from "@/models/Carousel";

export { defaultCarouselSlides, MAX_CAROUSEL_SLIDES };

function normalizeSlide(slide, index) {
  const title = String(slide.title || "").trim();
  const image = String(slide.image || "").trim();

  return {
    id: String(slide.id || `slide-${index + 1}`).trim(),
    title,
    eyebrow: String(slide.eyebrow || "").trim(),
    description: String(slide.description || "").trim(),
    image,
    imagePublicId: String(slide.imagePublicId || "").trim(),
    alt: String(slide.alt || "").trim() || title,
  };
}

export function normalizeCarouselSlides(slides = []) {
  return slides
    .map((slide, index) => normalizeSlide(slide, index))
    .filter((slide) => slide.title && slide.image)
    .slice(0, MAX_CAROUSEL_SLIDES);
}

export async function getCarouselSlides() {
  await connectDB();

  let carousel = await Carousel.findOne({ key: "home" }).lean();

  if (!carousel) {
    carousel = await Carousel.create({
      key: "home",
      slides: defaultCarouselSlides,
    });
    carousel = carousel.toObject();
  }

  const slides = normalizeCarouselSlides(carousel.slides);

  if (!slides.length) {
    return defaultCarouselSlides;
  }

  return slides;
}

export async function saveCarouselSlides(slides) {
  await connectDB();

  const normalizedSlides = normalizeCarouselSlides(slides);

  await Carousel.findOneAndUpdate(
    { key: "home" },
    { $set: { key: "home", slides: normalizedSlides } },
    { new: true, upsert: true }
  );

  revalidatePath("/");

  return normalizedSlides;
}
