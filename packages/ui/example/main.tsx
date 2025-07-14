import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../src/components';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="m-4">
      <Button>Hola</Button>
    </div>
  </StrictMode>
);
