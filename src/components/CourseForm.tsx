"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) return emptyDraft;
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};
  if (value.code.trim() === "") nextErrors.code = "กรุณาระบุรหัสวิชา";
  if (value.name.trim() === "") nextErrors.name = "กรุณาระบุชื่อวิชา";
  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }
  return nextErrors;
}

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#ef4444" : "#e2e8f0"}`,
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box" as const,
    marginTop: "6px",
    transition: "border-color 0.2s",
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px 28px",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid #edf2f7",
        marginBottom: "32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <div style={{ width: "4px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
          {initialCourse ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มรายวิชาใหม่"}
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label htmlFor="code" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
            รหัสวิชา *
          </label>
          <input
            id="code"
            name="code"
            type="text"
            value={draft.code}
            onChange={handleChange}
            placeholder="เช่น CS101"
            style={inputStyle(!!errors.code)}
            aria-invalid={!!errors.code}
            aria-describedby={errors.code ? "code-error" : undefined}
          />
          {errors.code && <p id="code-error" style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", margin: 0 }}>{errors.code}</p>}
        </div>

        <div>
          <label htmlFor="name" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
            ชื่อรายวิชา *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            placeholder="เช่น Introduction to Computer Science"
            style={inputStyle(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", margin: 0 }}>{errors.name}</p>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "24px" }}>
        <div>
          <label htmlFor="credit" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
            หน่วยกิต *
          </label>
          <input
            id="credit"
            name="credit"
            type="number"
            inputMode="numeric"
            min="1"
            max="6"
            value={draft.credit}
            onChange={handleChange}
            placeholder="1 - 6"
            style={inputStyle(!!errors.credit)}
            aria-invalid={!!errors.credit}
            aria-describedby={errors.credit ? "credit-error" : undefined}
          />
          {errors.credit && <p id="credit-error" style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", margin: 0 }}>{errors.credit}</p>}
        </div>

        <div>
          <label htmlFor="instructor" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
            อาจารย์ผู้สอน
          </label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            value={draft.instructor}
            onChange={handleChange}
            placeholder="ชื่อ-นามสกุล ผู้สอน"
            style={inputStyle(!!errors.instructor)}
            aria-invalid={!!errors.instructor}
            aria-describedby={errors.instructor ? "instructor-error" : undefined}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "10px 22px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
          }}
        >
          {initialCourse ? "บันทึกการแก้ไข" : "+ บันทึกรายวิชา"}
        </button>

        {initialCourse && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "#f1f5f9",
              color: "#475569",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}