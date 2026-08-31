import Link from "next/link";

export default function NavbarDropdown({ category, title }) {
  return (
    <div className="relative group">
      <Link href={`/${title.toLowerCase()}`}>{title}</Link>
      <ul className="absolute bg-white invisible group-hover:visible rounded-sm w-24 flex flex-col gap-1">
        {category.map((cate) => {
          return (
            <li
              key={cate.id}
              className="p-1 rounded-sm  hover:bg-blue-100 overflow-hidden cursor-pointer text-black"
            >
              <Link href={`/${title.toLowerCase()}/${cate.slug}`}>
                <p className="text-black">{cate.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
