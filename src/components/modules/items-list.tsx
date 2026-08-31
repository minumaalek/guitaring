import Link from "next/link";

export default function ItemsList({ empty, children, subCategories }) {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="w-1/3 p-1 border-2 border-blue-500 rounded-full">
        {subCategories.length
          ? subCategories.map((sub) => {
              return (
                <Link href={""} key={sub.id}>
                  <button className="main-gradient">{sub.name}</button>
                </Link>
              );
            })
          : null}
      </div>

      <div className="w-full h-full flex-col-center">
        {!empty ? (
          <div className="grid grid-cols-4 place-items-center">{children}</div>
        ) : (
          <p>Nothing yet</p>
        )}
      </div>
    </div>
  );
}
