import { getCommentsByTarget } from "@/db/queries/comments";
export default async function CommentsList({ targetType, targetId }) {
  const comments = await getCommentsByTarget(targetType, targetId);
  return (
    <div className="">
      <ul className="flex flex-col gap-3">
        {comments.map((comment) => {
          return (
            <li key={comment.id} className="">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <div className="rounded-full size-8 bg-blue-600"></div>
                  <i>{comment.user.firstName + " " + comment.user.lastName}</i>
                </div>
                <p>{comment.content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
