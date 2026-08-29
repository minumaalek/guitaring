"use client";

import { useActionState, useEffect, useState } from "react";
import { X, Check } from "lucide-react";

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

export default function PublishButton({ published, action }) {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(action, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button type="button">
          {published ? (
            <X className="stroke-red-600" />
          ) : (
            <Check className="stroke-green-600" />
          )}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {published ? "Unpublish course?" : "Publish course?"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {published
              ? "Are you sure you want to unpublish this course?"
              : "Are you sure you want to publish this course?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <form action={formAction}>
              <button type="submit" disabled={pending}>
                {pending ? "Updating..." : published ? "Unpublish" : "Publish"}
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
