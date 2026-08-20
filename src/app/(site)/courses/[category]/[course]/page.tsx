import { addCourseToCheckout } from "@/actions/course-actions";
import { getCourseBySlug } from "@/db/queries/courses";
export default async function CoursePage({ params }) {
  const { course } = await params;
  const courseItem = await getCourseBySlug(course);
  return (
    <div>
      <h2>{course}</h2>
      <form action={addCourseToCheckout.bind(null, courseItem.id)}>
        <button className="bg-blue-700 size-8" type="submit">
          Enroll
        </button>
      </form>
    </div>
  );
}
