import { useQuery } from '@tanstack/react-query';
import { useProductRepository } from '../context/ProductRepositoryContext';

export const useSearchProducts = () => {
  const { getAll } = useProductRepository();
  const { query } = useSearch();

  const params = {
    searchTerm: query,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => {
      getAll(params);
    },
    enabled: !!query,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
