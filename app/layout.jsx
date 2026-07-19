export const revalidate = 2592000; // cache for 30 days


import { Geist, Geist_Mono, Montserrat } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

import "./globals.css";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KMM COLLEGE KUMBALAM",
  description: "KMM College Kumbalam offers quality education in Arts, Science, and Commerce with modern facilities and experienced faculty.",
  verification: {
    google: 'iSqXwVcdOKlrYOmXJgNj3YlMAY7euGeGI2WEsPXXoow', // Paste your Google code string here
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="md:scroll-smooth">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
