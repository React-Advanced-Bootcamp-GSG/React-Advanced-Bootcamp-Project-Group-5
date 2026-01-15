import { useQuery } from '@tanstack/react-query';
import { restProducts } from '../repository/restProducts';
import type {
  SelectQueryData,
  UseProductQueryParams,
  UseProductsReturn,
} from '../types/hooks';

const DEFAULT_QUERY_DATA: SelectQueryData = {
  all: [],
  productsWithDiscountHigherThan10: [],
  productsWithDiscountLowerThan10: [],
  totalProducts: 0,
  totalPages: 0,
};

export const useGetAllProducts = (
  params: UseProductQueryParams
): UseProductsReturn => {
  const { getAll } = restProducts();

  const {
    data = DEFAULT_QUERY_DATA,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products', params.currentPage || 1],
    queryFn: async () => {
      const data = await getAll(params);
      return data;
    },
    staleTime: 1000 * 60,
    select: (data): SelectQueryData => {
      return {
        all: data.products,
        productsWithDiscountHigherThan10: data.products.filter(
          (p) => p.discountPercentage > 10
        ),
        productsWithDiscountLowerThan10: data.products.filter(
          (product) => product.hasDiscounts && product.discountPercentage <= 10
        ),
        totalProducts: data.totalProducts,
        totalPages: data.totalPages,
      };
    },
  });

  return {
    allProducts: data.all,
    productsWithDiscountHigherThan10: data.productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10: data.productsWithDiscountLowerThan10,
    error,
    isLoading,
    totalProducts: data.totalProducts,
    totalPages: data.totalPages,
  };
};
