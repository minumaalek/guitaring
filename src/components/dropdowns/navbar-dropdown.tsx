import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function NavbarDropdown({ category, title }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-white outline-0">
        {title}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="rounded-lg border bg-white p-2 shadow-lg z-50">
          {category.map((item) => {
            return (
              <DropdownMenu.Item
                key={item.id}
                className="p-2 rounded-md outline-0 hover:bg-gray-200 cursor-pointer"
              >
                {item.name}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
