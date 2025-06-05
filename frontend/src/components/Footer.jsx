import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="brand.neutralDarkGray" color="brand.neutralLightGray" py={6} mt="auto">
      <Container maxW="container.xl">
        <Text textAlign="center" fontSize="sm">
          &copy; {new Date().getFullYear()} FoodHub. All Rights Reserved. Designed for delight.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
