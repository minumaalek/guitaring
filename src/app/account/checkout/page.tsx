import { auth } from "@/auth";
import { getPendingProducts } from "@/db/queries/products";
import { getPendingCourses } from "@/db/queries/courses";
export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const [products, courses] = await Promise.all([
    getPendingProducts(userId),
    getPendingCourses(userId),
  ]);
  console.log(products, courses);
  return (
    <div>
      <section>
        <h2>Products</h2>

        {products.length === 0 ? (
          <p>No products in checkout.</p>
        ) : (
          products.map((item) => (
            <div key={item.id}>
              <h3>{item.product.title}</h3>
              <p>{item.product.newPrice}</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Courses</h2>

        {courses.length === 0 ? (
          <p>No courses in checkout.</p>
        ) : (
          courses.map((item) => (
            <div key={item.id}>
              <h3>{item.course.title}</h3>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
