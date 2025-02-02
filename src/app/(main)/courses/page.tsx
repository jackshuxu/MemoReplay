import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./_components/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memo Friends | Characters",
  description:
    "Check out the full cast of characters from the MemoLane series.",
};

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Memo Friends</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
