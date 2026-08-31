interface CoursesCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
import { getCoursesByCategory } from "@/db/queries/courses";
import { getSubCategories } from "@/db/queries/categories";
import CourseCard from "@/components/courses/course-card";
import ItemsList from "@/components/modules/items-list";

export default async function CoursesCategoryPage({
  params,
}: CoursesCategoryPageProps) {
  const { category } = await params;
  const courses = await getCoursesByCategory(category);
  const subCategories = await getSubCategories(category);
  return (
    <div>
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
    </div>
  );
}
