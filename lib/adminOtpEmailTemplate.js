function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function adminOtpEmailTemplate({ otp }) {
  const safeOtp = escapeHtml(otp);

  return `
    <div style="margin:0;padding:28px 12px;background:#f8faf7;font-family:Arial,Helvetica,sans-serif;color:#18213b;">
      <div style="max-width:600px;margin:0 auto;overflow:hidden;border:1px solid #dceae5;border-radius:20px;background:#ffffff;box-shadow:0 18px 45px rgba(24,33,59,0.10);">
        <div style="background:#18213b;padding:28px 32px;">
          <p style="margin:0 0 8px;color:#8fe8db;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">K.M.M. College</p>
          <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;font-weight:800;">Admin login verification</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.76);font-size:14px;line-height:1.7;">Use this one-time password to complete your admin sign-in.</p>
        </div>
        <div style="padding:32px;background:#ffffff;text-align:center;">
          <p style="margin:0 0 12px;color:#40506f;font-size:14px;">Your verification code is</p>
          <div style="display:inline-block;padding:16px 24px;border-radius:16px;background:#eef9fb;color:#18213b;font-size:32px;font-weight:800;letter-spacing:8px;">${safeOtp}</div>
          <p style="margin:20px 0 0;color:#62718d;font-size:13px;line-height:1.7;">This code expires in 5 minutes. If you did not request it, change the admin password immediately.</p>
        </div>
        <div style="padding:18px 32px;background:#f8faf7;border-top:1px solid #dceae5;">
          <p style="margin:0;color:#40506f;font-size:12px;line-height:1.7;">For security, never forward this email or share the OTP with anyone.</p>
        </div>
      </div>
    </div>
  `;
}
