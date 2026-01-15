import { Button, Card, Grid, Group, Image, Pill, Text } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import useDeleteProducts from "../hooks/useDeleteProducts";

export default function Products() {
  const {
    allProducts,
    // productsWithDiscountHigherThan10,
    // productsWithDiscountLowerThan10,
    // isLoading,
  } = useGetAllProducts();

  const {deleteProduct } = useDeleteProducts({onSuccess:()=>{
    console.log("product deleted successfully !!!! ");
    
  }});

  return (
    <Grid gutter="md">
      {allProducts.map((product) => {
        return (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 160ms ease, box-shadow 160ms ease",
              }}
            >
              <Card.Section style={{ position: "relative" }}>
                <Image
                  src={product.image}
                  height={180}
                  alt={product.title}
                  fit="cover"
                  fallbackSrc="https://placehold.co/800x600?text=Product"
                />

                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    insetInlineStart: 12,
                  }}
                >
                  {product.isAvailable ? (
                    <Pill size="sm">Available</Pill>
                  ) : (
                    <Pill size="sm" style={{ opacity: 0.7 }}>
                      Not Available
                    </Pill>
                  )}
                </div>
              </Card.Section>

              <Group
                justify="space-between"
                mt="md"
                align="flex-start"
                gap="xs"
              >
                <Text fw={600} lineClamp={1}>
                  {product.title}
                </Text>

                {"price" in product && typeof product.price === "number" ? (
                  <Text fw={700}>${product.price.toFixed(2)}</Text>
                ) : null}
              </Group>

              <Text size="sm" c="dimmed" mt={6} lineClamp={2}>
                {product.description}
              </Text>

              <Button
                fullWidth
                mt="md"
                radius="md"
                disabled={!product.isAvailable}
                style={{ marginTop: "auto" }}
              >
                {product.isAvailable ? "Order Now" : "Out of stock"}
              </Button>

               <Button
                fullWidth
                color="red"
                mt="md"
                radius="md"
                disabled={!product.isAvailable}
                style={{ marginTop: "auto" }}
                onClick={()=>deleteProduct(product.id)}
              >
              Delete
              </Button>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
