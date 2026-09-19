"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoriesList({
  productsCategories,
  coursesCategories,
  closeHandler,
}) {
  return (
    <div className="flex flex-col items-start justify-start pl-2 pt-10 gap-3 w-full h-full categories-list">
      <div className="flex flex-col categories-list">
        <p>Products</p>
        <ul className="flex flex-col gap-1">
          {productsCategories.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  href={`/products/${category.slug}`}
                  onClick={closeHandler}
                >
                  <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
                    <span>{category.name}</span>
                    <ChevronRight />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col categories-list">
        <p>Courses</p>
        <ul className="flex flex-col gap-1">
          {coursesCategories.map((category) => {
            return (
              <li key={category.id}>
                <Link href={`/courses/${category.slug}`} onClick={closeHandler}>
                  <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
                    <span>{category.name}</span>
                    <ChevronRight />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-full h-full mt-5 ">
        <Link href={`/blog`} onClick={closeHandler} className="w-full">
          <div className="flex items-center justify-between w-full bg-blue-400/20  p-1 rounded-md">
            <p>Blog</p>
            <ChevronRight />
          </div>
        </Link>
        <Link href={`/about`} onClick={closeHandler} className="w-full">
          <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
            <p>About</p>
            <ChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
}
