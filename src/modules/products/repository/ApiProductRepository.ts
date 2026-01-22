import { toProduct } from "../adapters/toProduct";
import type { Product } from "../types/entities";
import type { IProductRepository, ProductResponse, ProductsResponse } from "../types/repository";

const BASE_URL = "https://dummyjson.com/products";

export const createApiProductRepository = (): IProductRepository => {
  return {
    getAll: async (params): Promise<ProductsResponse> => {
      const queryParams = new URLSearchParams();

      if (params.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params.skip !== undefined)
        queryParams.append("skip", params.skip.toString());

      const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
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
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
    },
    getById: async (id: string): Promise<ProductResponse> => {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product by ID');
      }
      const data = await response.json();
      return{ product: toProduct([data])[0]};
    },
    add: async (product): Promise<Product> => {
      const response = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      return data;
    },
    getAllCategories: async (): Promise<{ name: string, slug: string, url: string }[]> => {
      const response = await fetch(`${BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data;
    },
  };
};
