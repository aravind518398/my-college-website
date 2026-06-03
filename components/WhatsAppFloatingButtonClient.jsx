"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

import { getWhatsappHref } from "@/lib/siteSettingsDefaults";
import { motion } from "motion/react";

const defaultWhatsappHref = getWhatsappHref();

export default function WhatsAppFloatingButtonClient({
  whatsappHref = defaultWhatsappHref,
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.a
initial={{ scale: 0}}
animate={{ scale: 1}}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 8,
      }}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KMM College on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[90] flex items-center gap-3 rounded-full bg-[#25D366] px-3 py-3 text-white shadow-2xl shadow-[#25D366]/30 ring-1 ring-white/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/35 sm:bottom-6 sm:right-6 sm:px-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl sm:h-10 sm:w-10">
        <FontAwesomeIcon icon={faWhatsapp} />
      </span>
      <span className="hidden pr-1 text-sm font-bold leading-tight sm:block">
        Chat with us
      </span>
    </motion.a>
  );
}
