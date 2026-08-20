import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function NavbarDropdown({ category, title }) {
  return (
    <div className="relative group">
      <Link href={title.toLowerCase()}>{title}</Link>
      <ul className="absolute bg-white invisible group-hover:visible rounded-sm w-20 flex flex-col gap-1">
        {category.map((cate) => {
          return (
            <li
              key={cate.id}
              className="p-1 rounded-sm bg-gray-100 hover:bg-gray-200 overflow-hidden cursor-pointer"
            >
              <Link href={`/${title.toLowerCase()}/${cate.slug}`}>
                {cate.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
