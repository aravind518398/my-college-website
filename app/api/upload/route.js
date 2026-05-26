import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Image from "@/models/Image";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "nextjs_uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Save URL to MongoDB
    const savedImage = await Image.create({
      imageUrl: uploadResponse.secure_url,
    });

    return Response.json({
      success: true,
      image: savedImage,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}