import { db } from "..";
export async function getAllTeachers() {
  return db.user.findMany({
    where: {
      isTeacher: true,
    },
  });
}

export async function getTeacherById(teacherId) {
  const teachers = await getAllTeachers();
  return teachers.find((teacher) => teacherId == teacher.id);
}
