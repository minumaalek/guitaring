import { getCommentsByTarget } from "@/db/queries/comments";
export default async function CommentsList({ targetType, targetId }) {
  const comments = await getCommentsByTarget(targetType, targetId);
  console.log(comments);
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {comments.map((comment) => {
          return (
            <li key={comment.id} className="bg-white">
              <p>{comment.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
