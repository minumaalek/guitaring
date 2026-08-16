import { Heading } from "@/lib/blog";
import { Music3 } from "lucide-react";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <aside className="sticky top-24  shadow-lg rounded-2xl p-10">
      <h2 className=" font-semibold mb-4">Table of Contents</h2>

      <nav>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <div key={heading.id} className="flex items-center">
              <Music3 className="size-4 stroke-blue-500" />
              <li className={`${heading.level === 3 ? "ml-4" : ""} text-lg`}>
                <a
                  href={`#${heading.id}`}
                  className=" text-gray-600 hover:text-black transition"
                >
                  {heading.text}
                </a>
              </li>
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
