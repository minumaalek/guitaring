import { getAllCourses } from "@/db/queries/courses";
import CourseCard from "@/components/courses/course-card";
import { getSubCategories } from "@/db/queries/categories";
import ItemsContainer from "@/components/modules/items-container";
import CategoryCard from "@/components/categories/category-card";
import SplitH2 from "@/components/animated/split-h2";
export default async function CoursesPage() {
  const courses = await getAllCourses();
  const subCategories = await getSubCategories(null, "courses");
  console.log(subCategories);
  return (
    // <ItemsContainer
    //   empty={!courses.length && true}
    //   subCategories={subCategories}
    // >
    //   {courses.map((course, i) => {
    //     return <CourseCard key={i} course={course} />;
    //   })}
    // </ItemsContainer>
    <div className="p-20">
      <SplitH2 text={"All you need to start guitaring"} />
      {/* <ItemsContainer empty={!products.length && true} subCategories={subCategories}>
            {products.map((product) => {
              return <ProductPreviewCard product={product} />;
            })}
          </ItemsContainer> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:place-items-center">
        {subCategories.map((cate) => {
          return (
            <CategoryCard
              key={cate.id}
              title={cate.name}
              slug={`/courses/${cate.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
