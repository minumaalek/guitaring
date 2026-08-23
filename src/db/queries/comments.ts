import { db } from "..";
export async function getCommentsByTarget(targetType, targetId) {
  return db.comment.findMany({
    where: {
      targetType,
      targetId,
    },
  });
}
