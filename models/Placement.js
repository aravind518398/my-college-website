import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "placed-students",
      unique: true,
      index: true,
    },
    students: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.Placement ||
  mongoose.model("Placement", PlacementSchema);
