import type { UsePaginationProps } from "../types/hooks";


export const usePagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: UsePaginationProps) => {
  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    onPageChange(validPage);
  };

  return {
    nextPage,
    prevPage,
    goToPage,
  };
};
