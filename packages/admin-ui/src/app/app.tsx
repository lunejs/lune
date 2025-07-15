import { BrowserRouter, Route, Routes } from 'react-router';

import './app.css';
import { ThemeProvider } from '@/core/shared/components/theme-provider';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vendyx-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>/ page</h1>} />
          <Route path="/me" element={<h1>/ me</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
