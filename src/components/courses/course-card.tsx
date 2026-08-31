import { Star } from "lucide-react";
import Link from "next/link";

export default function CourseCard({
  title,
  description,
  teacher,
  category,
  slug,
}) {
  return (
    <Link href={`/courses/${category}/${slug}`}>
      <div className="size-72 border-2 border-blue-400 rounded-2xl p-1 flex flex-col text-black">
        <div className="rounded-t-2xl bg-blue-500 w-full h-1/2"></div>
        <div className="flex flex-col justify-between gap-1">
          <div>
            <h3>{title}</h3>
            <span>{description}</span>
          </div>
          <div className="flex items-center justify-between">
            <i>{teacher}</i>
            <div className="flex items-center justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="relative size-6">
                  <Star className="absolute inset-0 fill-gray-300 stroke-none" />

                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      width: index < 3 ? "100%" : index === 3 ? "50%" : "0%",
                    }}
                  >
                    <Star className=" fill-blue-400 stroke-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
