import Link from "next/link";
export default function ArticleCard({ article }) {
  const { title, slug } = article;
  return (
    <div className="flex flex-col border shadow-2xl size-80 p-2">
      <div className="bg-blue-300 h-1/2"></div>
      <h3>{title}</h3>
      <Link className="bg-blue-500 rounded-xl" href={`blog/${slug}`}>
        Read
      </Link>
    </div>
  );
}
