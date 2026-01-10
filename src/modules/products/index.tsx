import { createContext, useContext, type PropsWithChildren } from "react";
import type { ProductsRepository } from "./repository/ProductsRepository";

const ProductContext = createContext<ProductsRepository | null>(null);

type ProductProviderProps = PropsWithChildren<{
  value: ProductsRepository | null;
}>;

export const ProductProviders = ({ value, children }: ProductProviderProps) => {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
