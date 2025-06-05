import React from 'react';
import { Box, Image, Text, Button, VStack, Heading, AspectRatio, useColorModeValue } from '@chakra-ui/react';

const MenuItemCard = ({ item, onAddToCart }) => {
  // Ensure item is defined and has properties before destructuring
  if (!item) {
    // Optionally, render a placeholder or null if item is not yet loaded or is invalid
    return <Box p={5} boxShadow="md" borderWidth="1px" borderRadius="lg">Loading item details...</Box>;
  }

  const { name, description, price, image } = item;
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('brand.primary', 'brand.primary'); // Assuming 'brand.primary' is defined in theme

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md"
      bg={cardBg}
      transition="all 0.2s ease-in-out"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
      display="flex"
      flexDirection="column"
      height="100%" // Ensure cards in a grid take up same height
    >
      <AspectRatio ratio={16 / 9}>
        <Image 
          src={image || 'https://placehold.co/600x400?text=Food+Image'} 
          alt={name || 'Menu item image'}
          objectFit="cover" 
        />
      </AspectRatio>
      <VStack p={5} align="stretch" spacing={3} flexGrow={1} justifyContent="space-between">
        <VStack align="stretch" spacing={2}>
          <Heading as="h3" size="md" fontFamily="heading" color={headingColor} noOfLines={2}>
            {name || 'Unnamed Item'}
          </Heading>
          <Text fontSize="sm" color={textColor} noOfLines={3} minHeight="3.6em"> {/* Approx 3 lines of text */}
            {description || 'No description available.'}
          </Text>
        </VStack>
        <VStack align="stretch" spacing={3} mt={4}>
          <Text fontWeight="bold" fontSize="lg" color={useColorModeValue('gray.800', 'white')}>
            {typeof price === 'number' ? `$${price.toFixed(2)}` : 'Price not available'}
          </Text>
          <Button 
            colorScheme="primary" // Assuming 'primary' color scheme is defined in Chakra theme
            onClick={() => onAddToCart && onAddToCart(item)}
            isDisabled={!onAddToCart} // Disable if no handler is provided
            aria-label={`Add ${name || 'item'} to cart`}
          >
            Add to Cart
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default MenuItemCard;
