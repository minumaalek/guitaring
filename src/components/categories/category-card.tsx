interface props {
  slug: string;
  text: string;
}
import Link from "next/link";
export default function CategoryCard({ title, slug }) {
  return (
    <Link href={slug}>
      <div className="flex flex-col-center md:size-60 text-black">
        <div className="rounded-full size-32 md:size-52 bg-blue-200/50"></div>
        <h3 className="text-base">{title}</h3>
      </div>
    </Link>
  );
}
