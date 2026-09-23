import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = { title: "ระบบจัดการรายวิชา" };

export default function CoursesPage() {
  return (
    <main
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "48px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>
            ระบบจัดการรายวิชา
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            จัดการ เพิ่ม ลบ และค้นหาหลักสูตรรายวิชาทั้งหมดในระบบ
          </p>
        </div>

        <CourseExplorer initialCourses={courses} />
      </div>
    </main>
  );
}