import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "site",
      unique: true,
      index: true,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
