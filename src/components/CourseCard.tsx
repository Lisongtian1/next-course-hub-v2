import Link from "next/link";
import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <article
      style={{
        backgroundColor: "#ffffff",
        padding: "20px 24px",
        borderRadius: "14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        border: "1px solid #f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "14px",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span
            style={{
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "700",
              padding: "4px 10px",
              borderRadius: "6px",
              letterSpacing: "0.5px",
            }}
          >
            {course.code}
          </span>
          <span style={{ fontSize: "13px", color: "#64748b" }}>• {course.credit} หน่วยกิต</span>
        </div>

        <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "600" }}>
          <Link
            href={`/courses/${course.id}`}
            style={{
              color: "#0f172a",
              textDecoration: "none",
            }}
          >
            {course.name}
          </Link>
        </h2>
        {course.instructor && (
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>ผู้สอน: {course.instructor}</p>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={onEdit}
          style={{
            padding: "8px 14px",
            borderRadius: "7px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            color: "#334155",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          style={{
            padding: "8px 14px",
            borderRadius: "7px",
            border: "1px solid #fee2e2",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}