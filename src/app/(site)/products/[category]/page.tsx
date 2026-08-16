interface ProductsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
export default async function ProductsCategoryPage({
  params,
}: ProductsCategoryPageProps) {
  const { category } = await params;
  console.log(category);
  return <div>{category} products</div>;
}
