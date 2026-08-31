interface CoursesCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
import { getCoursesByCategory } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";
export default async function CoursesCategoryPage({
  params,
}: CoursesCategoryPageProps) {
  const { category } = await params;
  const courses = await getCoursesByCategory(category);
  return (
    <div>
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
