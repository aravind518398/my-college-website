import mongoose from "mongoose";

const FacilitiesPageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "page",
      unique: true,
      index: true,
    },
    hero: {
      type: Object,
      default: {},
    },
    items: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.FacilitiesPage ||
  mongoose.model("FacilitiesPage", FacilitiesPageSchema);
