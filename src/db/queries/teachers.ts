import { db } from "..";
export async function getAllTeachers() {
  return db.user.findMany({
    where: {
      isTeacher: true,
    },
  });
}
