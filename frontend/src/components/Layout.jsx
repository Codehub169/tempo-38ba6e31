import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, Container, Text } from '@chakra-ui/react';
import Header from './Header';
// Footer component will be created in a future batch
// import Footer from './Footer';

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flexGrow={1} py={{ base: 6, md: 8 }}>
        <Container>
          {/* Outlet renders the current route's component */}
          <Outlet />
        </Container>
      </Box>
      {/* Placeholder for Footer component */}
      <Box as="footer" bg="brand.neutralDarkGray" color="brand.neutralLightGray" textAlign="center" py={6} mt="auto">
        <Text>&copy; {new Date().getFullYear()} FoodHub. All Rights Reserved. Designed for delight.</Text>
      </Box>
    </Flex>
  );
};

export default Layout;
