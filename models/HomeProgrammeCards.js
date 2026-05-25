import mongoose from "mongoose";

const HomeProgrammeCardsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "home",
      unique: true,
      index: true,
    },
    ugCards: {
      type: Array,
      default: [],
    },
    pgCards: {
      type: Array,
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.models.HomeProgrammeCards ||
  mongoose.model("HomeProgrammeCards", HomeProgrammeCardsSchema);
