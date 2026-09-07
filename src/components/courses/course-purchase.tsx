"use client";

import { useTransition, useState } from "react";
import {
  addCourseToCheckout,
  removeCourseFromCheckout,
} from "@/actions/course-actions";

export default function CoursePurchase({ courseId, enrollmentStatus }) {
  const [status, setStatus] = useState(enrollmentStatus);
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      await addCourseToCheckout(courseId);
      setStatus("PENDING");
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await removeCourseFromCheckout(courseId);
      setStatus(null);
    });
  }

  if (status === "COMPLETED") {
    return <button disabled>Purchased</button>;
  }

  if (status === "PENDING") {
    return (
      <button onClick={handleRemove} disabled={isPending}>
        {isPending ? "Removing..." : "Remove"}
      </button>
    );
  }

  return (
    <button onClick={handleAdd} disabled={isPending}>
      {isPending ? "Adding..." : "Enroll"}
    </button>
  );
}
