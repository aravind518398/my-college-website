import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { deleteCloudinaryPdf } from "@/lib/cloudinaryPdfs";

export const runtime = "nodejs";

const MAX_PDF_SIZE = 20 * 1024 * 1024;
const ALLOWED_PDF_TYPES = new Set(["application/pdf"]);
const ALLOWED_FOLDERS = new Set([
  "kmm-college/pdfs",
  "kmm-college/academic-calendar",
]);

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function safeFolder(value) {
  const folder = String(value || "").trim();
  return ALLOWED_FOLDERS.has(folder) ? folder : "kmm-college/pdfs";
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

    const data = await req.formData();
    const file = data.get("file");
    const folder = safeFolder(data.get("folder"));

    if (!file || typeof file.arrayBuffer !== "function") {
      return Response.json({ error: "No PDF uploaded." }, { status: 400 });
    }

    if (!ALLOWED_PDF_TYPES.has(file.type)) {
      return Response.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_PDF_SIZE) {
      return Response.json(
        { error: "PDF must be 20 MB or smaller." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "raw",
            overwrite: false,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    if (!uploadResponse?.secure_url || !uploadResponse?.public_id) {
      throw new Error("Cloudinary did not return PDF upload details.");
    }

    return Response.json({
      success: true,
      pdfUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      title: String(file.name || "Uploaded PDF").trim(),
      bytes: uploadResponse.bytes,
      format: uploadResponse.format,
    });
  } catch (error) {
    console.error("Cloudinary PDF upload failed:", error);
    return Response.json(
    {
      error:
        "PDF upload failed. Cloudinary free plan allows only PDFs up to 10 MB. Please compress your PDF and try again.",
      compressLink: "https://www.ilovepdf.com/compress_pdf",
    },
    { status: 500 }
  );
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
    const pdfUrl = String(body.pdfUrl || body.href || "").trim();

    if (!publicId && !pdfUrl) {
      return Response.json(
        { error: "publicId or pdfUrl is required." },
        { status: 400 }
      );
    }

    const result = await deleteCloudinaryPdf({ publicId, pdfUrl });

    return Response.json({ success: true, ...result });
  } catch (error) {
    console.error("Cloudinary PDF delete failed:", error);
    return Response.json(
      { error: error.message || "PDF delete failed." },
      { status: 500 }
    );
  }
}
