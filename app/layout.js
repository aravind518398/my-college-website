import { Geist, Geist_Mono, Montserrat, Smooch } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{scrollBehavior:"smooth"}}>

      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
