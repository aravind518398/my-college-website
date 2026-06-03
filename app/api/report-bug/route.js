import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter (per IP) — note: serverless instances won't share state across instances.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10; // max reports per IP per window
const ipTimestamps = new Map();

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIp(request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown"
  );
}

export async function POST(request) {
  try {
    const ip = getIp(request);

    // Rate limiting
    const now = Date.now();
    const timestamps = ipTimestamps.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    recent.push(now);
    ipTimestamps.set(ip, recent);

    const body = await request.json();
    const { type, title, description, steps, screenshotUrl, pageUrl, reportedAt } = body || {};

    // Basic validation
    const allowedTypes = new Set(["bug", "ux", "feature", "other"]);
    const reportType = allowedTypes.has(type) ? type : "other";

    if (!title || String(title).trim().length < 3) {
      return Response.json({ error: "Title is required and must be at least 3 characters" }, { status: 400 });
    }

    // Validate URLs if present
    let safeScreenshot = "";
    let safePageUrl = "";
    try {
      if (screenshotUrl) {
        const u = new URL(String(screenshotUrl));
        safeScreenshot = u.toString();
      }
    } catch {
      return Response.json({ error: "Invalid screenshot URL" }, { status: 400 });
    }

    try {
      if (pageUrl) {
        const u = new URL(String(pageUrl), `https://${request.headers.get("host") || "localhost"}`);
        safePageUrl = u.toString();
      }
    } catch {
      return Response.json({ error: "Invalid page URL" }, { status: 400 });
    }

    // Sanitize text inputs for HTML
    const safeTitle = escapeHtml(String(title || ""));
    const safeDescription = escapeHtml(String(description || ""));
    const safeSteps = escapeHtml(String(steps || ""));

    const formattedDate = new Date(reportedAt || Date.now()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const typeLabels = {
      bug: "🐞 Bug",
      ux: "🎨 UX / Design",
      feature: "💡 Feature request",
      other: "📝 Other",
    };
    const typeLabel = typeLabels[reportType] || escapeHtml(String(type || "other"));

    const htmlBody = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
        <div style="background: #E24B4A; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #fff; font-size: 20px;">🐞 New Issue Report</h1>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">${escapeHtml(formattedDate)}</p>
        </div>

        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${typeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Title</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; font-weight: 600;">${safeTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Page URL</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px;">
                ${safePageUrl ? `<a href="${escapeHtml(safePageUrl)}" style="color: #185FA5;">${escapeHtml(safePageUrl)}</a>` : "<span style=\"color:#888;\">(none)</span>"}
              </td>
            </tr>
          </table>

          ${safeDescription ? `
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Description</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeDescription}</div>
          </div>
          ` : ""}

          ${safeSteps ? `
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Steps to reproduce</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeSteps}</div>
          </div>
          ` : ""}

          ${safeScreenshot ? `
          <div>
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Screenshot</p>
            <a href="${escapeHtml(safeScreenshot)}" target="_blank" rel="noreferrer noopener">
              <img 
                src="${escapeHtml(safeScreenshot)}" 
                alt="Bug screenshot"
                style="width: 100%; max-width: 100%; border-radius: 8px; border: 1px solid #e5e7eb; display: block;"
              />
            </a>
            <p style="margin: 8px 0 0; font-size: 12px; color: #aaa;">
              <a href="${escapeHtml(safeScreenshot)}" style="color: #185FA5;">View full screenshot ↗</a>
            </p>
          </div>
          ` : `
          <p style="color: #aaa; font-size: 13px; font-style: italic;">No screenshot attached.</p>
          `}

        </div>

        <p style="font-size: 12px; color: #bbb; text-align: center; margin-top: 20px;">
          Sent from your college website admin panel
        </p>
      </div>
    `;

    if (!process.env.RESEND_API_KEY || !process.env.YOUR_EMAIL) {
      console.error("Missing RESEND_API_KEY or YOUR_EMAIL environment variable");
      return Response.json({ error: "Email service not configured" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Bug Reports <onboarding@resend.dev>",
      to: [process.env.YOUR_EMAIL],
      subject: `[${typeLabel}] ${safeTitle}`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Email failed to send" }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id }, { status: 200 });

  } catch (err) {
    console.error("Report bug error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}