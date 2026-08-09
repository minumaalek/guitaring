import ProductCard from "./card";
export default async function ProductsSection({ products }) {
  return (
    <div>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
