import { Select } from '@mantine/core';

type CategoryFilterProps = {
  categories: Array<{ value: string; label: string }>;
  value: string | null;
  onChange: (value: string | null) => void;
};

export const CategoryFilter = ({ categories, value, onChange }: CategoryFilterProps) => {
  return (
    <Select
      label="Category"
      placeholder="Select category"
      data={categories}
      value={value}
      onChange={onChange}
      searchable
      clearable
      nothingFoundMessage="No categories"
      mb="md"
      radius="md"
      size="md"
    />
  );
};
