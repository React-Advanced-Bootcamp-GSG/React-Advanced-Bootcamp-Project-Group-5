import {} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/entities";
import { useProductRepository } from "../context/ProductRepositoryContext";
import { useState } from "react";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { add: addProduct } = useProductRepository();
  const [isAdding, setIsAdding] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (newProduct: Product) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsAdding(true);
    },
  });

  const handleAddProduct = (product: Product) => {
    mutate(product);
  }

  return {
    addProduct: handleAddProduct,
    isAdding,
  }
};
