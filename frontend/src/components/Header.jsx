import React from 'react';
import { Box, Flex, Heading, Link as ChakraLink, Text, HStack, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
// The useCart hook will be provided by CartContext.jsx in a future batch
import { useCart } from '../contexts/CartContext'; 

const Header = () => {
  // Assuming useCart provides cartItemCount. If CartContext is not ready, this might need a default or mock.
  const { cartItemCount } = useCart ? useCart() : { cartItemCount: 0 }; 

  const navLinkStyles = ({ isActive }) => ({
    padding: '0.5rem 1rem',
    borderRadius: 'md',
    textDecoration: 'none',
    fontWeight: '500',
    fontFamily: 'body',
    color: isActive ? 'brand.neutralWhite' : 'brand.text',
    bg: isActive ? 'brand.primary' : 'transparent',
    _hover: {
      bg: isActive ? 'brand.primary' : 'brand.secondary',
      color: isActive ? 'brand.neutralWhite' : 'brand.neutralDarkGray',
    },
  });

  const cartLinkStyles = {
    padding: '0.5rem 1rem',
    borderRadius: 'md',
    textDecoration: 'none',
    fontWeight: '500',
    fontFamily: 'body',
    bg: 'brand.accent',
    color: 'brand.neutralDarkGray',
    _hover: {
      bg: '#e6c200', // Darker gold
    },
  };

  const displayMode = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box
      as="header"
      bg="brand.neutralWhite"
      boxShadow="sm"
      py={4}
      position="sticky"
      top="0"
      zIndex="sticky"
      width="100%"
    >
      <Flex
        className="header-content"
        width="90%"
        maxW="1200px"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        direction={displayMode}
        gap={displayMode === 'column' ? 2 : 0}
      >
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading as="h1" size="lg" color="brand.primary" fontFamily="heading">
            FoodHub
          </Heading>
        </ChakraLink>
        <HStack as="nav" spacing={{ base: 2, md: 3 }} wrap={displayMode === 'column' ? 'wrap' : 'nowrap'} justify={displayMode === 'column' ? 'center' : 'flex-start'}>
          <ChakraLink as={RouterNavLink} to="/" style={navLinkStyles}>
            Menu
          </ChakraLink>
          <ChakraLink as={RouterNavLink} to="/about" style={navLinkStyles}>
            About Us
          </ChakraLink>
          <ChakraLink as={RouterNavLink} to="/cart" style={cartLinkStyles} sx={navLinkStyles({isActive:false}) /* Apply base then override for cart */}>
            Cart ({cartItemCount})
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
