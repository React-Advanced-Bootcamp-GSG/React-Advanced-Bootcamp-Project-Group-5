import { useQuery } from "@tanstack/react-query";
import { useProductRepository } from "../context/ProductRepositoryContext";

export const useGetAllCategories = () => {
  const { getAllCategories } = useProductRepository();

  const query = useQuery({
    queryKey: ["product-categories"],
    queryFn: async (): Promise<
      { name: string; slug: string; url: string }[]
    > => {
      const categories = await getAllCategories();
      return categories;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};
