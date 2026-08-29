"use client";

import { useState } from "react";

import Input from "../common/input";
import MarkdownEditor from "../admin/mark-down-editor";
import { createCourse } from "@/actions/course-actions";

interface NewCourseFormProps {
  course: object;
  categories: {
    id: number;
    name: string;
  }[];
}

export default function CourseForm({
  categories,
  action,
  course,
}: NewCourseFormProps) {
  const [content, setContent] = useState(course?.content ?? "");
  return (
    <div>
      <form action={action}>
        <Input
          name="title"
          placeholder="Title"
          required
          defaultValue={course?.title ?? ""}
        />
        <Input
          name="description"
          placeholder="Description"
          required
          defaultValue={course?.description ?? ""}
        />
        <Input
          name="slug"
          placeholder="Slug"
          required
          defaultValue={course?.slug ?? ""}
        />
        <Input
          name="originalPrice"
          placeholder="Original Price"
          type="number"
          required
          defaultValue={course?.originalPrice ?? ""}
        />
        <Input
          name="newPrice"
          placeholder="New Price"
          type="number"
          required
          defaultValue={course?.newPrice ?? ""}
        />
        <select
          name="categoryId"
          required
          className="rounded-md border p-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select a category
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <MarkdownEditor value={content} onChange={setContent} />
        <button className="main-gradient" type="submit">
          {course ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
}
