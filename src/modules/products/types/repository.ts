import type { Product } from './entities';

export type ProductQueryParams = {
  limit?: number;
  skip?: number;
};

export type ProductsResponse = {
  products: Product[];
  totalProducts: number;
  totalPages: number;
};

export type IProductRepository = {
  getAll: (params: ProductQueryParams) => Promise<ProductsResponse>;
  delete: (id: string) => Promise<void>;
};
