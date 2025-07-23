import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider, Toaster } from '@vendyx/ui';

import './app.css';
import { LoginPage } from '@/core/login/pages/login-page';
import { DashboardPage } from '@/core/dashboard/pages/dashboard-page';
import { ErrorBoundary } from './error-boundary';

export const App = () => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
