import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export function extractPublicIdFromCloudinaryUrl(imageUrl = "") {
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
    return "";
  }

  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return "";
    }

    const afterUpload = parts.slice(uploadIndex + 1);
    const versionIndex = afterUpload.findIndex((part) => /^v\d+$/.test(part));
    const publicIdParts =
      versionIndex >= 0 ? afterUpload.slice(versionIndex + 1) : afterUpload;

    if (!publicIdParts.length) {
      return "";
    }

    const lastPart = publicIdParts[publicIdParts.length - 1].replace(/\.[^.]+$/, "");
    return decodeURIComponent([...publicIdParts.slice(0, -1), lastPart].join("/"));
  } catch {
    return "";
  }
}

export function getCloudinaryPublicId(asset = {}) {
  const explicitPublicId = String(
    asset.publicId ||
      asset.imagePublicId ||
      asset.imgPublicId ||
      asset.photoPublicId ||
      ""
  ).trim();

  if (explicitPublicId) {
    return explicitPublicId.replace(/\.[a-z0-9]+$/i, "");
  }

  const imageUrl = String(
    asset.imageUrl || asset.image || asset.img || asset.photo || ""
  ).trim();

  return extractPublicIdFromCloudinaryUrl(imageUrl);
}

export async function deleteCloudinaryImage(asset = {}) {
  const publicId = getCloudinaryPublicId(asset);

  if (!publicId) {
    return { deleted: false, reason: "missing-public-id" };
  }

  if (!hasCloudinaryConfig()) {
    throw new Error("Cloudinary is not configured.");
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  await connectDB();
  await Image.deleteMany({ publicId });

  return {
    deleted: result?.result === "ok" || result?.result === "not found",
    publicId,
    result: result?.result,
  };
}

export async function deleteUnusedCloudinaryImages(previousAssets = [], nextAssets = []) {
  const nextPublicIds = new Set(
    nextAssets.map((asset) => getCloudinaryPublicId(asset)).filter(Boolean)
  );

  const staleAssets = previousAssets.filter((asset) => {
    const publicId = getCloudinaryPublicId(asset);
    return publicId && !nextPublicIds.has(publicId);
  });

  const uniqueAssets = Array.from(
    new Map(staleAssets.map((asset) => [getCloudinaryPublicId(asset), asset])).values()
  );

  const results = [];

  for (const asset of uniqueAssets) {
    try {
      results.push(await deleteCloudinaryImage(asset));
    } catch (error) {
      console.error("Cloudinary delete failed:", {
        publicId: getCloudinaryPublicId(asset),
        error,
      });
      results.push({
        deleted: false,
        publicId: getCloudinaryPublicId(asset),
        error: error.message || "Cloudinary delete failed",
      });
    }
  }

  return results;
}

export async function deleteUnusedCloudinaryImagesStrict(previousAssets = [], nextAssets = []) {
  const results = await deleteUnusedCloudinaryImages(previousAssets, nextAssets);
  const failures = results.filter((result) => result.error || result.result === "error");

  if (failures.length) {
    const publicIds = failures.map((failure) => failure.publicId).filter(Boolean);
    throw new Error(
      `Failed to delete Cloudinary image${failures.length > 1 ? "s" : ""}: ${publicIds.join(", ")}`
    );
  }

  return results;
}
