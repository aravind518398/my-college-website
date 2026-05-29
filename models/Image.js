import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    format: String,
    bytes: Number,
    width: Number,
    height: Number,
    uploadedBy: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);
