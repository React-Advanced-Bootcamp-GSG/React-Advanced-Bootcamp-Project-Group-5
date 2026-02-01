import type { Product } from "./entities";

export type ProductQueryParams = {
  limit?: number;
  skip?: number;
};

export type ProductsResponse = {
  products: Product[];
  totalProducts: number;
  totalPages: number;
};

export interface ProductResponse {
  product: Product;
}
export type IProductRepository = {
  getAll: (params: ProductQueryParams) => Promise<ProductsResponse>;
  delete: (id: string) => Promise<void>;
  getById: (id: string) => Promise<ProductResponse>;
  add: (
    product: Pick<
      Product,
      "id" | "title" | "description" | "category" | "price" | "image"
    >,
  ) => Promise<Product>;
  update: (id:string, data: Partial<Pick<Product, "title" | "description" | "price">>) => Promise<ProductResponse> 
};

export type ICategoryRepository = {
  getAllCategories: () => Promise<
    { name: string; slug: string; url: string }[]
  >;
};
