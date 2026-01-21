import { Button, Grid, Select, Text } from '@mantine/core';
import { groupProductsByCategory } from '../../../utilities/groupProductsByCategory';
import  {ProductsContainer} from '../components';
import { useState } from 'react';
import { useGetAllProducts } from '../hooks/useGetAllProducts';
import { usePagination } from '../hooks/usePagination';

const PRODUCTS_PER_PAGE = 30;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    allProducts,
    error,
    isLoading: loading,
    totalPages,
  } = useGetAllProducts({
    limit: PRODUCTS_PER_PAGE,
    skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage,
  });

  const { nextPage, prevPage } = usePagination({
    currentPage,
    onPageChange: setCurrentPage,
    totalPages,});

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const productsByCategory = groupProductsByCategory(allProducts);
  const categories = Object.keys(productsByCategory).map((cat) => ({
    value: cat,
    label: cat,
  }));

  return (
    <Grid gutter="xs">
        <Select
          label="Category"
          placeholder="Select category"
          data={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          searchable
          clearable
          nothingFoundMessage="No categories"
          mb="md"
          radius="md"
          size="md"
        />

        {
          <Grid.Col key={selectedCategory} span={15} p={0} mb="lg">
            <ProductsContainer  products={selectedCategory? productsByCategory[selectedCategory]:allProducts} />
          </Grid.Col>
      }
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
    </Grid>
  );
}
