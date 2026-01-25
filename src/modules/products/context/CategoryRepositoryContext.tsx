import { createContext, useContext, type ReactNode } from 'react';
import type { ICategoryRepository } from '../types/repository';

const CategoryRepositoryContext = createContext<ICategoryRepository | null>(null);

interface CategoryRepositoryProviderProps {
  children: ReactNode;
  repository: ICategoryRepository;
}

export const CategoryRepositoryProvider = ({
  children,
  repository,
}: CategoryRepositoryProviderProps) => {
  return (
    <CategoryRepositoryContext.Provider value={repository}>
      {children}
    </CategoryRepositoryContext.Provider>
  );
};

export const useCategoryRepository = () => {
  const context = useContext(CategoryRepositoryContext);
  if (!context) {
    throw new Error(
      'useCategoryRepository must be used within a CategoryRepositoryProvider',
    );
  }
  return context;
};
