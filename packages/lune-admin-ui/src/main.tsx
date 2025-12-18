import '@fontsource-variable/geist';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';

import './app/app.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App config={{ apiUrl: `http://localhost:4000` }} />
  </StrictMode>
);
