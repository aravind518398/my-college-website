import cloudinary from "@/lib/cloudinary";

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export function extractPdfPublicIdFromCloudinaryUrl(pdfUrl = "") {
  if (!pdfUrl || !pdfUrl.includes("res.cloudinary.com")) {
    return "";
  }

  try {
    const url = new URL(pdfUrl);
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

    return decodeURIComponent(publicIdParts.join("/"));
  } catch {
    return "";
  }
}

export function getCloudinaryPdfPublicId(asset = {}) {
  const explicitPublicId = String(
    asset.publicId ||
      asset.pdfPublicId ||
      asset.documentPublicId ||
      asset.calendarPublicId ||
      ""
  ).trim();

  if (explicitPublicId) {
    return explicitPublicId;
  }

  const pdfUrl = String(
    asset.pdfUrl || asset.href || asset.url || asset.documentUrl || ""
  ).trim();

  return extractPdfPublicIdFromCloudinaryUrl(pdfUrl);
}

export async function deleteCloudinaryPdf(asset = {}) {
  const publicId = getCloudinaryPdfPublicId(asset);

  if (!publicId) {
    return { deleted: false, reason: "missing-public-id" };
  }

  if (!hasCloudinaryConfig()) {
    throw new Error("Cloudinary is not configured.");
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
    invalidate: true,
  });

  return {
    deleted: result?.result === "ok" || result?.result === "not found",
    publicId,
    result: result?.result,
  };
}

export async function deleteUnusedCloudinaryPdfs(previousAssets = [], nextAssets = []) {
  const nextPublicIds = new Set(
    nextAssets.map((asset) => getCloudinaryPdfPublicId(asset)).filter(Boolean)
  );

  const staleAssets = previousAssets.filter((asset) => {
    const publicId = getCloudinaryPdfPublicId(asset);
    return publicId && !nextPublicIds.has(publicId);
  });

  const uniqueAssets = Array.from(
    new Map(staleAssets.map((asset) => [getCloudinaryPdfPublicId(asset), asset])).values()
  );

  const results = [];

  for (const asset of uniqueAssets) {
    try {
      results.push(await deleteCloudinaryPdf(asset));
    } catch (error) {
      console.error("Cloudinary PDF delete failed:", {
        publicId: getCloudinaryPdfPublicId(asset),
        error,
      });
      results.push({
        deleted: false,
        publicId: getCloudinaryPdfPublicId(asset),
        error: error.message || "Cloudinary PDF delete failed",
      });
    }
  }

  return results;
}

export async function deleteUnusedCloudinaryPdfsStrict(previousAssets = [], nextAssets = []) {
  const results = await deleteUnusedCloudinaryPdfs(previousAssets, nextAssets);
  const failures = results.filter((result) => result.error || result.result === "error");

  if (failures.length) {
    const publicIds = failures.map((failure) => failure.publicId).filter(Boolean);
    throw new Error(
      `Failed to delete Cloudinary PDF${failures.length > 1 ? "s" : ""}: ${publicIds.join(", ")}`
    );
  }

  return results;
}
