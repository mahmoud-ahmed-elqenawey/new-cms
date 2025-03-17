import Loading from "@/components/core/Loading";
import CourseDetails from "@/components/Courses/CourseDetails";
import { useCustomPost } from "@/hooks/useMutation";
import { useCustomQuery } from "@/hooks/useQuery";
import { useParams, useNavigate } from "react-router";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const courseDetails = useCustomQuery(
    ["tajweed/dashboard/course/", id],
    `tajweed/dashboard/course/${id}`
  );

  const finishCourse = useCustomPost(`tajweed/dashboard/finish_course/${id}/`, [
    "tajweed/dashboard/course/",
  ]);

  if (courseDetails.isPending) {
    return <Loading type="spinner" />;
  }

  if (!courseDetails) {
    return null;
  }

  return (
    <CourseDetails
      id={id}
      details={courseDetails.data.data}
      onBack={() => navigate("/courses")}
      onCourseFinished={finishCourse.mutate}
    />
  );
}
