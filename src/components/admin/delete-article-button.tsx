"use client";

import { ReactNode } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActionFormProps {
  action: (formData: FormData) => void | Promise<void>;
  children?: ReactNode;
}

export default function DeleteArticleButton({ action }: ActionFormProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">
          <Trash className="stroke-black" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete article?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this article?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <form action={action}>
              <button type="submit">Delete</button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
