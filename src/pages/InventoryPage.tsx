import DataTable from "@/components/core/DataTable";
import Loading from "@/components/core/Loading";
import PageHeader from "@/components/core/PageHeader";
import Pagination from "@/components/core/Pagination";
import InventoryFilters from "@/components/Inventory/InventoryFilters";
import { useCustomQuery } from "@/hooks/useQuery";
import projectApiPathes from "@/utils/projectPathes";
import { useState } from "react";
import { useNavigate } from "react-router";

const InventoryPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc" | null;
  }>({
    field: "",
    direction: null,
  });

  const params = new URLSearchParams({
    ...(currentPage > 1 && { page: currentPage.toString() }),
    ...(sort?.field && { sort: `${sort.field}` }),
    ...(sort?.direction && { order: `${sort.direction}` }),
    ...(search && { search }),
    ...(selectedCategory && { category: selectedCategory }),
    ...(selectedSubcategory && { subcategory: selectedSubcategory }),
    ...(selectedCenter && { center: selectedCenter }),
  });

  const { data, isPending } = useCustomQuery(
    [`inventory-${params}`],
    `/${projectApiPathes.inventory}?${params.toString()}`
  );

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const columns = [
    {
      field: "image",
      label: "الصورة",
      render: (row: any) => (
        <img
          src={row.image}
          alt="Product"
          className="w-12 h-12 object-cover rounded-lg"
        />
      ),
    },
    { field: "name", label: "اسم العنصر" },
    { field: "current_quantity", label: "الكمية" },
    {
      field: "category",
      label: "التصنيف",
      render: (row: any) => `${row.subcategory.category.name}`,
    },
    {
      field: "subcategory",
      label: "التصنيف الفرعي",
      render: (row: any) => `${row.subcategory.name}`,
    },
    {
      field: "center",
      label: "المركز",
      render: (row: any) => `${row.center.name}`,
    },
  ];

  return (
    <div>
      <PageHeader
        title=" صفحة المخزن"
        count={`إجمالي عدد الدورات: ${data?.count}`}
        countLoading={isPending}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <InventoryFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={setSelectedSubcategory}
        selectedCenter={selectedCenter}
        onCenterChange={setSelectedCenter}
      />

      {isPending ? (
        <Loading type="skeleton" />
      ) : (
        <DataTable
          columns={columns}
          data={data?.data}
          sort={sort}
          onSort={handleSort}
          storageKeyName="inventoryTableColumns"
          onRowClick={(id) => navigate(`/inventory/${id}`)}
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

export default InventoryPage;
