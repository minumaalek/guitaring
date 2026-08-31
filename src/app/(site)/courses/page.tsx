import { getAllCourses } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";
export default async function CoursesPage() {
  const courses = await getAllCourses();
  return (
    <div className="grid grid-cols-4 p-10 place-content-center place-items-center w-full h-full">
      {courses.map((course, i) => {
        return (
          <CourseCard
            key={i}
            title={course.title}
            description={course.description}
            teacher={`${course.teacher.firstName} ${course.teacher.lastName}`}
            category={course.category.slug}
            slug={course.slug}
          />
        );
      })}
    </div>
  );
}
