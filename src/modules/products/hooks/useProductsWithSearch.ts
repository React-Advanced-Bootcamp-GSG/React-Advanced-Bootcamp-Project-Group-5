import { useEffect, useState } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useDebounce } from './useDebounce';
import { useSearchProducts } from './useSearchProducts';
import { useGetAllProducts } from './useGetAllProducts';

const PRODUCTS_PER_PAGE = 30;

export const useProductsWithSearch = () => {
  const navigate = useNavigate();
  const { page, q } = useSearch({ from: '/products' }) as { page?: string; q?: string };

  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [searchTerm, setSearchTerm] = useState(q || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (q !== searchTerm) {
      setSearchTerm(q || '');
    }
  }, [q]);

  useEffect(() => {
    if (debouncedSearchTerm !== q) {
      navigate({
        to: '/products',
        search: { page: 1, q: debouncedSearchTerm }
      });
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);

  const isSearching = !!debouncedSearchTerm;

  const searchResults = useSearchProducts(
    PRODUCTS_PER_PAGE,
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    isSearching
  );

  const regularProducts = useGetAllProducts({
    limit: PRODUCTS_PER_PAGE,
    skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage,
    enabled: !isSearching,
  });

  const productsData = isSearching ? {
    allProducts: searchResults.products,
    error: searchResults.isError ? new Error('Search failed') : null,
    isLoading: searchResults.isLoading,
    totalPages: searchResults.totalPages,
  } : regularProducts;

  useEffect(() => {
    if (productsData.isLoading || productsData.totalPages === 0) return;

    if (Number(page) > productsData.totalPages) {
      setCurrentPage(productsData.totalPages);
      navigate({
        to: '/products',
        search: { page: productsData.totalPages, q: debouncedSearchTerm }
      });
    }

    if (Number(page) < 1) {
      setCurrentPage(1);
      navigate({ to: '/products', search: { page: 1, q: debouncedSearchTerm } });
    }
  }, [page, productsData.totalPages, productsData.isLoading, navigate, debouncedSearchTerm]);

  return {
    ...productsData,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };
};
