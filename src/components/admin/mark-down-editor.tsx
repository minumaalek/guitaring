"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertMarkdown(before: string, after = "") {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.slice(start, end);

    const newText =
      value.slice(0, start) + before + selectedText + after + value.slice(end);

    onChange(newText);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursorPosition =
        start + before.length + selectedText.length + after.length;

      textarea.setSelectionRange(cursorPosition, cursorPosition);
    });
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white text-black">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 bg-gray-500">
        <button type="button" onClick={() => insertMarkdown("# ", "")}>
          H1
        </button>

        <button type="button" onClick={() => insertMarkdown("## ", "")}>
          H2
        </button>

        <button type="button" onClick={() => insertMarkdown("### ", "")}>
          H3
        </button>

        <button type="button" onClick={() => insertMarkdown("**", "**")}>
          B
        </button>

        <button type="button" onClick={() => insertMarkdown("*", "*")}>
          I
        </button>

        <button type="button" onClick={() => insertMarkdown("> ", "")}>
          Quote
        </button>

        <button type="button" onClick={() => insertMarkdown("- ", "")}>
          List
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("[", "](https://example.com)")}
        >
          Link
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("![alt text](", ")")}
        >
          Image
        </button>

        <button type="button" onClick={() => insertMarkdown("`", "`")}>
          Code
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-2">
        <textarea
          ref={textareaRef}
          name="content"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your article in Markdown..."
          className="min-h-96 resize-none p-4 outline-none"
        />

        <div className="min-h-96 border-l p-4 prose">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
