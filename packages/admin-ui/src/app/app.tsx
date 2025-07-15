import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@vendyx/ui';

import './app.css';
import { LoginPage } from '@/core/login/pages/login-page';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/me" element={<h1>/ me</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
