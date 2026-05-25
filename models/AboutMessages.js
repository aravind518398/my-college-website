import mongoose from "mongoose";

const AboutMessagesSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "about",
      unique: true,
      index: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.AboutMessages ||
  mongoose.model("AboutMessages", AboutMessagesSchema);
