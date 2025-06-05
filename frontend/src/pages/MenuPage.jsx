import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, useToast, Spinner, Center } from '@chakra-ui/react';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../contexts/CartContext';
import { fetchMenuItems } from '../services/api';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMenuItems();
        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
        setError('Could not load menu items. Please try again later.');
        toast({
          title: 'Error Loading Menu',
          description: err.message || 'Could not fetch menu items.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    };
    loadMenu();
  }, [toast]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: `${item.name} added to cart!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
      variant: 'subtle',
      icon: <Box as="span" role="img" aria-label="cart">🛒</Box>
    });
  };

  if (isLoading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" color="brand.primary" thickness="4px" speed="0.65s" emptyColor="brand.neutralLightGray" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="60vh">
        <Text color="brand.error" fontSize="xl">{error}</Text>
      </Center>
    );
  }

  return (
    <Box py={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10} color="brand.primary" fontFamily="heading">
        Our Delicious Menu
      </Heading>
      {menuItems.length === 0 && !isLoading ? (
        <Text textAlign="center" fontSize="lg">No menu items available at the moment. Please check back later.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default MenuPage;
