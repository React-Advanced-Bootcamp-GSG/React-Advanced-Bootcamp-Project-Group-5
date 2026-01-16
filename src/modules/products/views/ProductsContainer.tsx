import { Title, Container } from "@mantine/core";
import type { Product } from "../entities/Product";
import ProductsCarousel from "./ProductsCarousel";

const ProductsContainer: React.FC<{ category: string, products: Product[]}> = ({ category, products }) => {

  return (
      <Container bg={"#efd3ffff"} py={"lg"} display={"block"}>
        <Title ta={"left"}>{category.toUpperCase()}</Title>
        <ProductsCarousel products={products} />
      </Container>
  );
};

export default ProductsContainer;