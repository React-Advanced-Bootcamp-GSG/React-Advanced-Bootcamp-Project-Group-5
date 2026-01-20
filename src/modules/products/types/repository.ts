import type { Product } from './entities';

export type ProductQueryParams = {
  limit?: number;
  skip?: number;
};

export interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
}

export interface ProductResponse {
  product:Product
}
export interface ProductsRepository {
  getAll: (params: ProductQueryParams) => Promise<ProductsResponse>;
  delete: (id: string) => Promise<void>;
  getById :(id:string)=>Promise<ProductResponse>;
}
