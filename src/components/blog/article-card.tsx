import Link from "next/link";
import Image from "next/image";
export default function ArticleCard({ article }) {
  const { title, slug, createdAt, coverImage } = article;
  return (
    <Link href={`blog/${slug}`}>
      <div className="card w-80 h-36">
        <Image
          alt="guitar"
          src={coverImage ? coverImage : "/images/hero.webp"}
          fill
          className="object-cover"
        />
        <div className="w-full h-full absolute bg-blue-300/50 hover:bg-blue-300/20 top-0 right-0 flex items-center justify-center p-10 group">
          <h3>{title}</h3>
          {/* <p>{createdAt.toLocaleDateString()}</p> */}
          {/* <Link className="bg-blue-500 rounded-xl" href={`blog/${slug}`}>
          Read
        </Link> */}
        </div>
      </div>
    </Link>
  );
}
