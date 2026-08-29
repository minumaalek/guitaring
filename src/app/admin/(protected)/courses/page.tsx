import { getAllCourses } from "@/db/queries/courses";
import PanelItemsList from "@/components/modules/panel-items-list";
import { deleteCourse } from "@/actions/course-actions";
import { publishCourse } from "@/actions/course-actions";
export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div>
      <PanelItemsList
        title="Courses"
        items={courses}
        deleteIt={deleteCourse}
        publishIt={publishCourse}
      />
    </div>
  );
}
