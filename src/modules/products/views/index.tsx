import { Grid } from '@mantine/core';
import { useState } from 'react';
import { groupProductsByCategory } from '../../../utilities/groupProductsByCategory';
import {
  ProductsContainer,
  ProductSearchInput,
  CategoryFilter,
  PaginationControls,
} from '../components';
import { useProductsWithSearch } from '../hooks/useProductsWithSearch';
import { usePagination } from '../hooks/usePagination';

export default function Products() {
  const {
    allProducts,
    error,
    isLoading,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  } = useProductsWithSearch();

  const { nextPage, prevPage } = usePagination({
    currentPage,
    onPageChange: setCurrentPage,
    totalPages,
    searchQuery: debouncedSearchTerm,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const productsByCategory = groupProductsByCategory(allProducts);
  const categories = Object.keys(productsByCategory).map((cat) => ({
    value: cat,
    label: cat,
  }));

  const displayProducts = selectedCategory
    ? productsByCategory[selectedCategory] || []
    : allProducts;

  return (
    <Grid gutter="xs">
      <Grid.Col span={12}>
        <ProductSearchInput value={searchTerm} onChange={setSearchTerm} />
      </Grid.Col>

      <Grid.Col span={12}>
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </Grid.Col>

      <Grid.Col span={12} p={0} mb="lg">
        <ProductsContainer
          products={displayProducts}
          isLoading={isLoading}
          error={error}
        />
      </Grid.Col>

      {!isLoading && !error && totalPages > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      )}
    </Grid>
  );
}
