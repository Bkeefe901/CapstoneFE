import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider.jsx';

import './index.css'
import App from './App.jsx'

// I think I need <CookieProvider> wrapped around AppProvider 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
