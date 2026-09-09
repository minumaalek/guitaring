import { getAllCourses } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";
import { getSubCategories } from "@/db/queries/categories";
import ItemsContainer from "@/components/modules/items-container";
export default async function CoursesPage() {
  const courses = await getAllCourses();
  const subCategories = await getSubCategories(null, "courses");
  console.log(subCategories);
  return (
    <ItemsContainer
      empty={!courses.length && true}
      subCategories={subCategories}
    >
      {courses.map((course, i) => {
        return <CourseCard key={i} course={course} />;
      })}
    </ItemsContainer>
  );
}
