import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";



const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1),
});

function getAllowedGitHubEmails() {
  return new Set(
    (process.env.ADMIN_GITHUB_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
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

        await connectDB();

        const user = await User.findOne({ email }).lean();

        if (!user?.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
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
        token.id = user.id;  // ✅ Add this — needed to identify user in session
    token.role = user.role ?? "admin";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
    session.user.id = token.id;    // ✅ Add this
    session.user.role = token.role;
  }

      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
