import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouteRender } from './config/Route';
import './styles/global.css';
import './i18n/i18n';

// Wait for DOM to be ready before mounting React
document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

  root.render(
    <React.StrictMode>
      <RouteRender />
    </React.StrictMode>
  );
});
