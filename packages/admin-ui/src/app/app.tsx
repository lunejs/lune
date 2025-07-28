import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider, Toaster } from '@vendyx/ui';

import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { LoginPage } from '@/lib/login/pages/login-page';

import { AuthWrapper } from './auth-wrapper';
import { ErrorBoundary } from './error-boundary';

import './app.css';
import '@fontsource-variable/geist';

import { CreateShopPage } from '@/lib/shop/pages/create-shop-page';
import { ShopsPage } from '@/lib/shop/pages/shops-page';

export const queryClient = new QueryClient();

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
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<DashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
