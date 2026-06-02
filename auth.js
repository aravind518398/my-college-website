import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import {
  hashLoginToken,
  OTP_LOGIN_TOKEN_COOKIE,
  timingSafeEqualHex,
} from "@/lib/otp";
import User from "@/models/User";



const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1),
});

function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase();
}

function getAllowedGitHubEmails() {
  return new Set(
    (process.env.ADMIN_GITHUB_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 0,
  },

  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours
  },

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const adminEmail = getAdminEmail();

        if (!adminEmail || email !== adminEmail) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user?.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        const cookieStore = await cookies();
        const loginToken = cookieStore.get(OTP_LOGIN_TOKEN_COOKIE)?.value;

        if (!loginToken || !user.otpLoginToken || !user.otpLoginTokenExpires) {
          return null;
        }

        if (user.otpLoginTokenExpires.getTime() <= Date.now()) {
          user.otpLoginToken = null;
          user.otpLoginTokenExpires = null;
          await user.save();

          return null;
        }

        const loginTokenHash = hashLoginToken(loginToken);
        const isOtpVerified = timingSafeEqualHex(
          user.otpLoginToken,
          loginTokenHash
        );

        if (!isOtpVerified) {
          return null;
        }

        user.otpLoginToken = null;
        user.otpLoginTokenExpires = null;
        await user.save();

        try {
          cookieStore.delete(OTP_LOGIN_TOKEN_COOKIE);
        } catch {
          // The database token is already single-use, so cookie deletion is best-effort.
        }

        return {
          id: String(user._id),
          email: user.email,
          role: user.role ?? "admin",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "github") {
        return true;
      }

      const email = user.email?.trim().toLowerCase();

      if (!email) {
        return false;
      }

      const allowedEmails = getAllowedGitHubEmails();

      if (allowedEmails.has(email)) {
        user.role = "admin";
        return true;
      }

      await connectDB();

      const adminUser = await User.findOne({ email }).lean();

      if (!adminUser) {
        return false;
      }

      user.id = String(adminUser._id);
      user.role = adminUser.role ?? "admin";

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "admin";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
});
