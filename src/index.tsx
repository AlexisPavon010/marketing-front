import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import { AppRouter } from './routers/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);