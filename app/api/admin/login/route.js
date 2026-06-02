import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import { sendAdminOtpEmail } from "@/lib/adminMailer";
import { generateOtp, hashOtp, OTP_EXPIRY_MS } from "@/lib/otp";
import User from "@/models/User";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1).max(200),
});

const INVALID_LOGIN_MESSAGE = "Invalid email or password.";

function getAdminEmail() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("Missing ADMIN_EMAIL.");
  }

  return email;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const parsedPayload = loginSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return Response.json(
        { success: false, error: INVALID_LOGIN_MESSAGE },
        { status: 400 }
      );
    }

    const { email, password } = parsedPayload.data;
    const adminEmail = getAdminEmail();

    if (email !== adminEmail) {
      return Response.json(
        { success: false, error: INVALID_LOGIN_MESSAGE },
        { status: 401 }
      );
    }

    await connectDB();

    const admin = await User.findOne({ email });

    if (!admin?.password) {
      return Response.json(
        { success: false, error: INVALID_LOGIN_MESSAGE },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return Response.json(
        { success: false, error: INVALID_LOGIN_MESSAGE },
        { status: 401 }
      );
    }

    const otp = generateOtp();

    admin.otp = hashOtp(email, otp);
    admin.otpExpires = new Date(Date.now() + OTP_EXPIRY_MS);
    admin.otpAttempts = 0;
    admin.otpLoginToken = null;
    admin.otpLoginTokenExpires = null;

    await admin.save();
    await sendAdminOtpEmail({ to: email, otp });

    return Response.json({ success: true, requiresOtp: true });
  } catch (error) {
    console.error("Admin login OTP error:", error);

    return Response.json(
      { success: false, error: "Unable to send verification code right now." },
      { status: 500 }
    );
  }
}
