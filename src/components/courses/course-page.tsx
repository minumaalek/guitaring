import { addCourseToCheckout } from "@/actions/course-actions";
import { getCourseBySlug } from "@/db/queries/courses";

export default async function CoursePage({ slug }) {
  const courseItem = await getCourseBySlug(slug);
  return (
    <div>
      <h2>{slug}</h2>
      <form action={addCourseToCheckout.bind(null, courseItem.id)}>
        <button className="bg-blue-700 size-8" type="submit">
          Enroll
        </button>
      </form>
    </div>
  );
}
