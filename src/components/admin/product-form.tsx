"use client";

import { useState } from "react";

import Input from "../common/input";
import MarkdownEditor from "./mark-down-editor";
import { createProduct } from "@/actions/product-actions";

interface ProductFormProps {
  categories: {
    id: number;
    name: string;
  }[];
}

export default function ProductForm({ categories }: ProductFormProps) {
  const [content, setContent] = useState("");

  return (
    <div>
      <form action={createProduct}>
        <Input name="title" placeholder="Title" required />

        <Input name="description" placeholder="Description" required />

        <Input name="slug" placeholder="Slug" required />

        <Input
          name="originalPrice"
          placeholder="Original Price"
          type="number"
          required
        />

        <Input name="newPrice" placeholder="New Price" type="number" required />

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

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
