import type { Product } from "../modules/products/entities/Product";

  export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
  return products.reduce((acc: Record<string, Product[]>, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};
