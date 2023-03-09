import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';

import './index.scss';
import { AppRouter } from './routers/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={esES}>
      <AppRouter />
    </ConfigProvider>
  </React.StrictMode>
);