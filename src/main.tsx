import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ProductRepositoryProvider } from './modules/products/context/ProductRepositoryContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider>
        <ProductRepositoryProvider>
          <App />
        </ProductRepositoryProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
