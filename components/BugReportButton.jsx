"use client";

import { useState, useRef, useEffect } from "react";
import { domToPng } from "modern-screenshot";
import { usePathname } from "next/navigation";

const ISSUE_TYPES = [
  { value: "bug", label: "🐞 Bug" },
  { value: "ux", label: "🎨 UX / Design" },
  { value: "feature", label: "💡 Feature request" },
  { value: "other", label: "📝 Other" },
];

export default function BugReportButton() {
    const pathname = usePathname();

  // Hide on login page
  if (pathname === "/admin/login") {
    return null;
  }
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "bug", title: "", description: "", steps: "" });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);


  // ── Auto-capture FULL PAGE ──────────────────────────────────────────────
  const captureScreen = async () => {
    setCapturing(true);

    try {
      setOpen(false);
      await new Promise((r) => setTimeout(r, 200));

      // By omitting width/height, it captures the entire scrollable document
      const dataUrl = await domToPng(document.documentElement);

      setScreenshot(dataUrl);

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      setOpen(true);

      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          setScreenshotFile(new File([blob], "screenshot.png", { type: "image/png" }));
        })
        .catch(console.error);

    } catch (err) {
      console.error(err);
      setOpen(true);
    } finally {
      setCapturing(false);
    }
  };

  // ── Manual file upload ─────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshot(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Upload to Cloudinary ───────────────────────────────────────────────────
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");
    return data.secure_url;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
  if (!form.title.trim()) return;
  setSubmitting(true);
  setStatus(null);

  try {
    let screenshotUrl = null;
    if (screenshotFile) {
      screenshotUrl = await uploadToCloudinary(screenshotFile);
    }

    const res = await fetch("/api/report-bug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        screenshotUrl,
        pageUrl: window.location.href,
        reportedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errBody = await res.text(); // 👈 read the actual error
      throw new Error(`API error ${res.status}: ${errBody}`);
    }

    setStatus("success");
    setTimeout(() => {
      setOpen(false);
      setForm({ type: "bug", title: "", description: "", steps: "" });
      setScreenshot(null);
      setScreenshotFile(null);
      setStatus(null);
    }, 2000);
  } catch (err) {
    console.error("Submit failed:", err); // 👈 check browser console
    setStatus("error");
    setErrorMessage(err.message); // 👈 show real message in UI
  } finally {
    setSubmitting(false);
  }
};

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        // CHANGED: Just open the modal initially instead of triggering captureScreen
        onClick={() => setOpen(true)}
        disabled={capturing}
        title="Report an issue"
        className={`
          fixed bottom-5 right-12 z-20
          flex items-center justify-center gap-2
          w-12 h-12 md:w-auto md:h-auto
          md:px-4 md:py-2.5
          bg-gradient-to-r from-red-500 via-red-600 to-red-700
          hover:to-red-800 active:scale-95
          text-white text-sm font-semibold
          rounded-full md:rounded-md
          shadow-lg shadow-red-500/30
          transition-all duration-150
          ${capturing ? "opacity-90 cursor-not-allowed" : ""}
        `}
      >
        {capturing ? (
          // 🌀 Loading Spinner Icon shown during capture
          <svg
            className="animate-spin h-5 w-5 text-white shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          // ⚠️ Original Warning Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        )}

        <span className="hidden md:inline">
          {capturing ? "Capturing..." : "Report Issue"}
        </span>
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* ── Modal ── */}
      {open && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg  bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Report an issue</h2>
              <p className="text-xs text-gray-400 mt-0.5">This will be emailed directly to the developer</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-12 h-12 text-gray-500 hover:text-gray-700 text-3xl sm:text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Issue type */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Issue type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
            >
              {ISSUE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Upload button not responding on mobile"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Description
            </label>
            <textarea
              placeholder="What did you expect? What happened instead?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition resize-y"
            />
          </div>

          {/* Steps to reproduce */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Steps to reproduce
            </label>
            <textarea
              placeholder={"1. Go to...\n2. Click on...\n3. See the error"}
              value={form.steps}
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition resize-y"
            />
          </div>

          {/* Screenshot */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Screenshot
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                type="button"
                onClick={captureScreen}
                disabled={capturing}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {capturing ? "Capturing…" : "📸 Capture full page"}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600 transition"
              >
                📁 Upload file
              </button>
              {screenshot && (
                <button
                  type="button"
                  onClick={() => { setScreenshot(null); setScreenshotFile(null); }}
                  className="px-3 py-1.5 text-xs border border-red-200 rounded-lg bg-white hover:bg-red-50 text-red-500 transition"
                >
                  ✕ Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {screenshot ? (
              /* 1. overflow-y-auto forces vertical-only scrolling */
              <div className="w-full max-h-48 sm:max-h-64 overflow-y-auto overflow-x-hidden rounded-lg border border-gray-200 bg-gray-50">
                <img
                  src={screenshot}
                  alt="Screenshot preview"
                  /* 2. w-full forces it to match the modal width, h-auto lets the height flow naturally down */
                  className="w-full h-auto block"
                />
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-xs text-gray-400">
                No screenshot — use capture full page or upload a file
              </div>
            )}


          </div>

          {/* Submit */}
          {status === "success" ? (
            <div className="text-center py-3 text-sm font-medium text-green-700 bg-green-50 rounded-lg">
              ✅ Report sent! Thank you.
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.title.trim()}
              className="w-full py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {submitting ? "Sending…" : "Send report"}
            </button>
          )}

          {status === "error" && (
  <p className="text-center text-xs text-red-500 mt-2">
    {errorMessage || "Something went wrong. Please try again."}
  </p>
)}

        </div>
      )}
    </>
  );
}