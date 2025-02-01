import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { AppRouter } from '@/routes';
import './index.scss';

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
const root = ReactDOMClient.createRoot(rootContainer);
root.render(
   <StrictMode>
      <AppRouter />
   </StrictMode>
);
