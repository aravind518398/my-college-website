import mongoose from "mongoose";

const UgProgrammeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "ug",
      unique: true,
      index: true,
    },
    programmes: {
      type: Array,
      default: [],
    },
    documentsRequired: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.UgProgramme ||
  mongoose.model("UgProgramme", UgProgrammeSchema);
