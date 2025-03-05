import { Box, Field, Input, SimpleGrid } from "@chakra-ui/react";
import SelectInput from "../core/SelectInput";
import DateFilter from "../core/DateFilter";
import useAuth from "@/store/useAuth";

interface TableFiltersProps {
  show: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  centerId: string;
  setCenterId: (value: string) => void;
  centers: any;
  educationLevel: any;
  setEducationLevel: (value: string) => void;
  ageFrom: any;
  setAgeFrom: (value: string) => void;
  ageTo: any;
  setAgeTo: (value: string) => void;
}

export default function StudentTableFilters({
  show,
  search,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  gender,
  setGender,
  centerId,
  setCenterId,
  centers,
  educationLevel,
  setEducationLevel,
  ageFrom,
  setAgeFrom,
  ageTo,
  setAgeTo,
}: TableFiltersProps) {
  if (!show) return null;

  const { user } = useAuth();

  const permission: any = user;

  const range = (start: number, end: number, step: number) => {
    return Array.from(
      Array.from(Array(Math.ceil((end - start + 1) / step)).keys()),
      (x) => start + x * step
    );
  };
  const AGE_RANGE = range(1, 100, 1);

  const EDUCATION_CHOICE = [
    { value: "1", label: "دراسات عليا" },
    { value: "2", label: "ماجستير" },
    { value: "3", label: "بكالوريس" },
    { value: "4", label: "مدرسة" },
    { value: "5", label: "لا يوجد" },
    { value: "6", label: "دبلوم" },
  ];

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
          label="الجنس"
          data={[
            { label: "ذكر", value: "1" },
            { label: "انثى", value: "2" },
          ]}
          defaultValue={[gender]}
          onValueChange={setGender}
        />

        <SelectInput
          label=" المستوي التعليمي"
          data={EDUCATION_CHOICE}
          defaultValue={[educationLevel]}
          onValueChange={setEducationLevel}
        />

        <SelectInput
          label="اقل عمر"
          data={AGE_RANGE.map((el) => ({
            label: String(el),
            value: String(el),
          }))}
          defaultValue={[ageFrom]}
          onValueChange={setAgeFrom}
        />

        <SelectInput
          label="اقصي عمر"
          data={AGE_RANGE.map((el) => ({
            label: String(el),
            value: String(el),
          }))}
          defaultValue={[ageTo]}
          onValueChange={setAgeTo}
        />

        {permission?.permission.__04__all_tajweed_data_access && (
          <SelectInput
            label="المراكز"
            data={centers.map((el: any) => ({ label: el.name, value: el.id }))}
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
        />
      </SimpleGrid>
    </Box>
  );
}
