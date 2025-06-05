import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme';
import { CartProvider } from './contexts/CartContext';
import './index.css'; // Tailwind base styles will be injected here via PostCSS/Vite

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <App />
        </CartProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
