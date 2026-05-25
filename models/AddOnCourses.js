import mongoose from "mongoose";

const AddOnCoursesSchema = new mongoose.Schema(
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
    groups: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.AddOnCourses ||
  mongoose.model("AddOnCourses", AddOnCoursesSchema);
