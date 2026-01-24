import {
  Button,
  Center,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useProducts } from "..";
import { groupProductsByCategory } from "../../../utilities/groupProductsByCategory";
import { FilterSidebar, ProductsContainer } from "../components";
import styles from "./Products.module.css";
import { MdChevronLeft, MdChevronRight, MdFilterList } from "react-icons/md";

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

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 1000,
  ]);

  if (loading) {
    return (
      <Center p="xl" style={{ minHeight: "60vh" }}>
        <Stack align="center" gap="md">
          <div className={styles.spinner}></div>
          <Text size="lg" fw={500}>
            Loading amazing products...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center p="xl">
        <Paper p="lg" className={styles.errorContainer} radius="lg">
          <Text c="red" fw={600}>
            ⚠️ Error: {error.message}
          </Text>
        </Paper>
      </Center>
    );
  }

  const productsByCategory = groupProductsByCategory(allProducts);
  const categories = Object.keys(productsByCategory).map((cat) => ({
    value: cat,
    label: cat,
  }));

  const filteredProductsByCategory = React.useMemo(() => {
    if (selectedCategories.length === 0) {
      return productsByCategory;
    }
    return Object.fromEntries(
      Object.entries(productsByCategory).filter(([category]) =>
        selectedCategories.includes(category),
      ),
    );
  }, [productsByCategory, selectedCategories]);

  const finalFilteredProducts = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(filteredProductsByCategory).map(([category, products]) => [
        category,
        products.filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
        ),
      ]),
    );
  }, [filteredProductsByCategory, priceRange]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  const totalResults = Object.values(finalFilteredProducts).reduce(
    (sum, products) => sum + products.length,
    0,
  );

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Paper className={styles.header} p="xl" radius="lg">
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={1} size="h2" className={styles.mainTitle}>
                🛍️ Featured Products
              </Title>
              <Text c="dimmed" mt="xs">
                Discover our curated collection
              </Text>
            </div>
            <Group gap="xs" className={styles.headerStats}>
              <div className={styles.stat}>
                <Text size="xs" fw={500} c="dimmed">
                  Total Products
                </Text>
                <Text size="xl" fw={700} c="var(--primary-color)">
                  {allProducts.length}
                </Text>
              </div>
            </Group>
          </Group>
        </Stack>
      </Paper>

      {/* Main Content Grid */}
      <Grid gutter="lg" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        {/* Sidebar */}
        <Grid.Col span={{ base: 12, sm: 12, md: 3 }}>
          <FilterSidebar
            products={allProducts}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategories}
            onPriceChange={setPriceRange}
            onReset={handleResetFilters}
          />
        </Grid.Col>

        {/* Main Content */}
        <Grid.Col span={{ base: 12, sm: 12, md: 9 }}>
          {/* Results Info */}
          <Paper className={styles.resultsInfo} p="md" radius="lg" mb="lg">
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <MdFilterList size={18} color="var(--primary-color)" />
                <Text fw={600}>
                  Showing{" "}
                  <span className={styles.highlight}>{totalResults}</span>{" "}
                  results
                  {selectedCategories.length > 0 &&
                    ` • ${selectedCategories.length} filter active`}
                </Text>
              </Group>
              {selectedCategories.length > 0 && (
                <Button
                  size="xs"
                  variant="subtle"
                  onClick={handleResetFilters}
                  color="gray"
                >
                  Clear Filters
                </Button>
              )}
            </Group>
          </Paper>

          {/* Top Pagination */}
          <Paper
            className={styles.paginationContainer}
            p="md"
            radius="lg"
            mb="lg"
          >
            <Group justify="center" gap="md" align="center">
              <Button
                leftSection={<MdChevronLeft size={16} />}
                onClick={prevPage}
                disabled={currentPage === 1}
                className={styles.paginationBtn}
              >
                Previous
              </Button>
              <div className={styles.pageInfo}>
                <Text fw={600}>
                  <span className={styles.currentPage}>{currentPage}</span> of{" "}
                  <span className={styles.totalPages}>{totalPages}</span>
                </Text>
              </div>
              <Button
                rightSection={<MdChevronRight size={16} />}
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={styles.paginationBtn}
              >
                Next
              </Button>
            </Group>
          </Paper>

          {/* Products Display */}
          {Object.keys(finalFilteredProducts).length > 0 && totalResults > 0 ? (
            <Stack gap="lg" style={{ marginBottom: "2rem" }}>
              {Object.keys(finalFilteredProducts).map((category) =>
                finalFilteredProducts[category].length > 0 ? (
                  <ProductsContainer
                    key={category}
                    category={category}
                    products={finalFilteredProducts[category]}
                  />
                ) : null,
              )}
            </Stack>
          ) : (
            <Paper className={styles.emptyState} p="xl" radius="lg">
              <Stack align="center" gap="md">
                <div className={styles.emptyIcon}>📦</div>
                <div style={{ textAlign: "center" }}>
                  <Text fw={600} size="lg">
                    No Products Found
                  </Text>
                  <Text c="dimmed" size="sm" mt="xs">
                    Try adjusting your filters or reset them to see all products
                  </Text>
                </div>
                <Button onClick={handleResetFilters} variant="light">
                  Reset Filters
                </Button>
              </Stack>
            </Paper>
          )}

          {/* Bottom Pagination */}
          {totalResults > 0 && (
            <Paper className={styles.paginationContainer} p="md" radius="lg">
              <Group justify="center" gap="md" align="center">
                <Button
                  leftSection={<MdChevronLeft size={16} />}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  Previous
                </Button>
                <div className={styles.pageInfo}>
                  <Text fw={600}>
                    <span className={styles.currentPage}>{currentPage}</span> of{" "}
                    <span className={styles.totalPages}>{totalPages}</span>
                  </Text>
                </div>
                <Button
                  rightSection={<MdChevronRight size={16} />}
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Next
                </Button>
              </Group>
            </Paper>
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
}
