import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import {Provider} from "react-redux";
import store, { persiststore } from "./config/store/store.js";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
