"use client";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

type DataItem = { label: string; value: string }[];

const SelectInput = ({
  data,
  label,
  defaultValue,
  onValueChange,
  multiple,
  disabled,
}: {
  data: DataItem;
  label: string;
  defaultValue: string[];
  onValueChange: (value: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const frameworks = createListCollection({
    items: data,
  });

  return (
    <SelectRoot
      variant={"outline"}
      collection={frameworks}
      defaultValue={defaultValue}
      onValueChange={(e) => onValueChange(e.value[0])}
      multiple={multiple}
      disabled={disabled}
    >
      <SelectLabel>{label}</SelectLabel>
      <SelectTrigger clearable>
        <SelectValueText placeholder={`اختر ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectInput;
