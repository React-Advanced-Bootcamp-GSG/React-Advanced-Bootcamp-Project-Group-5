import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProducts } from '..';

export default function useDeleteProducts({onSuccess}: { onSuccess: () => void;}) {
  const { delete: deleteProduct } = useProducts(); 
   const queryClient = useQueryClient();

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess();
    },
  });
  return {
    deleteProduct: mutate,
    isError,
    isPending,
    isSuccess,
  };
}
