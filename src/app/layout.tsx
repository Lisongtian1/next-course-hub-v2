import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "next-course-hub",
  description: "ระบบจัดการรายวิชา",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#0f172a",
        }}
      >
        {/* Navigation Bar ด้านบน */}
        <header
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "0 20px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#2563eb",
                  display: "inline-block",
                }}
              />
              <span style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a" }}>
                CourseHub
              </span>
            </div>

            <nav style={{ display: "flex", gap: "24px" }}>
              <Link
                href="/courses"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2563eb",
                }}
              >
                รายวิชา (Courses)
              </Link>
              <Link
                href="/about"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#64748b",
                  transition: "color 0.2s",
                }}
              >
                เกี่ยวกับ (About)
              </Link>
            </nav>
          </div>
        </header>

        {/* เนื้อหาหน้าเว็บ */}
        {children}
      </body>
    </html>
  );
}