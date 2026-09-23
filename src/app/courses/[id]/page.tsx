import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);
  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <main
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "48px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        <Link
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#2563eb",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          ← กลับไปหน้ารายการรายวิชา
        </Link>

        <article
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #edf2f7",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
            <span
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                fontWeight: "700",
                fontSize: "13px",
                padding: "4px 12px",
                borderRadius: "8px",
                letterSpacing: "0.5px",
              }}
            >
              {course.code}
            </span>
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              {course.credit} หน่วยกิต
            </span>
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#0f172a",
              margin: "0 0 24px 0",
              lineHeight: 1.3,
            }}
          >
            {course.name}
          </h1>

          <div
            style={{
              borderTop: "1px solid #f1f5f9",
              paddingTop: "20px",
              display: "grid",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b", fontSize: "14px" }}>อาจารย์ผู้สอน</span>
              <span style={{ color: "#0f172a", fontSize: "14px", fontWeight: "600" }}>
                {course.instructor || "-"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b", fontSize: "14px" }}>สถานะหลักสูตร</span>
              <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "600" }}>
                เปิดให้ลงทะเบียน
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}