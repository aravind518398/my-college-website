import nodemailer from "nodemailer";

export const runtime = "nodejs";

const collegeName = "K.M.M. College";
const collegeEmail = "kmmkumbalam@gmail.com";
const collegePhone = "9037002130";
const secondaryPhone = "8590601342";
const allowedTypes = new Set([
  "General",
  "Admissions",
  "Academics",
  "Placements",
  "Student Support",
  "Grievance / Complaint",
]);

function cleanText(value, maxLength = 1000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function cleanLine(value, maxLength = 160) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, " ");
}

function escapeHtml(value, maxLength = 1000) {
  return cleanText(value, maxLength)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASS;

  if (!user || !pass) {
    throw new Error("Missing Gmail credentials. Set GMAIL_USER and GMAIL_APP_PASS.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function emailShell({ title, subtitle, body, footer, tone = "dark" }) {
  const headerBg = tone === "green" ? "#1ab69d" : "#18213b";
  const subtitleColor = tone === "green" ? "#eafff9" : "#8fe8db";
  const footerBg = tone === "green" ? "#f0fdf9" : "#f8faf7";
  const footerColor = tone === "green" ? "#12826f" : "#40506f";

  return `
    <div style="margin:0;padding:28px 12px;background:#f8faf7;font-family:Arial,Helvetica,sans-serif;color:#18213b;">
      <div style="max-width:640px;margin:0 auto;overflow:hidden;border:1px solid #dceae5;border-radius:22px;background:#ffffff;box-shadow:0 18px 45px rgba(24,33,59,0.10);">
        <div style="background:${headerBg};padding:28px 32px;">
          <p style="margin:0 0 8px;color:${subtitleColor};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${collegeName}</p>
          <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;font-weight:800;">${title}</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.76);font-size:14px;line-height:1.7;">${subtitle}</p>
        </div>
        <div style="padding:30px 32px;background:#ffffff;">
          ${body}
        </div>
        <div style="padding:18px 32px;background:${footerBg};border-top:1px solid #dceae5;">
          <p style="margin:0;color:${footerColor};font-size:12px;line-height:1.7;">${footer}</p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const name = cleanLine(payload.name, 120);
    const email = cleanLine(payload.email, 160).toLowerCase();
    const phone = cleanLine(payload.phone, 40);
    const type = cleanLine(payload.type || payload.programme, 80);
    const message = cleanText(payload.message, 2000);

    if (!name || !email || !phone || !type || !message) {
      return Response.json(
        { success: false, error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!allowedTypes.has(type)) {
      return Response.json(
        { success: false, error: "Please select a valid enquiry type." },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const fromAddress = process.env.GMAIL_USER;
    const recipient = process.env.ENQUIRY_TO_EMAIL || collegeEmail;
    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeType = escapeHtml(type);
    const safeMessage = escapeHtml(message, 2000).replaceAll("\n", "<br>");
    const safeSubmittedAt = escapeHtml(submittedAt);

    await transporter.sendMail({
      from: `"KMM Website Enquiry" <${fromAddress}>`,
      to: recipient,
      replyTo: `"${name}" <${email}>`,
      subject: `New ${type} Enquiry - ${name}`,
      html: emailShell({
        title: `New ${safeType} Enquiry`,
        subtitle: "A visitor submitted the contact form on the college website.",
        body: `
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${[
              ["Full Name", safeName],
              ["Email", `<a href="mailto:${safeEmail}" style="color:#1469b8;font-weight:700;text-decoration:none;">${safeEmail}</a>`],
              ["Phone", `<a href="tel:${safePhone}" style="color:#18213b;font-weight:700;text-decoration:none;">${safePhone}</a>`],
              ["Enquiry Type", `<span style="display:inline-block;padding:6px 14px;border-radius:999px;background:#1ab69d1f;color:#12826f;font-size:12px;font-weight:800;">${safeType}</span>`],
              ["Submitted On", safeSubmittedAt],
            ]
              .map(
                ([label, value]) => `
                  <tr style="border-bottom:1px solid #eef3f1;">
                    <td style="width:140px;padding:13px 0;color:#64748b;font-weight:700;vertical-align:top;">${label}</td>
                    <td style="padding:13px 0;color:#18213b;line-height:1.7;">${value}</td>
                  </tr>
                `
              )
              .join("")}
          </table>
          <div style="margin-top:22px;padding:18px;border:1px solid #dceae5;border-radius:16px;background:#f8faf7;">
            <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;">Message</p>
            <p style="margin:0;color:#334155;font-size:14px;line-height:1.8;">${safeMessage}</p>
          </div>
          <div style="margin-top:24px;">
            <a href="mailto:${safeEmail}" style="display:inline-block;border-radius:999px;background:#18213b;color:#ffffff;padding:12px 22px;text-decoration:none;font-size:13px;font-weight:800;">Reply to ${safeName}</a>
          </div>
        `,
        footer: `This enquiry was sent from the ${collegeName} website contact form.`,
      }),
    });

    await transporter.sendMail({
      from: `"${collegeName}" <${fromAddress}>`,
      to: email,
      replyTo: collegeEmail,
      subject: `We received your enquiry - ${collegeName}`,
      html: emailShell({
        title: `Thank you, ${safeName}`,
        subtitle: "Your enquiry has reached the college office.",
        tone: "green",
        body: `
          <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.8;">
            We have received your <strong>${safeType}</strong> enquiry. Our team will review your message and get back to you as soon as possible.
          </p>
          <div style="margin:22px 0;padding:18px;border:1px solid #dceae5;border-radius:16px;background:#f8faf7;">
            <p style="margin:0 0 10px;color:#64748b;font-size:12px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;">Your Details</p>
            <p style="margin:0;color:#18213b;font-size:14px;line-height:1.9;">
              <strong>Email:</strong> ${safeEmail}<br>
              <strong>Phone:</strong> ${safePhone}<br>
              <strong>Submitted:</strong> ${safeSubmittedAt}
            </p>
          </div>
          <p style="margin:0;color:#64748b;font-size:13px;line-height:1.8;">
            For urgent support, call <strong style="color:#18213b;">${collegePhone}</strong> or <strong style="color:#18213b;">${secondaryPhone}</strong> during office hours.
          </p>
        `,
        footer: `${collegeName}, Kumbalam, Kerala - 682506 | ${collegeEmail}`,
      }),
    });

    return Response.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Enquiry email error:", error);

    return Response.json(
      { success: false, error: "Failed to send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
