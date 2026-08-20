import { getUserProducts } from "@/db/queries/products";
import { getSession } from "@/lib/check-auth";
export default async function PurchasesPage() {
  const session = await getSession();
  const purchases = await getUserProducts(session?.user.id);
  console.log(purchases);
  return (
    <div>
      <h2>Purchases</h2>
      {purchases.map((purchase) => {
        return <h3>{purchase.title}</h3>;
      })}
    </div>
  );
}
