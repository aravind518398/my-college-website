import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartLine,
  faShieldHalved,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import { auth } from "@/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin Login | KMM College Kumbalam",
  description: "Secure administrator sign in for KMM College Kumbalam.",
};



export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="h-screen overflow-y-auto bg-[linear-gradient(135deg,#eef7fb_0%,#f4fcfa_48%,#f8fbff_100%)] ">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 pb-[24px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-2 py-2 text-sm font-semibold text-[#18213b] shadow-sm backdrop-blur transition hover:border-[#179BD7]/30 hover:text-[#179BD7]"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to website
          </Link>
          <div className="rounded-full border border-[#179BD7]/10 bg-white/80 px-2 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#179BD7] shadow-sm backdrop-blur">
            Admin Portal
          </div>
        </div>

        {/* Centered card */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div className="rounded-[32px] border border-[#1ab69d50] bg-white/92 p-6 shadow-2xl shadow-[#179BD7]/10 backdrop-blur sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">
                  Welcome back
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#18213b] sm:text-3xl">
                  Sign in to continue
                </h2>
                <p className="mt-3 text-sm leading-5 text-[#5d6c87]">
                  Use your administrator credentials to access the internal dashboard.
                </p>
              </div>
              <AdminLoginForm />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
