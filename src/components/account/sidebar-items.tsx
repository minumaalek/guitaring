"use client";

export default function SidebarItems() {
  return (
    <div className="h-full w-1/4 main-gradient rounded-none shadow-2xl flex items-center justify-center flex-col">
      <div className="flex flex-col items-start w-full p-10 gap-2">
        {optionsMap.map((option) => {
          const isSelected = selectedKey == option.key;

          return (
            <Link
              href={`/admin/${option.href}`}
              key={option.key}
              onClick={() => setSelectedKey(option.key)}
            >
              <div
                className={` ${isSelected ? "bg-blue-500" : "bg-blue-500/50"} p-1 w-60 rounded-md text-xl`}
              >
                {option.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
