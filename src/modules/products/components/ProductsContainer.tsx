import {  Container } from '@mantine/core';
import { ProductsCarousel } from './ProductsCarousel';
import type { ProductsContainerProps } from '../types/components';

export const ProductsContainer = ({
  products,
}: ProductsContainerProps) => {
  return (
    <Container bg={"rgb(187, 187, 187)"} py={"lg"} display={"block"}>
      {/* <Title ta={"left"}>{category.toUpperCase()}</Title> */}
      <ProductsCarousel products={products} />
    </Container>
  );
};
