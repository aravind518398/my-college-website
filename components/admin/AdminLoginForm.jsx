"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faArrowLeft,
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const DEFAULT_ERROR_MESSAGE = "Unable to sign in with those credentials.";
const ERROR_MESSAGES = {
  AccessDenied: "This GitHub account is not allowed to access the admin panel.",
  OAuthAccountNotLinked: "Use the same email as your admin account, or sign in with your password.",
};

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isGitHubPending, setIsGitHubPending] = useState(false);
  const [error, setError] = useState(() => {
    const authError = searchParams.get("error");

    return authError ? ERROR_MESSAGES[authError] || DEFAULT_ERROR_MESSAGE : "";
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.requiresOtp) {
        setError(data.error || DEFAULT_ERROR_MESSAGE);
        return;
      }

      setOtp("");
      setStep("otp");
    } catch {
      setError("Unable to send verification code. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleOtpSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Invalid or expired verification code.");
        return;
      }

      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Verification succeeded, but session creation failed. Please sign in again.");
        setStep("login");
        setOtp("");
        setPassword("");
        return;
      }

      router.push(result.url || callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to verify code. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleGitHubSignIn() {
    setIsGitHubPending(true);
    setError("");

    await signIn("github", { callbackUrl });
  }

  function returnToLogin() {
    setStep("login");
    setOtp("");
    setError("");
  }

  return (
    <div className="space-y-5">
      {step === "login" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#18213b]">
              Official email
            </label>
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#d5dfeb] bg-white px-4 shadow-sm transition focus-within:border-[#179BD7] focus-within:ring-4 focus-within:ring-[#179BD7]/10">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#179BD7]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@kmmcollege.edu"
                className="h-full w-full bg-transparent text-sm text-[#18213b] outline-none placeholder:text-[#7b8aa5]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-[#18213b]">
              Password
            </label>
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#d5dfeb] bg-white px-4 shadow-sm transition focus-within:border-[#179BD7] focus-within:ring-4 focus-within:ring-[#179BD7]/10">
              <FontAwesomeIcon icon={faLock} className="text-[#179BD7]" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-full w-full bg-transparent text-sm text-[#18213b] outline-none placeholder:text-[#7b8aa5]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#62718d] transition hover:bg-[#f3f7fb] hover:text-[#18213b]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-[#ffd8d8] bg-[#fff5f5] px-4 py-3 text-sm font-medium text-[#a23838]">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending || isGitHubPending}
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-6 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Sending code
              </>
            ) : (
              <>
                Continue
                <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <button
            type="button"
            onClick={returnToLogin}
            disabled={isPending}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#62718d] transition hover:text-[#18213b] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <div className="rounded-2xl border border-[#d5dfeb] bg-[#f8fafc] px-4 py-3 text-sm leading-6 text-[#40506f]">
            A 6-digit verification code was sent to{" "}
            <span className="font-semibold  text-[#18213b] wrap-break-word">{email}</span>.
          </div>

          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-semibold text-[#18213b]">
              Verification code
            </label>
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#d5dfeb] bg-white px-4 shadow-sm transition focus-within:border-[#179BD7] focus-within:ring-4 focus-within:ring-[#179BD7]/10">
              <FontAwesomeIcon icon={faKey} className="text-[#179BD7]" />
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit code"
                className="h-full w-full bg-transparent text-sm text-[#18213b] outline-none placeholder:text-[#7b8aa5]"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-[#ffd8d8] bg-[#fff5f5] px-4 py-3 text-sm font-medium text-[#a23838]">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending || isGitHubPending || otp.length !== 6}
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#179BD7] to-[#1ab69d] px-6 text-sm font-bold text-white shadow-lg shadow-[#179BD7]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Verifying
              </>
            ) : (
              <>
                Verify and sign in
                <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
        </form>
      )}

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#dbe7f1]" />
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b8aa5]">
          or
        </span>
        <div className="h-px flex-1 bg-[#dbe7f1]" />
      </div>

      <button
        type="button"
        onClick={handleGitHubSignIn}
        disabled={isPending || isGitHubPending}
        className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#18213b]/15 bg-[#18213b] px-6 text-sm font-bold text-white shadow-lg shadow-[#18213b]/10 transition hover:-translate-y-0.5 hover:bg-[#10182d] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isGitHubPending ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Connecting GitHub
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
            Continue with GitHub
          </>
        )}
      </button>

      <p className="text-center text-sm leading-6 text-[#62718d]">
        Need help with access?{" "}
        <Link href="/contact" className="font-semibold text-[#179BD7] transition hover:text-[#1469b8]">
          Contact the college office
        </Link>
      </p>
    </div>
  );
}
