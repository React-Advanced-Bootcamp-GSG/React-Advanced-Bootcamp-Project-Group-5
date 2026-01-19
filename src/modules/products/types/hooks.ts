import type { Product } from './entities';
import type { ProductQueryParams } from './repository';

export type UseGetAllProductsParams = ProductQueryParams & {
  currentPage?: number;
};

export type UseDeleteProductsParams = {
  onSuccess?: () => void;
};

export type SelectQueryData = {
  all: Product[];
  productsWithDiscountHigherThan10: Product[];
  productsWithDiscountLowerThan10: Product[];
  totalProducts: number;
  totalPages: number;
};

export type UseProductsReturn = {
  allProducts: Product[];
  productsWithDiscountHigherThan10: Product[];
  productsWithDiscountLowerThan10: Product[];
  error: Error | null;
  isLoading: boolean;
  totalProducts: number;
  totalPages: number;
};

export type UsePaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};
