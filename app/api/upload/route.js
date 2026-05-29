import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { deleteCloudinaryImage } from "@/lib/cloudinaryAssets";
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
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return Response.json(
        { error: "Only JPEG, PNG, WebP, and AVIF images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "Image must be 5 MB or smaller." },
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

            // ── Server-side compression (stage 2 of 2) ────────────────────
            //
            // The browser has already resized & re-encoded the image via
            // canvas (stage 1).  These transformations let Cloudinary do a
            // second, lossless-to-the-eye pass:
            //
            //   • width 1920 / crop limit  — hard cap on stored dimensions;
            //     images already ≤ 1920 px are unaffected.
            //   • quality auto:best        — Cloudinary's perceptual quality
            //     engine; typically 20–40 % smaller than a fixed quality:80.
            //   • fetch_format auto        — serves WebP to Chrome/Edge,
            //     AVIF to modern browsers, JPEG to older ones — no extra work
            //     required on your side.
            //   • strip_profile true       — removes EXIF / ICC metadata
            //     (often 20–100 KB on camera photos).
            //   • progressive true         — JPEG progressive scan so the
            //     image fades in rather than loading top-to-bottom.
            transformation: [
              {
                width: 1920,
                crop: "limit",           // never upscale
                quality: "auto:best",    // perceptual quality optimisation
                fetch_format: "auto",    // WebP / AVIF based on browser
                strip_profile: true,     // strip EXIF / ICC metadata
                progressive: true,       // progressive JPEG encoding
              },
            ],
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
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const publicId = String(body.publicId || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();

    if (!publicId && !imageUrl) {
      return Response.json(
        { error: "publicId or imageUrl is required." },
        { status: 400 }
      );
    }

    const result = await deleteCloudinaryImage({ publicId, imageUrl });

    return Response.json({ success: true, ...result });
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    return Response.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
