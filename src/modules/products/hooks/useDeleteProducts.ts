import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProductRepository } from '../context/ProductRepositoryContext';
import type { UseDeleteProductsParams } from '../types/hooks';
import { useState } from 'react';

export const useDeleteProducts = (params: UseDeleteProductsParams = {}) => {
  const { delete: deleteProduct } = useProductRepository();
  const { onSuccess } = params;
  const queryClient = useQueryClient();

  const [isDeleted, setIsDeleted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.();
      setIsDeleted(true);
    },
  });

  const handleDeleteProduct = (id: string) => {
    mutation.mutate(id);
  };

  return {
    deleteProduct: handleDeleteProduct,
    isDeleting: mutation.isPending,
    isDeleted,
  };
};
