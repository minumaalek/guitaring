"use client";

import { useTransition, useState } from "react";
import {
  addCourseToCart,
  removeCourseFromCart,
} from "@/actions/course-actions";
import { toast } from "sonner";

export default function CourseEnrollment({ courseId, enrollmentStatus }) {
  const [isInCart, setIsInCart] = useState(enrollmentStatus);
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      const result = await addCourseToCart(courseId);

      if (result.success) {
        setIsInCart(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await removeCourseFromCart(courseId);

      if (result.success) {
        setIsInCart(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  // if (status === "COMPLETED") {
  //   return <button disabled>Purchased</button>;
  // }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={isInCart ? handleRemove : handleAdd}
      className="bg-blue-300 w-full cursor-pointer px-4 py-2 flex gap-1 items-center justify-center main-gradient"
    >
      {isPending
        ? isInCart
          ? "Removing..."
          : "Adding..."
        : isInCart
          ? "Enroll"
          : "Cancel"}
    </button>
  );
}
