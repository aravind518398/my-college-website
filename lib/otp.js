import crypto from "crypto";

const OTP_DIGITS = 6;

export const OTP_EXPIRY_MS = 5 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_LOGIN_TOKEN_COOKIE = "admin_otp_login_token";
export const OTP_LOGIN_TOKEN_EXPIRY_MS = 10 * 60 * 1000;

function getSecret() {
  const secret = process.env.AUTH_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_SECRET.");
  }

  return secret;
}

export function generateOtp() {
  const max = 10 ** OTP_DIGITS;
  return String(crypto.randomInt(0, max)).padStart(OTP_DIGITS, "0");
}

export function generateLoginToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashOtp(email, otp) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${email.toLowerCase()}:${otp}`)
    .digest("hex");
}

export function hashLoginToken(token) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(token)
    .digest("hex");
}

export function timingSafeEqualHex(a, b) {
  if (!a || !b || a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}
