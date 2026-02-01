import { Modal, Button, TextInput, NumberInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import type { Product } from "../types/entities";

type UpdateProductModalProps = {
  opened: boolean;
  onClose: () => void;
  product: Product;
  onSubmit: (data: { title: string; description?: string; price: number }) => void;
  loading?: boolean;
};

export const UpdateProductModal = ({
  opened,
  onClose,
  product,
  onSubmit,
  loading = false,
}: UpdateProductModalProps) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      title: product.title,
      description: product.description ?? "",
      price: product.price,
    },
  });

  useEffect(() => {
    if (!opened) return;
    setLocalError(null);

    form.setValues({
      title: product.title,
      description: product.description ?? "",
      price: product.price,
    });
    form.resetDirty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, product.id]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update product"
      centered
      radius="md"
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <form
  onSubmit={form.onSubmit(async (values) => {
    console.log("[MODAL] submit fired ✅", values);
     onSubmit(values);
    onClose();
  })}
      >
        <Stack>
          <TextInput label="Title" required {...form.getInputProps("title")} />
          <TextInput label="Description" {...form.getInputProps("description")} />
          <NumberInput label="Price" min={0} required {...form.getInputProps("price")} />

          {localError ? (
            <Text c="red" size="sm">
              {localError}
            </Text>
          ) : null}

          <Button type="submit" loading={loading} fullWidth>
            Save changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
