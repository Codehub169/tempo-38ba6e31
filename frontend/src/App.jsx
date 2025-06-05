import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';
import Layout from './components/Layout';

// Lazy load page components for better initial load performance
const MenuPage = React.lazy(() => import('./pages/MenuPage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));

// ToastNotification component will be created in a future batch
// import ToastNotification from './components/ToastNotification';

function App() {
  return (
    <>
      {/* <ToastNotification /> Placeholder for global toast notifications */}
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="brand.primary" />
        </Box>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Index route for the menu page */}
            <Route index element={<MenuPage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            {/* Catch-all for 404 Not Found page (optional, can be added later) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
