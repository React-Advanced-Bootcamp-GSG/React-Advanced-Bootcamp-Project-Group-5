import { useNavigate } from "@tanstack/react-router";
import type { UsePaginationProps } from "../types/hooks";


export const usePagination = ({
  currentPage,
  onPageChange,
  totalPages,
  searchQuery = '',
}: UsePaginationProps) => {
  const navigate = useNavigate();

  const nextPage = () => {
    const nextPage = currentPage + 1;
    if (currentPage < totalPages) {
      onPageChange(nextPage);
    }
    navigate({ to: '/products', search: { page: nextPage, q: searchQuery } });
  };

  const prevPage = () => {
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      onPageChange(prevPage);
    }
    navigate({ to: '/products', search: { page: prevPage, q: searchQuery } });
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    onPageChange(validPage);
    navigate({ to: '/products', search: { page: validPage, q: searchQuery } });
  };

  return {
    nextPage,
    prevPage,
    goToPage,
  };
};
