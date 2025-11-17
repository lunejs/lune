import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider, Toaster } from '@lune/ui';

import { CollectionDetailsPage } from '@/lib/collections/pages/collection-details-page';
import { CollectionsPage } from '@/lib/collections/pages/collections-page';
import { NewCollectionPage } from '@/lib/collections/pages/new-collection-page';
import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { LocationsPage } from '@/lib/locations/pages/locations-page';
import NewLocationPage from '@/lib/locations/pages/new-location-page';
import { LoginPage } from '@/lib/login/pages/login-page';
import { NewProductPage } from '@/lib/product/pages/new-product-page';
import { ProductDetailsPage } from '@/lib/product/pages/product-details-page';
import { ProductsPage } from '@/lib/product/pages/products-page';
import { InStorePickupLocationsPage } from '@/lib/shipments/pages/in-store-pickup-locations-page';
import { NewZonePage } from '@/lib/shipments/pages/new-zone-page';
import { ShipmentsPage } from '@/lib/shipments/pages/shipments-page';
import { ZoneDetailsPage } from '@/lib/shipments/pages/zone-details-page';
import { CreateShopPage } from '@/lib/shop/pages/create-shop-page';
import { ShopDetails } from '@/lib/shop/pages/shop-details';
import { ShopsPage } from '@/lib/shop/pages/shops-page';
import { TranslateCollectionsPage } from '@/lib/translate/pages/translate-collections-page';
import { TranslateProductsPage } from '@/lib/translate/pages/translate-products-page';
import { AdminLayout } from '@/shared/components/admin-layout/admin-layout';
import { SettingsLayout } from '@/shared/components/settings-layout/settings-layout';

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
                <Route path="/translate/products" element={<TranslateProductsPage />} />
                <Route path="/translate/collections/:id" element={<TranslateCollectionsPage />} />
                <Route path="/translate/collections" element={<TranslateCollectionsPage />} />

                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/new" element={<NewProductPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />

                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/collections/new" element={<NewCollectionPage />} />
                  <Route path="/collections/:id" element={<CollectionDetailsPage />} />
                </Route>

                <Route element={<SettingsLayout />}>
                  <Route path="/settings/shop" element={<ShopDetails />} />
                  <Route path="/settings/shipments" element={<ShipmentsPage />} />
                  <Route path="/settings/shipments/new" element={<NewZonePage />} />
                  <Route path="/settings/shipments/:id" element={<ZoneDetailsPage />} />
                  <Route
                    path="/settings/shipments/in-store-pickup"
                    element={<InStorePickupLocationsPage />}
                  />
                  <Route path="/settings/locations" element={<LocationsPage />} />
                  <Route path="/settings/locations/new" element={<NewLocationPage />} />
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
