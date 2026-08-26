import { getAllProducts } from "@/db/queries/products";
import PanelItemsList from "@/components/modules/panel-items-list";
import { deleteProduct } from "@/actions/product-actions";
export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div>
      <div>
        <PanelItemsList
          title={"Products"}
          items={products}
          deleteIt={deleteProduct}
        />
      </div>
    </div>
  );
}
