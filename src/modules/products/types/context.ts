import type { PropsWithChildren } from 'react';
import type { Product } from './entities';

export type ProductContextType = {
  allProducts: Product[];
  productsWithDiscountHigherThan10: Product[];
  productsWithDiscountLowerThan10: Product[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalProducts: number;
  totalPages: number;
  productsPerPage: number;
  deleteProduct: (id: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
};

export type ProductProviderProps = PropsWithChildren;
