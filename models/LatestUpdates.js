import mongoose from "mongoose";

const LatestUpdatesSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "home",
      unique: true,
      index: true,
    },
    updates: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.LatestUpdates ||
  mongoose.model("LatestUpdates", LatestUpdatesSchema);
