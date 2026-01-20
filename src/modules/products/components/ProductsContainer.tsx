import {  Container } from "@mantine/core";
import type { Product } from "../types/entities";
import ProductsCarousel from "./ProductsCarousel";

const ProductsContainer: React.FC<{ products: Product[] }> = ({  products }) => {

  return (
    <Container bg={"rgb(187, 187, 187)"} py={"lg"} display={"block"}>
      {/* <Title ta={"left"}>{category.toUpperCase()}</Title> */}
      <ProductsCarousel products={products} />
    </Container>
  );
};

export default ProductsContainer;