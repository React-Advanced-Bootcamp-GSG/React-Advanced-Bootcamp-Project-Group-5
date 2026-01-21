import { createRootRoute, createRoute, Navigate } from '@tanstack/react-router'
import { Layout } from './components/Layout';
import Products from './modules/products/views';
import  { ProductDetails } from './modules/products/components/ProductDetails';

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => <Navigate to="/" />,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Products,
});

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  loader: async ({ params }) => {
    return { productId: params.productId };
  },
  component: ProductDetails,
});

export const routeTree = rootRoute.addChildren([productsRoute, productRoute])