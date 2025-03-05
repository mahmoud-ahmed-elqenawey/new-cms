import DataTable from "@/components/core/DataTable";
import Loading from "@/components/core/Loading";
import PageHeader from "@/components/core/PageHeader";
import Pagination from "@/components/core/Pagination";
import StudentTableFilters from "@/components/Students/StudentTableFilters";
import { useCustomQuery } from "@/hooks/useQuery";
import projectApiPathes from "@/utils/projectPathes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const StudentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gender, setGender] = useState("");
  const [centerId, setCenterId] = useState<any>("");
  const [educationLevel, setEducationLevel] = useState<any>();
  const [ageFrom, setAgeFrom] = useState<any>();
  const [ageTo, setAgeTo] = useState<any>();
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
    ...(gender && { gender }),
    ...(centerId && { center: centerId }),
    ...(educationLevel && { education_level: educationLevel }),
    ...(ageFrom && { age_from: ageFrom }),
    ...(ageTo && { age_to: ageTo }),
  });

  const { data, isPending } = useCustomQuery(
    [`students-${params}`],
    `/${projectApiPathes.students}?${params.toString()}`
  );

  console.log("data", data);
  const centers = useCustomQuery([`centers`], `/${projectApiPathes.centers}`);

  const { refetch: downloadExcel, isLoading } = useCustomQuery(
    ["downloadExcel"],
    "tajweed/dashboard/students/?data-type=excel",
    { responseType: "blob" },
    false
  );

  const columns = [
    { label: "الاسم", field: "name" },
    { label: "الجنس", field: "gender" },
    { label: "العمر", field: "age" },
    { label: "المستوى التعليمي", field: "education_level" },
    { label: "رقم الهاتف", field: "mobile_number" },
    { label: "اسم المركز", field: "center" },
    { label: "ملاحظات", field: "notes" },
  ];

  const handleStudentClick = (id: string) => {
    navigate(`/students/${id}`);
  };

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const downloadCoursesExcelFile = () => {
    downloadExcel().then((res) => {
      if (res.status == "success") {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    });
  };

  if (isPending || centers.isPending) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title="صفحة الطلاب"
        count={`إجمالي عدد الطلاب: ${data?.count}`}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        buttonClick={downloadCoursesExcelFile}
        buttonLoading={isLoading}
      />

      <StudentTableFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        gender={gender}
        setGender={setGender}
        centerId={centerId}
        setCenterId={setCenterId}
        centers={centers?.data?.data}
        educationLevel={educationLevel}
        setEducationLevel={setEducationLevel}
        ageFrom={ageFrom}
        setAgeFrom={setAgeFrom}
        ageTo={ageTo}
        setAgeTo={setAgeTo}
      />

      <DataTable
        columns={columns}
        data={data?.data ? data?.data : []}
        sort={sort}
        onSort={handleSort}
        onRowClick={handleStudentClick}
        storageKeyName="students-table-columns"
      />

      <Pagination
        currentPage={currentPage}
        hasNext={data?.next}
        hasPrevious={data?.previous}
        onPageChange={setCurrentPage}
        count={data?.count}
      />
    </div>
  );
};

export default StudentsPage;
