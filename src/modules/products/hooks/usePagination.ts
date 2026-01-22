import { useNavigate } from "@tanstack/react-router";
import type { UsePaginationProps } from "../types/hooks";


export const usePagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: UsePaginationProps) => {
  const navigate = useNavigate();

  const nextPage = () => {
    const nextPage = currentPage + 1;
    if (currentPage < totalPages) {
      onPageChange(nextPage);
    }
    navigate({ to: '/products', search: { page: nextPage } });
  };

  const prevPage = () => {
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      onPageChange(prevPage);
    }
    navigate({ to: '/products', search: { page: prevPage } });
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    onPageChange(validPage);
    navigate({ to: '/products', search: { page: validPage } });
  };

  return {
    nextPage,
    prevPage,
    goToPage,
  };
};
