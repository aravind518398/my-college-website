
import mongoose from "mongoose";

const NssProgrammeOfficerSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },

    officers: [
      {
        id: String,
        name: String,
        designation: String,
        department: String,
        unit: String,
        image: String,
        alt: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NssProgrammeOfficers ||
  mongoose.model(
    "NssProgrammeOfficers",
    NssProgrammeOfficerSchema
  );

