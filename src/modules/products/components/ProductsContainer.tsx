import { Container, Loader, Center, Text, Stack } from '@mantine/core';
import { ProductsCarousel } from './ProductsCarousel';
import type { ProductsContainerProps } from '../types/components';

export const ProductsContainer = ({
  products,
  isLoading = false,
  error = null,
}: ProductsContainerProps) => {
  if (isLoading) {
    return (
      <Container bg="rgb(187, 187, 187)" py="lg" display="block">
        <Center style={{ minHeight: '300px' }}>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text size="sm" c="dimmed">Loading products...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container bg="rgb(187, 187, 187)" py="lg" display="block">
        <Center style={{ minHeight: '300px' }}>
          <Stack align="center" gap="md">
            <Text size="lg" fw={500} c="red">Error loading products</Text>
            <Text size="sm" c="dimmed">{error.message}</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container bg="rgb(187, 187, 187)" py="lg" display="block">
        <Center style={{ minHeight: '300px' }}>
          <Stack align="center" gap="md">
            <Text size="lg" fw={500}>No products found</Text>
            <Text size="sm" c="dimmed">Try adjusting your search or filters</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container bg={"rgb(187, 187, 187)"} py={"lg"} display={"block"}>
      {/* <Title ta={"left"}>{category.toUpperCase()}</Title> */}
      <ProductsCarousel products={products} />
    </Container>
  );
};
