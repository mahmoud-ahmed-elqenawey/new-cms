import { useCustomQuery } from "@/hooks/useQuery";
import projectApiPathes from "@/utils/projectPathes";
import Loading from "../core/Loading";
import { Box, Field, Input, SimpleGrid } from "@chakra-ui/react";
import SelectInput from "../core/SelectInput";
// import DateFilter from "../core/DateFilter";

interface InventoryFiltersProps {
  show: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (value: string) => void;
  selectedCenter: string;
  onCenterChange: (value: string) => void;
}

export default function InventoryFilters({
  show,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedCenter,
  onCenterChange,
}: InventoryFiltersProps) {
  const categories = useCustomQuery(
    ["inventory_category"],
    projectApiPathes.inventoryCategory
  );

  const subcategories = useCustomQuery(
    ["inventory_subcategories"],
    projectApiPathes.inventorySubcategories
  );

  if (!show) return null;

  const filteredSubcategories = subcategories?.data?.data?.filter(
    (sub: any) =>
      !selectedCategory || sub.category.toString() === String(selectedCategory)
  );

  console.log("filteredSubcategories", filteredSubcategories);

  // Temporary mock data for centers
  const centers = ["المركز الرئيسي", "مركز التحفيظ", "المركز النسائي"];

  if (categories.isPending || subcategories.isPending) {
    return <Loading />;
  }

  return (
    <Box bg="gray.50" p={4} borderRadius="lg" mb={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
        {/* search */}
        <Field.Root flexBasis={"6"}>
          <Field.Label>بحث</Field.Label>
          <Input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث..."
          />
        </Field.Root>
        {/* search */}

        <SelectInput
          label="التصنيف"
          data={categories.data.data.map((el: any) => ({
            label: el.name,
            value: el.id,
          }))}
          defaultValue={[selectedCategory]}
          onValueChange={(e) => {
            onCategoryChange(e);
            onSubcategoryChange("");
          }}
        />

        <SelectInput
          label="التصنيف الفرعي"
          data={filteredSubcategories.map((el: any) => ({
            label: el.name,
            value: el.id,
          }))}
          defaultValue={[selectedSubcategory]}
          onValueChange={onSubcategoryChange}
          disabled={!selectedCategory}
        />

        <SelectInput
          label="التصنيف"
          data={centers.map((el: any) => ({
            label: el,
            value: el,
          }))}
          defaultValue={[selectedCenter]}
          onValueChange={onCenterChange}
        />
      </SimpleGrid>
    </Box>
  );
}
