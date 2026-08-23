import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
import NewCourseForm from "@/components/account/new-course-form";
import { getCourseCategories } from "@/db/queries/category";
import Input from "@/components/common/input";

export default async function NewCoursePage() {
  const categories = await getCourseCategories();
  const session = await getSession();
  if (!session?.user.isTeacher) return redirect("");
  return (
    <>
      <h1>new course</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-10">
        <div>
          <NewCourseForm categories={categories} />
        </div>
        <div className="border-2 border-blue-500 rounded-3xl p-3 flex flex-col gap-2">
          <h3>add videos</h3>
          <div className="flex flex-col bg-blue-300 rounded-2xl p-2">
            <Input placeholder="Title" />
            <input type="file" />
          </div>
          <button className="bg-blue-500 rounded-full text-3xl w-full">
            +
          </button>
        </div>
      </div>
    </>
  );
}
