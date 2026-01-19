import { Title, Container } from '@mantine/core';
import { ProductsCarousel } from './ProductsCarousel';
import type { ProductsContainerProps } from '../types/components';

export const ProductsContainer = ({
  category,
  products,
}: ProductsContainerProps) => {
  return (
    <Container bg={'#efd3ffff'} py={'lg'} display={'block'}>
      <Title ta={'left'}>{category.toUpperCase()}</Title>
      <ProductsCarousel products={products} />
    </Container>
  );
};
