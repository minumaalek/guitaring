import { getAllProducts } from "@/db/queries/products";
import { getAllCourses } from "@/db/queries/courses";
import { getAllArticles } from "@/db/queries/articles";
import ProductsSection from "../products/products-section";
import CoursesSection from "../courses/courses-section";
import ArticlesSection from "../blog/articles-section";
export default async function HomeSections() {
  const products = await getAllProducts();
  const courses = await getAllCourses();
  const articles = await getAllArticles();
  return (
    <div className="px-1 flex flex-col gap-5">
      <ProductsSection products={products} title={"New products"} />
      <CoursesSection courses={courses} title={"New courses"} />
      <ArticlesSection articles={articles} title={"New articles"} />
    </div>
  );
}
