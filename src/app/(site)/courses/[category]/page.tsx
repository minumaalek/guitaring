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
  const subCategories = await getSubCategories(category, null);
  return (
    <div>
      <ItemsList empty={!courses.length && true} subCategories={subCategories}>
        {courses.map((course, i) => {
          return <CourseCard key={i} course={course} />;
        })}
      </ItemsList>
    </div>
  );
}
