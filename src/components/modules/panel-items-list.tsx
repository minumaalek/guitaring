"use client";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import DeleteButton from "../icon-buttons/delete-button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import PublishButton from "../icon-buttons/publish-button";

export default function PanelItemsList({ title, items, deleteIt, publishIt }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between w-full">
        <h2>{title} list</h2>
        {usePathname().split("/")[2] != "courses" && (
          <Link href={`${title.toLowerCase()}/new`}>
            <button className="main-gradient w-24 flex items-center justify-center ">
              <Plus className="size-5" />
              new
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-4 place-items-center main-gradient rounded-sm w-full">
        <p className="place-self-start">Title</p>
        <p>Created at</p>
        <p>Creator</p>
        <p>actions</p>
      </div>
      {items.length ? (
        <ul>
          {items.map((item) => {
            const deleteAction = deleteIt ? deleteIt.bind(null, item.id) : null;

            return (
              <li key={item.id}>
                <div
                  className={`grid grid-cols-4 place-items-center ${title == "Courses" && !item.published ? "bg-red-100" : "bg-gray-100"} p-1 mt-2 rounded-sm`}
                >
                  <p className="place-self-start">{item.title}</p>
                  <p>{item.createdAt && item.createdAt.toLocaleDateString()}</p>
                  <p>
                    {item.teacher
                      ? item.teacher?.firstName + " " + item.teacher?.lastName
                      : item.admin?.username || "unknown"}
                  </p>

                  <div className="flex gap-3">
                    <Link href={`${title.toLowerCase()}/${item.id}`}>
                      <Edit className="stroke-black" />
                    </Link>

                    <DeleteButton action={deleteAction} />
                    {title == "Courses" && (
                      <PublishButton
                        published={item.published}
                        action={publishIt.bind(null, !item.published, item.id)}
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No {title} yet</p>
      )}
    </div>
  );
}
