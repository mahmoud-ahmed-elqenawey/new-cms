import DataTable from "@/components/core/DataTable";
import Loading from "@/components/core/Loading";
import PageHeader from "@/components/core/PageHeader";
import Pagination from "@/components/core/Pagination";
import TableFilters from "@/components/Courses/TableFilter";
import { useCustomQuery } from "@/hooks/useQuery";
import { formatDate } from "@/services/date";
import { Course } from "@/types/course";
import projectApiPathes from "@/utils/projectPathes";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CoursesPage = () => {
  const filterDefaults = JSON.parse(localStorage.getItem("filterData") || "{}");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(
    filterDefaults.showFilters || false
  );
  const [search, setSearch] = useState(filterDefaults.search || "");
  const [startDate, setStartDate] = useState(filterDefaults.startDate || "");
  const [endDate, setEndDate] = useState(filterDefaults.endDate || "");
  const [courseTypeId, setCourseTypeId] = useState<any>(
    filterDefaults.courseTypeId || ""
  );
  const [centerId, setCenterId] = useState<any>(filterDefaults.centerId || "");
  const [modeOfInstructionId, setModeOfInstructionId] = useState<any>(
    filterDefaults.modeOfInstructionId || ""
  );
  const [isFinished, setIsFinished] = useState<any>(
    filterDefaults.isFinished || false
  );
  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc" | null;
  }>({
    field: "",
    direction: null,
  });
  const navigate = useNavigate();

  const params = new URLSearchParams({
    ...(currentPage > 1 && { page: currentPage.toString() }),
    ...(sort?.field && { sort: `${sort.field}` }),
    ...(sort?.direction && { order: `${sort.direction}` }),
    ...(search && { search }),
    ...(startDate && { date: startDate }),
    ...(endDate && { end_date: endDate }),
    ...(courseTypeId && { type: courseTypeId }),
    ...(centerId && { center: centerId }),
    ...(modeOfInstructionId && { mode_of_instruction: modeOfInstructionId }),
    ...(isFinished && { is_finished: isFinished }),
  });

  const { data, isPending } = useCustomQuery(
    [`courses-${params}`],
    `/${projectApiPathes.courses}?${params.toString()}`
  );

  const centers = useCustomQuery([`centers`], `/${projectApiPathes.centers}`);
  const coursesType = useCustomQuery(
    [`coursesType`],
    `/${projectApiPathes.coursesType}`
  );
  const { refetch: downloadExcel, isLoading } = useCustomQuery(
    ["downloadExcel"],
    "tajweed/dashboard/courses/?data-type=excel",
    { responseType: "blob" },
    false
  );

  const columns = [
    { label: "اسم الدورة", field: "name" },
    { label: "المدرب", field: "instructor" },
    {
      label: "تاريخ البدء",
      field: "date",
      render: (course: Course) => formatDate(course.date),
    },
    {
      label: "تاريخ الانتهاء",
      field: "end_date",
      render: (course: Course) => formatDate(course.end_date),
    },
    {
      label: "وقت الانتهاء الفعلي",
      field: "finished_at",
      render: (course: Course) => formatDate(course.finished_at),
    },
    { label: "عدد الطلاب", field: "number_of_students" },
    { label: "عدد الحصص", field: "number_of_sessions" },
    {
      label: "نسبة الحضور",
      field: "attendance_percentage",
      render: (course: Course) => `${course.attendance_percentage}%`,
    },
    {
      label: "المبلغ المحصل",
      field: "payment",
      render: (course: Course) => `${course.payment} دينار`,
    },
    {
      label: "المبلغ المتوقع",
      field: "payment_goal",
      render: (course: Course) => `${course.payment_goal} دينار`,
    },
    {
      label: "نسبة التحصيل",
      field: "payment_percentage",
      render: (course: Course) => `${course.payment_percentage}%`,
    },
    {
      label: " المراكز",
      field: "center",
    },
    {
      label: "طريقة التدريس",
      field: "mode_of_instruction",
      render: (course: Course) =>
        `${course.mode_of_instruction === "face_to_face" ? "وجاهي" : "عن بعد"}`,
    },
  ];

  const handleSort = useCallback((field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const downloadCoursesExcelFile = () => {
    downloadExcel().then((res) => {
      if (res.status == "success") {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "courses.xlsx"); // Set the file name
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "filterData",
      JSON.stringify({
        save: true,
        showFilters,
        search,
        centerId,
        courseTypeId,
        startDate,
        endDate,
        modeOfInstructionId,
        isFinished,
      })
    );
  }, [
    showFilters,
    search,
    courseTypeId,
    centerId,
    startDate,
    endDate,
    modeOfInstructionId,
    isFinished,
  ]);

  useEffect(() => {
    localStorage.setItem("filterData", JSON.stringify({ save: false }));

    if (!filterDefaults.save) localStorage.removeItem("filterData");
  }, []);

  if (isPending || centers.isPending || coursesType.isPending) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title="صفحة الدورات"
        count={`إجمالي عدد الدورات: ${data?.count}`}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        buttonClick={downloadCoursesExcelFile}
        buttonLoading={isLoading}
      />

      <TableFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        courseType={coursesType.data.data}
        courseTypeId={courseTypeId}
        setCourseTypeId={setCourseTypeId}
        centers={centers.data.data}
        centerId={centerId}
        setCenterId={setCenterId}
        modeOfInstructionId={modeOfInstructionId}
        setModeOfInstructionId={setModeOfInstructionId}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />

      <DataTable
        columns={columns}
        data={data.data}
        onRowClick={(id) => navigate(`/courses/${id}`)}
        sort={sort}
        onSort={handleSort}
        storageKeyName="course-table-columns"
      />

      <Pagination
        currentPage={currentPage}
        hasNext={data.next}
        hasPrevious={data.previous}
        onPageChange={setCurrentPage}
        count={data.count}
      />
    </div>
  );
};

export default CoursesPage;
