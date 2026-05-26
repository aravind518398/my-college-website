import mongoose from "mongoose";

const CarouselSlideSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    eyebrow: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const CarouselSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "home",
      unique: true,
      index: true,
    },
    slides: {
      type: [CarouselSlideSchema],
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.Carousel ||
  mongoose.model("Carousel", CarouselSchema);
