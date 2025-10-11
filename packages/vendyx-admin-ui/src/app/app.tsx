import '@fontsource-variable/geist';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider, Toaster } from '@vendyx/ui';

import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { LoginPage } from '@/lib/login/pages/login-page';
import { NewProductPage } from '@/lib/product/pages/new-product-page';
import { ProductDetailsPage } from '@/lib/product/pages/product-details-page';
import { ProductsPage } from '@/lib/product/pages/products-page';
import { AdminLayout } from '@/lib/shared/components/layout/admin-layout';
import { CreateShopPage } from '@/lib/shop/pages/create-shop-page';
import { ShopsPage } from '@/lib/shop/pages/shops-page';

import { AuthWrapper } from './auth-wrapper';
import { ErrorBoundary } from './error-boundary';

import './app.css';

// de primeras no carga, sino que hace refetching, pq? no cé
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route element={<AuthWrapper />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shops" element={<ShopsPage />} />
                <Route path="/shops/new" element={<CreateShopPage />} />
                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/products/new" element={<NewProductPage />} />
                </Route>
                <Route path="/" element={<DashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
