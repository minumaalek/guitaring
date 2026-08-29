interface EditCourseProps {
  params: Promise<{
    courseId: string;
  }>;
}
import { getCourseById } from "@/db/queries/courses";
import { getCategoriesBySection } from "@/db/queries/categories";
import { editCourse } from "@/actions/course-actions";
import CourseForm from "@/components/account/course-form";

export default async function EditCourse({ params }: EditCourseProps) {
  const { courseId } = await params;
  const course = await getCourseById(+courseId);
  const categories = await getCategoriesBySection("courses");
  return (
    <div>
      <h1>edit {course.title}</h1>
      <CourseForm categories={categories} action={editCourse} />
    </div>
  );
}
