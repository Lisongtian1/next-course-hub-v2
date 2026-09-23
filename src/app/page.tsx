import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = { title: "รายวิชาทั้งหมด" };

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8 border-b pb-4">
          รายวิชาทั้งหมด
        </h1>
        <CourseExplorer initialCourses={courses} />
      </div>
    </main>
  );
}