import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.Department ||
  mongoose.model("Department", DepartmentSchema);
