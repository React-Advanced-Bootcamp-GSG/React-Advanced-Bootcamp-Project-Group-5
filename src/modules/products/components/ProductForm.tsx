import { useForm } from "@tanstack/react-form";
import {
  Button,
  Flex,
  Loader,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetAllCategories } from "../hooks/useGetAllCategories";

export default function App() {
  const { addProduct, isAdding } = useAddProduct();
  const { categories, isLoading } = useGetAllCategories();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      await addProduct({
        id: "",
        title: value.title,
        description: value.description,
        category: value.category,
        price: Number(value.price),
        image: value.image,
        isAvailable: true,
        hasDiscounts: false,
        discountPercentage: 0,
        reviews: [],
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Stack gap="md">
          {/* A type-safe field component*/}
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A title is required"
                  : value.length < 3
                    ? "Title must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <TextInput
                    label="Product title"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Enter product title"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.errors[0]}
                  />
                </>
              );
            }}
          />

          <form.Field
            name="description"
            children={(field) => (
              <>
                <Textarea
                  label="Product description"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter product description"
                  autosize
                  minRows={3}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors[0]}
                />
              </>
            )}
          />
          <form.Field
            name="price"
            children={(field) => (
              <>
                <TextInput
                  label="Product price"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter product price"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors[0]}
                />
              </>
            )}
          />
          <form.Field
            name="category"
            children={(field) => (
              <>
                <Select
                  label="Product category"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Select product category"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e || "")}
                  data={
                    isLoading
                      ? []
                      : categories.map((cat) => ({
                          value: cat.slug,
                          label: cat.name,
                        }))
                  }
                  error={field.state.meta.errors[0]}
                />
              </>
            )}
          />
        </Stack>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Flex justify={"space-between"} py="lg">
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? <Loader size="xs" /> : "Submit"}
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
          )}
        />
      </form>
    </div>
  );
}
