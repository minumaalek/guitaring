import { getAllProducts } from "@/db/queries/products";
export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div>
      <div>
        <h1>products</h1>
        <ul>
          {products.length
            ? products.map((product) => {
                return <li key={product.id}>{product.title}</li>;
              })
            : "no product yet"}
        </ul>
      </div>{" "}
    </div>
  );
}
