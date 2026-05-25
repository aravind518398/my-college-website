import mongoose from "mongoose";

const PgProgrammeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "pg",
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

export default mongoose.models.PgProgramme ||
  mongoose.model("PgProgramme", PgProgrammeSchema);
