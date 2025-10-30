import '@fontsource-variable/geist';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@lune/admin-ui';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
