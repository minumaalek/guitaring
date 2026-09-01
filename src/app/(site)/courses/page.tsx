import { getAllCourses } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";
import { getSubCategories } from "@/db/queries/categories";
import ItemsList from "@/components/modules/items-list";
export default async function CoursesPage() {
  const courses = await getAllCourses();
  const subCategories = await getSubCategories(null, "courses");
  console.log(subCategories);
  return (
    <ItemsList empty={!courses.length && true} subCategories={subCategories}>
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
    </ItemsList>
  );
}
