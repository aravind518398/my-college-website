import mongoose from "mongoose";

const AcademicCalendarSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "academic-calendar",
      unique: true,
      index: true,
    },
    title: {
      type: String,
      default: "",
    },
    pdfUrl: {
      type: String,
      default: "",
    },
    pdfPublicId: {
      type: String,
      default: "",
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.AcademicCalendar ||
  mongoose.model("AcademicCalendar", AcademicCalendarSchema);
