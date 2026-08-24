import { getAllTeachers } from "@/db/queries/teachers";
export default async function TeachersPage() {
  const teachers = await getAllTeachers();
  return (
    <div>
      <h1>teachers</h1>
      <ul>
        {teachers.length
          ? teachers.map((teacher) => {
              return <li key={teacher.id}>{teacher.email}</li>;
            })
          : "no teacher yet"}
      </ul>
    </div>
  );
}
