import { getAllCourses } from "@/db/queries/courses";
export default async function CoursesPage() {
  const courses = await getAllCourses();
  return (
    <div>
      <h1>courses</h1>
      <ul>
        {courses.length
          ? courses.map((course) => {
              return <li key={course.id}>{course.title}</li>;
            })
          : "no course yet"}
      </ul>
    </div>
  );
}
