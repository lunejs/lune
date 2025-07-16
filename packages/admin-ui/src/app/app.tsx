import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider, Toaster } from '@vendyx/ui';

import './app.css';
import { LoginPage } from '@/core/login/pages/login-page';
import { DashboardPage } from '@/core/dashboard/pages/dashboard-page';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
