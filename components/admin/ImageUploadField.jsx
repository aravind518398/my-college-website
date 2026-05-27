"use client";

import { faImage, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsLayout";

const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/avif";

// Max dimension (width or height) after resize. Larger images are scaled down
// proportionally; smaller images are left at their original size.
const MAX_DIMENSION = 1920;

// JPEG quality used when re-encoding on canvas. 0.82 gives a good
// quality-to-size ratio; lower values reduce size further at the cost of
// visible compression artefacts.
const CANVAS_QUALITY = 0.82;

/**
 * Compresses an image File using an off-screen canvas.
 *
 * Steps:
 *  1. Decode the file into an <img> element.
 *  2. Calculate new dimensions (never upscale).
 *  3. Draw onto a canvas at those dimensions.
 *  4. Re-encode as JPEG at the configured quality.
 *
 * Returns a new File whose size is typically 60–80 % smaller than the
 * original for high-resolution photos.
 */
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { naturalWidth: w, naturalHeight: h } = img;

      // Scale down proportionally if either dimension exceeds MAX_DIMENSION.
      if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / w, MAX_DIMENSION / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Canvas unavailable (e.g. headless test env) — fall back to original.
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // toBlob failed — fall back to original.
            resolve(file);
            return;
          }

          const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // Only use the compressed version when it is actually smaller.
          resolve(compressed.size < file.size ? compressed : file);
        },
        "image/jpeg",
        CANVAS_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Decode failed — fall back to original.
      resolve(file);
    };

    img.src = objectUrl;
  });
}

export default function ImageUploadField({
  label,
  name,
  defaultValue = "",
  previewAlt = "Uploaded image preview",
  variant = "default",
}) {
  const previewVariants = {
    faculty:
      "relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg shadow-[#18213b]/10",
    person:
      "relative h-[240px] w-[240px] overflow-hidden rounded-full shadow-2xl transition duration-300 group-hover:scale-105",
    carousel:
      "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#d9e6f1] bg-[#edf5fb] shadow-lg shadow-[#18213b]/5",
    campus:
      "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#d9e6f1] bg-[#edf5fb] shadow-lg shadow-[#18213b]/5",
    placedStudents:
      "relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-[#d9e6f1] bg-[#edf5fb] shadow-md shadow-[#18213b]/5",
    default:
      "relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#edf5fb]",
  };

  const inputId = useId();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  let startUpload = () => {};
  let finishUpload = () => {};

  try {
    const cms = useAdminCms();
    startUpload = cms.startUpload || startUpload;
    finishUpload = cms.finishUpload || finishUpload;
  } catch {
    // useAdminCms may throw if used outside the admin provider — ignore.
  }

  const uploadImage = async (event) => {
    const raw = event.target.files?.[0];
    if (!raw) return;

    setStatus("uploading");
    setMessage("");

    try {
      startUpload();

      // ── Stage 1: client-side canvas compression ──────────────────────────
      const file = await compressImage(raw);

      // ── Stage 2: upload (Cloudinary further optimises server-side) ────────
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.imageUrl) {
        throw new Error(data?.error || "Image upload failed.");
      }

      setImageUrl(data.imageUrl);
      setStatus("success");
      setMessage("Image uploaded successfully! Don't forget to save your changes.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Image upload failed.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
      finishUpload();
    }
  };

  const hasPreview = Boolean(imageUrl);

  return (
    <div className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        <FontAwesomeIcon icon={faImage} className="text-[#179BD7]" />
        {label}
      </span>

      <input type="hidden" name={name} value={imageUrl} />

      <div className="flex flex-col gap-3 items-center mt-2 rounded-lg border border-[#d9e6f1] bg-white p-3">
        {hasPreview ? (
          <div className={previewVariants[variant]}>
            <Image
              src={imageUrl}
              alt={previewAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mb-3 text-center grid aspect-[16/9] place-items-center rounded-lg border border-dashed border-[#c9d9e7] bg-[#fbfdff] text-sm font-semibold text-[#63708a]">
            No image selected
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor={inputId}
            className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/15 transition ${
              status === "uploading"
                ? "bg-[#7aaec8]"
                : "bg-gradient-to-r from-[#179BD7] to-[#1ab69d] hover:-translate-y-0.5"
            }`}
          >
            <FontAwesomeIcon
              icon={status === "uploading" ? faSpinner : faUpload}
              className={status === "uploading" ? "animate-spin" : ""}
            />
            {status === "uploading"
              ? "Uploading..."
              : hasPreview
              ? "Replace image"
              : "Upload image"}
          </label>
        </div>

        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          className="sr-only"
          disabled={status === "uploading"}
          onChange={uploadImage}
        />

        {message ? (
          <p
            className={`mt-2 text-xs font-semibold text-center ${
              status === "error" ? "text-[#a33c3c]" : "text-[#12826f]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}