import { createComment } from "@/actions/comment-actions";
import Input from "../common/input";

interface CommentSectionProps {
  targetType: "ARTICLE" | "PRODUCT" | "COURSE";
  targetId: number;
}

export default function CommentForm({
  targetType,
  targetId,
}: CommentSectionProps) {
  const action = createComment.bind(null, targetType, targetId);

  return (
    <form action={action}>
      <div className="bg-white flex relative">
        <Input
          type="text"
          name="content"
          placeholder="Write your comment..."
          className="w-full rounded-xl border"
        />

        <button type="submit" className="absolute right-0">
          Send
        </button>
      </div>
    </form>
  );
}
