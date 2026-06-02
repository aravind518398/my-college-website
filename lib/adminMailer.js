import nodemailer from "nodemailer";
import { adminOtpEmailTemplate } from "@/lib/adminOtpEmailTemplate";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASS;

  if (!user || !pass) {
    throw new Error("Missing Gmail SMTP credentials. Set GMAIL_USER and GMAIL_APP_PASS.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendAdminOtpEmail({ to, otp }) {
  const fromAddress = process.env.GMAIL_USER;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"KMM Admin Security" <${fromAddress}>`,
    to,
    subject: "Your KMM admin verification code",
    html: adminOtpEmailTemplate({ otp }),
    text: `Your KMM admin verification code is ${otp}. It expires in 5 minutes.`,
  });
}
