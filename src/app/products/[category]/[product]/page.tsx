interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  return <div>{product}</div>;
}
