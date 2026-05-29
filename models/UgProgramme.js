import mongoose from "mongoose";

const UgSyllabusItemSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    detail: { type: String, default: "" },
    href: { type: String, default: "" },
    pdfPublicId: { type: String, default: "" },
    pdfTitle: { type: String, default: "" },
    status: { type: String, default: "Not Available" },
  },
  { _id: false, strict: false }
);

const UgProgrammeItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    shortName: { type: String, default: "" },
    title: { type: String, default: "" },
    syllabus: { type: [UgSyllabusItemSchema], default: [] },
  },
  { _id: false, strict: false }
);

const UgProgrammeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "ug",
      unique: true,
      index: true,
    },
    programmes: {
      type: [UgProgrammeItemSchema],
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
