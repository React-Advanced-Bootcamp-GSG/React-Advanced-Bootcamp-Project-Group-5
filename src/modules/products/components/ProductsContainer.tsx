import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { MdCategory } from "react-icons/md";
import type { Product } from "../types/entities";
import ProductsCarousel from "./ProductsCarousel";
import styles from "./ProductsContainer.module.css";

const ProductsContainer: React.FC<{
  category: string;
  products: Product[];
}> = ({ category, products }) => {
  return (
    <Container className={styles.container} py={"xl"} display={"block"}>
      <Group gap="md" mb="lg" align="center">
        <div className={styles.iconWrapper}>
          <MdCategory size={24} className={styles.icon} />
        </div>
        <Stack gap="0">
          <Title ta={"left"} className={styles.categoryTitle}>
            {category.toUpperCase()}
          </Title>
          <Text size="sm" c="dimmed">
            {products.length} {products.length === 1 ? "product" : "products"}
          </Text>
        </Stack>
      </Group>
      <ProductsCarousel products={products} />
    </Container>
  );
};

export default ProductsContainer;
