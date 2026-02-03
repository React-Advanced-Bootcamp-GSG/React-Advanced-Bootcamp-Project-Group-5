import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/entities";
import { useProductRepository } from "../context/ProductRepositoryContext";
import { useState } from "react";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { add: addProduct } = useProductRepository();
  const [isAdding, setIsAdding] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (
      newProduct: Pick<
        Product,
        "id" | "title" | "description" | "category" | "price" | "image"
      >,
    ) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsAdding(true);
    },
  });

  const handleAddProduct = (
    product: Pick<
      Product,
      "id" | "title" | "description" | "category" | "price" | "image"
    >,
  ) => {
    mutate(product);
  };

  return {
    addProduct: handleAddProduct,
    isAdding,
    isLoading: isPending,
  };
};
