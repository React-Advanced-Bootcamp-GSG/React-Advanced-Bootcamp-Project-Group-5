import { createContext, useContext, type ReactNode } from 'react';
import type { IProductRepository } from '../types/repository';

const ProductRepositoryContext = createContext<IProductRepository | null>(null);

interface ProductRepositoryProviderProps {
  children: ReactNode;
  repository: IProductRepository;
}

export const ProductRepositoryProvider = ({
  children,
  repository,
}: ProductRepositoryProviderProps) => {
  return (
    <ProductRepositoryContext.Provider value={repository}>
      {children}
    </ProductRepositoryContext.Provider>
  );
};

export const useProductRepository = () => {
  const context = useContext(ProductRepositoryContext);
  if (!context) {
    throw new Error(
      'useProductRepository must be used within a ProductRepositoryProvider',
    );
  }
  return context;
};
