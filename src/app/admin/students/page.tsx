import { getAllStudents } from "@/db/queries/students";
export default async function StudentsPage() {
  const students = await getAllStudents();
  return (
    <div>
      <h1>students</h1>
      <ul>
        {students.length
          ? students.map((student) => {
              return <li key={student.id}>{student.email}</li>;
            })
          : "no student yet"}
      </ul>
    </div>
  );
}
