"use client";

import {
  faDownload,
  faFilePdf,
  faSpinner,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsLayout";

const ACCEPTED_PDF_TYPES = "application/pdf,.pdf";

export default function PDFUploadField({
  label,
  name,
  defaultValue = "",
  defaultPublicId = "",
  defaultTitle = "",
  publicIdName = `${name}PublicId`,
  titleName = `${name}Title`,
  deleteName = `${name}Delete`,
  folder = "kmm-college/pdfs",
}) {
  const inputId = useId();
  const fileInputRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(defaultValue);
  const [publicId, setPublicId] = useState(defaultPublicId);
  const [title, setTitle] = useState(defaultTitle);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  let startUpload = () => { };
  let finishUpload = () => { };

  try {
    const cms = useAdminCms();
    startUpload = cms.startUpload || startUpload;
    finishUpload = cms.finishUpload || finishUpload;
  } catch {
    // useAdminCms may throw if used outside the admin provider.
  }

  const hasPdf = Boolean(pdfUrl) && !deleteRequested;

  const uploadPdf = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setMessage("");

    try {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("Only PDF files are allowed.");
      }

      startUpload();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/pdf-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.pdfUrl) {
        throw new Error(data?.error || "PDF upload failed.");
      }

      setPdfUrl(data.pdfUrl);
      setPublicId(data.publicId || "");
      setTitle(data.title || file.name);
      setDeleteRequested(false);
      setStatus("success");
      setMessage("PDF uploaded successfully. Save your changes to publish it.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "PDF upload failed.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
      finishUpload();
    }
  };

  const clearPdf = () => {
    setDeleteRequested(true);
    setPdfUrl("");
    setPublicId("");
    setTitle("");
    setStatus("success");
    setMessage("PDF marked for deletion. Save your changes to remove it.");
  };

  return (
    <div className="block overflow-hidden">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        <FontAwesomeIcon icon={faFilePdf} className="text-[#179BD7]" />
        {label}
      </span>

      <input type="hidden" name={name} value={deleteRequested ? "" : pdfUrl} />
      <input type="hidden" name={publicIdName} value={deleteRequested ? "" : publicId} />
      <input type="hidden" name={titleName} value={deleteRequested ? "" : title} />
      <input type="hidden" name={deleteName} value={deleteRequested ? "1" : ""} />

      <div className="mt-2 rounded-lg border border-[#d9e6f1] bg-white p-3">
        {hasPdf ? (
          <div className="rounded-lg border border-[#e1ebf4] bg-[#fbfdff] p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fff2f2] text-[#b42318]">
                <FontAwesomeIcon icon={faFilePdf} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#18213b]">
                  {title || "Uploaded PDF"}
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-[#179BD7] hover:text-[#1ab69d]"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Preview / download current PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid min-h-24 place-items-center rounded-lg border border-dashed border-[#c9d9e7] bg-[#fbfdff] px-4 text-center text-sm font-semibold text-[#63708a]">
            No PDF selected
          </div>
        )}

        <div className="mt-3 flex  min-w-0  flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor={inputId}
            className={`inline-flex h-11 w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/15 transition ${status === "uploading"
                ? "bg-[#7aaec8]"
                : "bg-gradient-to-r from-[#179BD7] to-[#1ab69d] hover:-translate-y-0.5"
              }`}
          >
            <FontAwesomeIcon
              icon={status === "uploading" ? faSpinner : faUpload}
              className={status === "uploading" ? "animate-spin" : ""}
            />
            {status === "uploading" ? "Uploading..." : hasPdf ? "Replace PDF" : "Upload PDF"}
          </label>

          {hasPdf ? (
            <button
              type="button"
              onClick={clearPdf}
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-4 text-sm font-bold text-[#a33c3c] transition hover:bg-[#ffecec]"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete PDF
            </button>
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED_PDF_TYPES}
          className="sr-only"
          disabled={status === "uploading"}
          onChange={uploadPdf}
        />

        {message ? (
          <div
            className={`mt-2 rounded-lg p-3 text-center text-xs font-semibold ${status === "error"
              ? "border border-[#ffd7d7] bg-[#fff6f6] text-[#a33c3c]"
              : "border border-[#cdeee6] bg-[#f3fffb] text-[#12826f]"
              }`}
          >
            <p>{message}</p>

            {status === "error" && (
              <a
                href="https://www.ilovepdf.com/compress_pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-[#179BD7] underline hover:text-[#1ab69d]"
              >
                <FontAwesomeIcon icon={faFilePdf} />
                Compress PDF with iLovePDF
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
