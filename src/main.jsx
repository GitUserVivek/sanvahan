import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { createRoot } from 'react-dom/client';
import "./index.css"

const root = createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
