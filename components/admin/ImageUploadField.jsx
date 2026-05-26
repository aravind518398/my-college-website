"use client";

import { faImage, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsLayout";

const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/avif";

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

    carousel:
      "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#d9e6f1] bg-[#edf5fb] shadow-lg shadow-[#18213b]/5",
    campus:
      "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#d9e6f1] bg-[#edf5fb] shadow-lg shadow-[#18213b]/5" ,

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
  let startUpload = () => { };
  let finishUpload = () => { };

  try {
    const cms = useAdminCms();
    startUpload = cms.startUpload || startUpload;
    finishUpload = cms.finishUpload || finishUpload;
  } catch (err) {
    // useAdminCms may throw if component is used outside admin provider — ignore.
  }

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setStatus("uploading");
    setMessage("");
    try {
      startUpload();
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
      setMessage("Image uploaded successfully!. Don't forget to save your changes.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Image upload failed.");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (finishUpload) finishUpload();
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

        <div className="flex flex-col  gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor={inputId}
            className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/15 transition ${status === "uploading"
                ? "bg-[#7aaec8]"
                : "bg-gradient-to-r from-[#179BD7] to-[#1ab69d] hover:-translate-y-0.5"
              }`}
          >
            <FontAwesomeIcon
              icon={status === "uploading" ? faSpinner : faUpload}
              className={status === "uploading" ? "animate-spin" : ""}
            />
            {status === "uploading" ? "Uploading..." : hasPreview ? "Replace image" : "Upload image"}
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
            className={`mt-2 text-xs font-semibold text-center ${status === "error" ? "text-[#a33c3c]" : "text-[#12826f]"
              }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
