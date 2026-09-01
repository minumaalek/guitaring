import CoursePage from "@/components/courses/course-page";
import ItemsList from "@/components/modules/items-list";
import { getCourseBySlug } from "@/db/queries/courses";
import { getCoursesByCategory } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";

export default async function CourseCategoryPage({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const courses = await getCoursesByCategory(slug);
  if (course) return <CoursePage slug={slug} />;
  return (
    <div>
      <ItemsList empty={!courses.length && true} subCategories={[]}>
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
