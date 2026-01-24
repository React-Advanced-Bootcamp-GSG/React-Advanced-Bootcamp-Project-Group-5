import type { ICategoryRepository } from "../types/repository";

const BASE_URL = "https://dummyjson.com/products";

export const createApiCategoryRepository = (): ICategoryRepository => {
  return {
    getAllCategories: async (): Promise<
      { name: string; slug: string; url: string }[]
    > => {
      const response = await fetch(`${BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data;
    },
  };
};
