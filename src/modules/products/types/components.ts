import type { Product } from './entities';

export type ProductCardProps = {
  product: Product;
};

export type ProductsCarouselProps = {
  products: Product[];
};

export type ProductsContainerProps = {
  category: string;
  products: Product[];
};
