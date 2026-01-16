import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restProducts } from '../repository/restProducts';
import type { UseDeleteProductsParams } from '../types/hooks';

export const useDeleteProducts = (params: UseDeleteProductsParams) => {
  const { delete: deleteProduct } = restProducts();
  const { onSuccess } = params;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess();
    },
  });

  const handleDeleteProduct = (id: string) => {
    mutation.mutate(id);
  };

  return {
    deleteProduct: handleDeleteProduct,
    isDeleting: mutation.isPending,
  };
};
