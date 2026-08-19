interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  return (
    <div>
      <h2>{product}</h2>
      <button className="bg-blue-400 w-18 h-10 rounded-2xl">buy</button>
    </div>
  );
}
