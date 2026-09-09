interface CoursesCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
import { getCoursesByCategory } from "@/db/queries/courses";
import { getSubCategories } from "@/db/queries/categories";
import CourseCard from "@/components/courses/course-card";
import ItemsContainer from "@/components/modules/items-container";

export default async function CoursesCategoryPage({
  params,
}: CoursesCategoryPageProps) {
  const { category } = await params;
  const courses = await getCoursesByCategory(category);
  const subCategories = await getSubCategories(category, null);
  return (
    <div>
      <ItemsContainer
        empty={!courses.length && true}
        subCategories={subCategories}
      >
        {courses.map((course, i) => {
          return <CourseCard key={i} course={course} />;
        })}
      </ItemsContainer>
    </div>
  );
}
