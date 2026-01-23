import { TextInput } from '@mantine/core';

type ProductSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ProductSearchInput = ({ value, onChange }: ProductSearchInputProps) => {
  return (
    <TextInput
      label="Search Products"
      placeholder="Search by product name..."
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      mb="md"
      radius="md"
      size="md"
    />
  );
};
