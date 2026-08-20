interface CoursesCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
export default async function CoursesCategoryPage({
  params,
}: CoursesCategoryPageProps) {
  const { category } = await params;
  return <div>{category} Courses</div>;
}
