import mongoose from "mongoose";

const CarouselSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "home",
      unique: true,
      index: true,
    },
    slides: {
      type: Array,
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
