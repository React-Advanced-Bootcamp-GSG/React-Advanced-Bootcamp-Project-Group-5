import { toProduct } from '../adapters/toProduct';
import type { IProductRepository, ProductsResponse } from '../types/repository';

const BASE_URL = 'https://dummyjson.com/products';

export const createApiProductRepository = (): IProductRepository => {
  return {
    getAll: async (params): Promise<ProductsResponse> => {
      const queryParams = new URLSearchParams();

      if (params.limit !== undefined)
        queryParams.append('limit', params.limit.toString());
      if (params.skip !== undefined)
        queryParams.append('skip', params.skip.toString());

      const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      const totalProducts = data.total;
      const totalPages = Math.ceil(
        totalProducts / (params.limit || totalProducts),
      );

      return {
        products: toProduct(data.products),
        totalProducts,
        totalPages,
      };
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    },
  };
};
