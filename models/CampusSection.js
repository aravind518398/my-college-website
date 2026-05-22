import mongoose from "mongoose";

const CampusSectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "overview",
      unique: true,
      index: true,
    },
    sections: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.CampusSection ||
  mongoose.model("CampusSection", CampusSectionSchema);
