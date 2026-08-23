import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
import NewCourseForm from "@/components/account/new-course-form";
import { getCourseCategories } from "@/db/queries/category";

export default async function NewCoursePage() {
  const categories = await getCourseCategories();
  const session = await getSession();
  if (!session?.user.isTeacher) return redirect("");
  return (
    <div>
      <h1>new course</h1>
      <NewCourseForm categories={categories} />
    </div>
  );
}
