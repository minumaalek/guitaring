interface props {
  slug: string;
  text: string;
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function MoreButton({ slug, text }: props) {
  return (
    <Link href={`/${slug}`}>
      <button className="main-gradient flex items-center gap-2 group">
        <p className="whitespace-nowrap cursor-pointer">{text}</p>
        <ArrowRight className="size-5 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
      </button>
    </Link>
  );
}
