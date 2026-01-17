import { Button, Grid, Text } from '@mantine/core';
import { groupProductsByCategory } from '../../../utilities/groupProductsByCategory';
import { useProducts } from '..';
import { ProductsContainer } from '../components';

export default function Products() {
  const {
    allProducts,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    loading,
    error,
  } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const productsByCategory = groupProductsByCategory(allProducts);

  return (
    <Grid gutter="xs">
      <Grid.Col span={12} style={{ textAlign: 'center' }}>
        <Button
          variant="outline"
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ marginRight: 8 }}
        >
          Previous
        </Button>
        <Text component="span" fw={500}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          variant="outline"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: 8 }}
        >
          Next
        </Button>
      </Grid.Col>
      {Object.keys(productsByCategory).map((category) => (
        <Grid.Col key={category} span={12} p={0} mb={'lg'}>
          <ProductsContainer
            key={category}
            category={category}
            products={productsByCategory[category]}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
