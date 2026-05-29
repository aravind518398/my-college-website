import mongoose from "mongoose";

const PgSyllabusItemSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    detail: { type: String, default: "" },
    href: { type: String, default: "" },
    pdfPublicId: { type: String, default: "" },
    pdfTitle: { type: String, default: "" },
    status: { type: String, default: "Coming soon" },
  },
  { _id: false, strict: false }
);

const PgProgrammeItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    shortName: { type: String, default: "" },
    title: { type: String, default: "" },
    syllabus: { type: [PgSyllabusItemSchema], default: [] },
  },
  { _id: false, strict: false }
);

const PgProgrammeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "pg",
      unique: true,
      index: true,
    },
    programmes: {
      type: [PgProgrammeItemSchema],
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

export default mongoose.models.PgProgramme ||
  mongoose.model("PgProgramme", PgProgrammeSchema);
