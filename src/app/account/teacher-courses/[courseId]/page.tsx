import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
import CourseForm from "@/components/account/course-form";
import { getCategoriesBySection } from "@/db/queries/categories";
import Input from "@/components/common/input";
import { editCourse } from "@/actions/course-actions";
import { getCourseById } from "@/db/queries/courses";

export default async function EditCoursePage({ params }) {
  const categories = await getCategoriesBySection("courses");
  const session = await getSession();
  if (!session?.user.isTeacher) return redirect("");
  const { courseId } = await params;
  const course = await getCourseById(+courseId);
  return (
    <>
      <h1>Edit {params.courseId}</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-10">
        <div>
          <CourseForm
            categories={categories}
            action={editCourse}
            course={course}
          />
        </div>
        <div className="border-2 border-blue-500 rounded-3xl p-3 flex flex-col gap-2">
          <h3>add videos</h3>
          <div className="flex flex-col bg-blue-300 rounded-2xl p-2">
            <Input placeholder="Title" />
            <input type="file" />
          </div>
          <button className="bg-blue-500 rounded-full text-3xl w-full">
            +
          </button>
        </div>
      </div>
    </>
  );
}
