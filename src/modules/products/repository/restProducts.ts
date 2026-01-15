import { toProduct } from '../adapters/toProduct';
import type { ProductsRepository, ProductsResponse } from '../types/repository';

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (params): Promise<ProductsResponse> => {
      const queryParams = new URLSearchParams();

      if (params.limit !== undefined)
        queryParams.append('limit', params.limit.toString());
      if (params.skip !== undefined)
        queryParams.append('skip', params.skip.toString());

      const response = await fetch(Base_URL + '?' + queryParams.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const totalProducts = data.total;
      const totalPages = Math.ceil(
        totalProducts / (params.limit || totalProducts)
      );

      return {
        products: toProduct(data.products),
        totalProducts,
        totalPages,
      };
    },
  };
};
