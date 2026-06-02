import { cookies } from "next/headers";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import {
  generateLoginToken,
  hashLoginToken,
  hashOtp,
  OTP_LOGIN_TOKEN_COOKIE,
  OTP_LOGIN_TOKEN_EXPIRY_MS,
  OTP_MAX_ATTEMPTS,
  timingSafeEqualHex,
} from "@/lib/otp";
import User from "@/models/User";

export const runtime = "nodejs";

const verifyOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  otp: z.string().regex(/^\d{6}$/),
});

function getAdminEmail() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("Missing ADMIN_EMAIL.");
  }

  return email;
}

function invalidOtpResponse(status = 400) {
  return Response.json(
    { success: false, error: "Invalid or expired verification code." },
    { status }
  );
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const parsedPayload = verifyOtpSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return invalidOtpResponse();
    }

    const { email, otp } = parsedPayload.data;

    if (email !== getAdminEmail()) {
      return invalidOtpResponse(401);
    }

    await connectDB();

    const admin = await User.findOne({ email });

    if (!admin?.otp || !admin.otpExpires) {
      return invalidOtpResponse();
    }

    if (admin.otpExpires.getTime() <= Date.now()) {
      admin.otp = null;
      admin.otpExpires = null;
      admin.otpAttempts = 0;
      admin.otpLoginToken = null;
      admin.otpLoginTokenExpires = null;
      await admin.save();

      return invalidOtpResponse();
    }

    if (admin.otpAttempts >= OTP_MAX_ATTEMPTS) {
      admin.otp = null;
      admin.otpExpires = null;
      admin.otpAttempts = 0;
      admin.otpLoginToken = null;
      admin.otpLoginTokenExpires = null;
      await admin.save();

      return Response.json(
        { success: false, error: "Too many verification attempts. Please sign in again." },
        { status: 429 }
      );
    }

    const expectedOtpHash = hashOtp(email, otp);
    const isOtpValid = timingSafeEqualHex(admin.otp, expectedOtpHash);

    if (!isOtpValid) {
      admin.otpAttempts += 1;
      await admin.save();

      return invalidOtpResponse();
    }

    const loginToken = generateLoginToken();

    admin.otp = null;
    admin.otpExpires = null;
    admin.otpAttempts = 0;
    admin.otpLoginToken = hashLoginToken(loginToken);
    admin.otpLoginTokenExpires = new Date(Date.now() + OTP_LOGIN_TOKEN_EXPIRY_MS);

    await admin.save();

    const cookieStore = await cookies();

    cookieStore.set(OTP_LOGIN_TOKEN_COOKIE, loginToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: OTP_LOGIN_TOKEN_EXPIRY_MS / 1000,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin OTP verification error:", error);

    return Response.json(
      { success: false, error: "Unable to verify code right now." },
      { status: 500 }
    );
  }
}
