import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider, Toaster } from '@lune/ui';

import { CollectionDetailsPage } from '@/lib/collections/pages/collection-details-page';
import { CollectionsPage } from '@/lib/collections/pages/collections-page';
import { NewCollectionPage } from '@/lib/collections/pages/new-collection-page';
import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { LoginPage } from '@/lib/login/pages/login-page';
import { NewProductPage } from '@/lib/product/pages/new-product-page';
import { ProductDetailsPage } from '@/lib/product/pages/product-details-page';
import { ProductsPage } from '@/lib/product/pages/products-page';
import { CreateShopPage } from '@/lib/shop/pages/create-shop-page';
import { ShopsPage } from '@/lib/shop/pages/shops-page';
import { TranslateProductsPage } from '@/lib/translate/pages/translate-products-page';
import { AdminLayout } from '@/shared/components/admin-layout/admin-layout';

import { AuthWrapper } from './auth-wrapper';
import { ErrorBoundary } from './error-boundary';

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
        <ThemeProvider defaultTheme="dark" storageKey="lune-ui-theme">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route element={<AuthWrapper />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shops" element={<ShopsPage />} />
                <Route path="/shops/new" element={<CreateShopPage />} />
                <Route path="/translate/products/:id" element={<TranslateProductsPage />} />
                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/new" element={<NewProductPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />

                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/collections/new" element={<NewCollectionPage />} />
                  <Route path="/collections/:id" element={<CollectionDetailsPage />} />
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
