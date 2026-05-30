import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, title, description, steps, screenshotUrl, pageUrl, reportedAt } = body;

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    // ── Format the date nicely ──────────────────────────────────────────────────
    const formattedDate = new Date(reportedAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ── Map type to label ───────────────────────────────────────────────────────
    const typeLabels = {
      bug: "🐞 Bug",
      ux: "🎨 UX / Design",
      feature: "💡 Feature request",
      other: "📝 Other",
    };
    const typeLabel = typeLabels[type] || type;

    // ── Build the HTML email body ───────────────────────────────────────────────
    const htmlBody = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
        
        <div style="background: #E24B4A; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #fff; font-size: 20px;">🐞 New Issue Report</h1>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">${formattedDate}</p>
        </div>

        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${typeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Title</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; font-weight: 600;">${title}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Page URL</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px;">
                <a href="${pageUrl}" style="color: #185FA5;">${pageUrl}</a>
              </td>
            </tr>
          </table>

          ${description ? `
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Description</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${description}</div>
          </div>
          ` : ""}

          ${steps ? `
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Steps to reproduce</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${steps}</div>
          </div>
          ` : ""}

          ${screenshotUrl ? `
          <div>
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Screenshot</p>
            <a href="${screenshotUrl}" target="_blank">
              <img 
                src="${screenshotUrl}" 
                alt="Bug screenshot"
                style="width: 100%; max-width: 100%; border-radius: 8px; border: 1px solid #e5e7eb; display: block;"
              />
            </a>
            <p style="margin: 8px 0 0; font-size: 12px; color: #aaa;">
              <a href="${screenshotUrl}" style="color: #185FA5;">View full screenshot ↗</a>
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

    // ── Send via Resend ─────────────────────────────────────────────────────────
    const { data, error } = await resend.emails.send({
      from: "Bug Reports <onboarding@resend.dev>", // change after verifying your domain
      to: [process.env.YOUR_EMAIL],
      subject: `[${typeLabel}] ${title}`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Email failed to send" }, { status: 500 });
    }

    // ── Optional: Save to MongoDB ───────────────────────────────────────────────
    // Uncomment this block to also log reports in your database
    //
    // import { connectDB } from "@/lib/mongodb"; // your existing connection helper
    // import BugReport from "@/models/BugReport";
    // await connectDB();
    // await BugReport.create({ type, title, description, steps, screenshotUrl, pageUrl, reportedAt });

    return Response.json({ success: true, id: data?.id }, { status: 200 });

  } catch (err) {
    console.error("Report bug error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}