import { useQuery } from '@tanstack/react-query';
import { useProductRepository } from '../context/ProductRepositoryContext';
import type { ProductQueryParams } from '../types/repository';
import { useSearch } from '@tanstack/react-router';

export const useSearchProducts = (limit?: number, skip?: number, enabled: boolean = true) => {
  const { getAll } = useProductRepository();
  const query = useSearch({ from: '/products' }) as { q?: string };

  const params: ProductQueryParams = {
    searchTerm: query.q || '',
    limit,
    skip,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 'search', query.q, limit, skip],
    queryFn: () => getAll(params),
    enabled: enabled && !!query.q,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  return {
    products: data?.products || [],
    totalProducts: data?.totalProducts || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError
  };
};
