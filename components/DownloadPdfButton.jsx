"use client";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DownloadPdfButton({ pdfUrl, title }) {
    const handleDownload = async () => {
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${title || "Academic Calendar"}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#18213b] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1ab69d] sm:w-auto"
        >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
        </button>
    );
}




export function DownloadPdfLink({ pdfUrl, title }) {
    const handleDownload = async () => {
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${title}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (

        <a
            onClick={handleDownload}
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-[#179BD7] hover:text-[#1ab69d] cursor-pointer"
        >
            <FontAwesomeIcon icon={faDownload} />
            Preview / download current PDF
        </a>

    );



}