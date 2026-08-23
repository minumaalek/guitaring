import { db } from "..";
export async function getAllStudents() {
  return db.user.findMany({
    where: {
      enrollments: {
        some: {},
      },
    },
  });
}
