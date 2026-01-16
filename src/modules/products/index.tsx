import { createContext, useContext, useState } from 'react';
import { useGetAllProducts } from './hooks/useGetAllProducts';
import type { ProductContextType, ProductProviderProps } from './types/context';
import { useDeleteProducts } from './hooks/useDeleteProducts';

const PRODUCTS_PER_PAGE = 30;

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    allProducts,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    error,
    isLoading,
    totalProducts,
    totalPages,
  } = useGetAllProducts({
    limit: PRODUCTS_PER_PAGE,
    skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage,
  });

  const { deleteProduct } = useDeleteProducts({
    onSuccess: () => {
      return alert('Product deleted successfully');
    },
  });

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const contextValue: ProductContextType = {
    allProducts,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    loading: isLoading,
    error,
    currentPage,
    totalProducts,
    totalPages,
    productsPerPage: PRODUCTS_PER_PAGE,
    deleteProduct,
    nextPage,
    prevPage,
    goToPage,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
