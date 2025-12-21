import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { BrowserRouter, Route, Routes } from 'react-router';

import { LuneLogger } from '@lune/common';
import { ThemeProvider, Toaster } from '@lune/ui';

import { AssetsPage } from '@/lib/asset/pages/assets-page';
import { CollectionDetailsPage } from '@/lib/collections/pages/collection-details-page';
import { CollectionsPage } from '@/lib/collections/pages/collections-page';
import { NewCollectionPage } from '@/lib/collections/pages/new-collection-page';
import { CustomFieldsPage } from '@/lib/custom-fields/pages/custom-fields-page';
import { EntityCustomFieldsPage } from '@/lib/custom-fields/pages/entity-custom-fields-page';
import { NewCustomFieldPage } from '@/lib/custom-fields/pages/new-custom-fields-page';
import { CustomerDetailsPage } from '@/lib/customer/pages/customer-details-page';
import { CustomersPage } from '@/lib/customer/pages/customers-page';
import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { DiscountDetailsPage } from '@/lib/discount/pages/discount-details-page';
import { DiscountsPage } from '@/lib/discount/pages/discounts-page';
import { NewDiscountPage } from '@/lib/discount/pages/new-discount-page';
import LocationDetailsPage from '@/lib/locations/pages/location-details-page';
import { LocationsPage } from '@/lib/locations/pages/locations-page';
import NewLocationPage from '@/lib/locations/pages/new-location-page';
import { LoginPage } from '@/lib/login/pages/login-page';
import { OrderDetailsPage } from '@/lib/order/pages/order-details-page';
import { OrdersPage } from '@/lib/order/pages/orders-page';
import { NewPaymentMethodPage } from '@/lib/payments/pages/new-payment-method-page';
import { PaymentMethodDetailsPage } from '@/lib/payments/pages/payment-method-details-page';
import { PaymentMethodsPage } from '@/lib/payments/pages/payment-methods-page';
import { NewProductPage } from '@/lib/product/pages/new-product-page';
import { ProductDetailsPage } from '@/lib/product/pages/product-details-page';
import { ProductsPage } from '@/lib/product/pages/products-page';
import { VariantsPage } from '@/lib/product/pages/variatns-page';
import { InStorePickupLocationsPage } from '@/lib/shipments/pages/in-store-pickup-locations-page';
import { InStorePickupPreferencesPage } from '@/lib/shipments/pages/in-store-pickup-preferences-page';
import { NewZonePage } from '@/lib/shipments/pages/new-zone-page';
import { ShipmentsPage } from '@/lib/shipments/pages/shipments-page';
import { ZoneDetailsPage } from '@/lib/shipments/pages/zone-details-page';
import { CreateShopPage } from '@/lib/shop/pages/create-shop-page';
import { ShopDetails } from '@/lib/shop/pages/shop-details';
import { ShopsPage } from '@/lib/shop/pages/shops-page';
import { TranslateCollectionsPage } from '@/lib/translate/pages/translate-collections-page';
import { TranslateProductsPage } from '@/lib/translate/pages/translate-products-page';
import { AdminLayout } from '@/shared/components/admin-layout/admin-layout';
import ScrollToTop from '@/shared/components/scroll-to-top';
import { SettingsLayout } from '@/shared/components/settings-layout/settings-layout';

import { AdminUiContextProvider } from './admin-ui.context';
import { type AdminUiConfig } from './admin-ui-config';
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

export let gqlClient: GraphQLClient;

export const App = ({ config }: Props) => {
  LuneLogger.setLevels(['*']);

  gqlClient = new GraphQLClient(`${config.apiUrl}/admin-api`);

  return (
    <AdminUiContextProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <ThemeProvider defaultTheme="dark" storageKey="lune-ui-theme">
            <Toaster />
            <BrowserRouter>
              <ScrollToTop />
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
                    <Route path="/products/:id/variants/:variantId" element={<VariantsPage />} />

                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/collections/new" element={<NewCollectionPage />} />
                    <Route path="/collections/:id" element={<CollectionDetailsPage />} />

                    <Route path="/assets" element={<AssetsPage />} />

                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OrderDetailsPage />} />

                    <Route path="/discounts" element={<DiscountsPage />} />
                    <Route path="/discounts/new" element={<NewDiscountPage />} />
                    <Route path="/discounts/:id" element={<DiscountDetailsPage />} />

                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/customers/:id" element={<CustomerDetailsPage />} />
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
                    <Route
                      path="/settings/shipments/in-store-pickup/:id"
                      element={<InStorePickupPreferencesPage />}
                    />
                    <Route path="/settings/locations" element={<LocationsPage />} />
                    <Route path="/settings/locations/new" element={<NewLocationPage />} />
                    <Route path="/settings/locations/:id" element={<LocationDetailsPage />} />

                    <Route path="/settings/payments" element={<PaymentMethodsPage />} />
                    <Route path="/settings/payments/new" element={<NewPaymentMethodPage />} />
                    <Route path="/settings/payments/:id" element={<PaymentMethodDetailsPage />} />

                    <Route path="/settings/custom-fields" element={<CustomFieldsPage />} />
                    <Route
                      path="/settings/custom-fields/:entity"
                      element={<EntityCustomFieldsPage />}
                    />
                    <Route
                      path="/settings/custom-fields/:entity/new"
                      element={<NewCustomFieldPage />}
                    />
                  </Route>
                  <Route path="/" element={<DashboardPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </AdminUiContextProvider>
  );
};

type Props = {
  config: AdminUiConfig;
};
