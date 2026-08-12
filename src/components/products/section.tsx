import ProductCard from "./card";
import ProductSlider from "../sliders/section-slider";

export default async function ProductsSection({ products }) {
  return (
    <div className="border-2 border-blue-500 shadow-md rounded-2xl p-3">
      <ProductSlider>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </div>
  );
}
