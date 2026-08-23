import { createComment } from "@/actions/comment-actions";

interface CommentSectionProps {
  targetType: "ARTICLE" | "PRODUCT" | "COURSE";
  targetId: number;
}

export default function CommentSection({
  targetType,
  targetId,
}: CommentSectionProps) {
  const action = createComment.bind(null, targetType, targetId);

  return (
    <form action={action}>
      <textarea
        name="content"
        placeholder="Write your comment..."
        className="w-full rounded-xl border p-3"
      />

      <button
        type="submit"
        className="mt-2 w-20 rounded-full bg-blue-500 px-4 py-2 text-white"
      >
        Send
      </button>
    </form>
  );
}
