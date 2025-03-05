import StudentDetailsView from "@/components/Students/StudentDetailsView";

import { useNavigate } from "react-router";

export default function StudentDetailsPage() {
  // const { id } = useParams();
  const navigate = useNavigate();

  const student = {
    id: "1",
    name: "عبدالله محمد العتيبي",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    gender: "ذكر",
    education_level: "جامعي",
    mobile_number: "0501234567",
    age: 22,
    date_of_birth: "2002-03-15",
    notes:
      "طالب متميز وملتزم بالحضور. يحتاج إلى مزيد من التركيز في مخارج الحروف.",
    created_at: "2023-12-01",
  };

  const courses = [
    {
      id: "1",
      name: "دورة التجويد المستوى الأول",
      start_date: "2024-01-15",
      instructor: "د. أحمد السعيد",
      payments: [
        {
          id: "1",
          amount: 500,
          date: "2024-01-10",
          status: "paid",
        },
        {
          id: "2",
          amount: 500,
          date: "2024-02-10",
          status: "paid",
        },
        {
          id: "3",
          amount: 500,
          date: "2024-03-10",
          status: "pending",
        },
      ],
    },
    {
      id: "2",
      name: "دورة تحسين التلاوة",
      start_date: "2024-02-01",
      instructor: "د. محمد العمري",
      payments: [
        {
          id: "4",
          amount: 750,
          date: "2024-02-01",
          status: "paid",
        },
        {
          id: "5",
          amount: 750,
          date: "2024-03-01",
          status: "overdue",
        },
      ],
    },
  ];

  // if (isLoading) {
  //   return <div className="text-center py-8">جاري التحميل...</div>;
  // }

  if (!student) {
    return null;
  }

  return (
    <StudentDetailsView
      student={student}
      courses={courses}
      onBack={() => navigate("/students")}
    />
  );
}
