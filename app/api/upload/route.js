import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";
import Image from "@/models/Image";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasCloudinaryConfig()) {
      return Response.json(
        { error: "Cloudinary is not configured." },
        { status: 500 }
      );
    }

    await connectDB();

    const data = await req.formData();
    const file = data.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return Response.json(
        { error: "Only JPEG, PNG, WebP, and AVIF images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "Image must be 5MB or smaller." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "kmm-college/carousel",
            resource_type: "image",
            overwrite: false,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    if (!uploadResponse?.secure_url) {
      throw new Error("Cloudinary did not return a secure image URL.");
    }

    const savedImage = await Image.create({
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      format: uploadResponse.format,
      bytes: uploadResponse.bytes,
      width: uploadResponse.width,
      height: uploadResponse.height,
      uploadedBy: session.user.email || session.user.id,
    });

    return Response.json({
      success: true,
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      image: savedImage,
    });

  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
