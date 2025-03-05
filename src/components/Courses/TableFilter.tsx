import { Box, Input, Field, SimpleGrid } from "@chakra-ui/react";
import SelectInput from "../core/SelectInput";
import useAuth from "@/store/useAuth";
import DateFilter from "../core/DateFilter";

interface TableFiltersProps {
  show: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  courseType: any[];
  courseTypeId: string;
  setCourseTypeId: (value: string) => void;
  centers: any[];
  centerId: string;
  setCenterId: (value: string) => void;
  modeOfInstructionId: string;
  setModeOfInstructionId: (value: string) => void;
  isFinished: string;
  setIsFinished: (value: string) => void;
}

export default function TableFilters({
  show,
  search,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  courseType,
  courseTypeId,
  setCourseTypeId,
  centers,
  centerId,
  setCenterId,
  modeOfInstructionId,
  setModeOfInstructionId,
  isFinished,
  setIsFinished,
}: TableFiltersProps) {
  if (!show) return null;

  const { user } = useAuth();

  const permission: any = user;

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
          label="الدورات"
          data={courseType.map((el) => ({ label: el.name, value: el.id }))}
          defaultValue={[courseTypeId]}
          onValueChange={setCourseTypeId}
        />

        <SelectInput
          label="  طريقة التدريس"
          data={[
            { label: "وجاهي", value: "face_to_face" },
            { label: "عن بعد", value: "online" },
          ]}
          defaultValue={[modeOfInstructionId]}
          onValueChange={setModeOfInstructionId}
        />

        {permission?.permission.__04__all_tajweed_data_access && (
          <SelectInput
            label="المراكز"
            data={centers.map((el) => ({ label: el.name, value: el.id }))}
            defaultValue={[centerId]}
            onValueChange={setCenterId}
          />
        )}

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          startLabel="من تاريخ"
          endLabel="إلى تاريخ"
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
      </SimpleGrid>
    </Box>
  );
}
