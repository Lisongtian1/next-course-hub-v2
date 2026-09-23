"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };
    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText)
  );

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <input
          id="keyword"
          placeholder="ค้นหารายวิชาด้วยชื่อ หรือรหัสวิชา..."
          value={keyword}
          onChange={handleKeywordChange}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1.5px solid #e2e8f0",
            backgroundColor: "#ffffff",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          }}
        />
      </div>

      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div>
        {visibleCourses.length === 0 ? (
          <div
            style={{
              padding: "48px 0",
              textAlign: "center",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px dashed #cbd5e1",
              color: "#94a3b8",
            }}
          >
            ไม่พบรายวิชาที่ตรงกับคำค้น
          </div>
        ) : (
          visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}