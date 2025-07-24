import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider, Toaster } from '@vendyx/ui';

import { LoginPage } from '@/lib/login/pages/login-page';
import { DashboardPage } from '@/lib/dashboard/pages/dashboard-page';
import { ErrorBoundary } from './error-boundary';

import '@fontsource-variable/geist';
import './app.css';
import { AuthWrapper } from './auth-wrapper';

export const App = () => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<AuthWrapper />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
