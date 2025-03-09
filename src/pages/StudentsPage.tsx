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
  const filterDefaults = JSON.parse(
    localStorage.getItem("filterDataStudents") || "{}"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(filterDefaults?.showFilters);
  const [search, setSearch] = useState(filterDefaults.search || "");
  const [startDate, setStartDate] = useState(filterDefaults.startDate || "");
  const [endDate, setEndDate] = useState(filterDefaults.endDate || "");
  const [gender, setGender] = useState(filterDefaults.gender || "");
  const [centerId, setCenterId] = useState<any>(filterDefaults.centerId || "");
  const [educationLevel, setEducationLevel] = useState<any>(
    filterDefaults.educationLevel || ""
  );
  const [ageFrom, setAgeFrom] = useState<any>(filterDefaults?.ageFrom || "");
  const [ageTo, setAgeTo] = useState<any>(filterDefaults?.ageTo || "");
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

  useEffect(() => {
    localStorage.setItem(
      "filterDataStudents",
      JSON.stringify({
        showFilters,
        search,
        gender,
        centerId,
        educationLevel,
        ageFrom,
        ageTo,
      })
    );
  }, [showFilters, search, gender, centerId, educationLevel, ageFrom, ageTo]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, gender, centerId, educationLevel, ageFrom, ageTo]);

  useEffect(() => {
    localStorage.setItem("filterDataStudents", JSON.stringify({ save: false }));

    if (!filterDefaults.save) localStorage.removeItem("filterDataStudents");
  }, []);

  return (
    <div>
      <PageHeader
        title="صفحة الطلاب"
        count={`إجمالي عدد الطلاب: ${data?.count}`}
        countLoading={isPending}
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

      {isPending || centers.isPending ? (
        <Loading type="skeleton" />
      ) : (
        <DataTable
          columns={columns}
          data={data?.data ? data?.data : []}
          sort={sort}
          onSort={handleSort}
          onRowClick={handleStudentClick}
          storageKeyName="students-table-columns"
        />
      )}
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
