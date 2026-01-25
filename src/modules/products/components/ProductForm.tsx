import {
  Button,
  Flex,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetAllCategories } from "../hooks/useGetAllCategories";
import { addProductFormSchema } from "../../../utilities/addProductFormValidation";

export default function ProductForm() {
  const { addProduct, isLoading: isAddingProductLoading } = useAddProduct();
  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories();
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    },
    validate: zod4Resolver(addProductFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    addProduct({
      id: "",
      title: values.title,
      description: values.description,
      category: values.category,
      price: Number(values.price),
      image: values.image,
    });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Product title"
            placeholder="Enter product title"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Product description"
            placeholder="Enter product description"
            key={form.key("description")}
            autosize
            minRows={3}
            {...form.getInputProps("description")}
          />
          <NumberInput
            label="Product price"
            placeholder="Enter price"
            thousandSeparator=","
            key={form.key("price")}
            decimalScale={2}
            fixedDecimalScale
            {...form.getInputProps("price")}
          />
          <Select
            label="Product category"
            {...form.getInputProps("category")}
            placeholder="Select product category"
            key={form.key("category")}
            data={
              isCategoriesLoading
                ? []
                : categories.map((cat) => ({
                    value: cat.slug,
                    label: cat.name,
                  }))
            }
          />
          <TextInput
            label="Product image"
            placeholder="Enter product image"
            key={form.key("image")}
            {...form.getInputProps("image")}
          />
        </Stack>
        <Group>
          <Flex justify={"space-between"} py="lg" w={"100%"}>
            <Button type="submit">
              {isAddingProductLoading ? <Loader size="xs" /> : "Submit"}
            </Button>
            <Button
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                form.reset();
              }}
            >
              Reset
            </Button>
          </Flex>
        </Group>
      </form>
    </div>
  );
}
