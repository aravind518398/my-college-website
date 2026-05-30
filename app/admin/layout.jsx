// app/admin/layout.jsx
// Add BugReportButton to your existing admin layout like this:

import BugReportButton from "@/components/BugReportButton";

export default function AdminLayout({ children }) {
  return (
    <div>
      {/* ...your existing admin navbar, sidebar, etc... */}

      <main>{children}</main>

      {/* Bug report button — floats on every admin page */}
      <BugReportButton />
    </div>
  );
}