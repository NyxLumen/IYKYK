import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import '@/styles/globals.css';
import '@/styles/typography.css';
import '@/styles/textures.css';
import '@/styles/vertical-pass.css';
import '@/styles/hero.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
