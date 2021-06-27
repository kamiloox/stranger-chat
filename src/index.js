import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import RootView from './views/RootView';
import { AppProvider } from './context/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <RootView />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
