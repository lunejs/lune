import '@fontsource-variable/geist';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@lunejs/admin-ui';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App config={{ apiUrl: 'http://localhost:8080' }} />
  </StrictMode>
);
