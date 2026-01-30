import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useProductRepository } from "../context/ProductRepositoryContext";
import type { Product } from "../types/entities";
import type { ProductResponse, ProductsResponse } from "../types/repository";
  
type UpdateProductPayload = {
  id: string;
  updatedProduct: Partial<Pick<Product, "title" | "description" | "price">>;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { update } = useProductRepository();
  const mutation = useMutation<ProductResponse, unknown, UpdateProductPayload>({
    mutationKey: ["product", "update"],
    mutationFn: async ({ id, updatedProduct }) => {
      const res = await update(String(id), updatedProduct);
      return res;
    },
    onSuccess: (_res, vars) => {
      queryClient.setQueriesData<ProductsResponse>(
        { queryKey: ["products"], exact: false },
        (old): ProductsResponse | undefined => {
          if (!old) return old;

          return {
            ...old,
            products: old.products.map((p) =>
              p.id === vars.id ? { ...p, ...vars.updatedProduct } : p
            ),
          };
        }
      );
    },
    
  });

  return {
    updateProduct: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
