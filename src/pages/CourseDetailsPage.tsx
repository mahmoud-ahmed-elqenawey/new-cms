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

  const fetchCourseDetails = useCustomPost(
    `tajweed/dashboard/finish_course/${id}/`
  );

  if (courseDetails.isPending) {
    return <Loading />;
  }

  if (!courseDetails) {
    return null;
  }

  return (
    <CourseDetails
      details={courseDetails.data.data}
      onBack={() => navigate("/courses")}
      onCourseFinished={fetchCourseDetails.mutate}
    />
  );
}
