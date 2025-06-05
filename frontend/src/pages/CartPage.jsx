import React from 'react';
import { Box, Heading, Text, VStack, HStack, Button, IconButton, Image, Divider, Flex, Link as ChakraLink, AspectRatio } from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartSubtotal, clearCart } = useCart();

  const subtotal = getCartSubtotal();
  const taxes = subtotal * 0.05; // Mock 5% tax
  const total = subtotal + taxes;

  if (cartItems.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={6} color="brand.primary" fontFamily="heading">
          Your Shopping Cart
        </Heading>
        <Text fontSize="xl" color="brand.neutralDarkGray">
          Your cart is empty. 
          <ChakraLink as={RouterLink} to="/" color="brand.primary" fontWeight="semibold"> Start shopping!
          </ChakraLink>
        </Text>
      </Box>
    );
  }

  return (
    <Box py={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10} color="brand.primary" fontFamily="heading">
        Your Shopping Cart
      </Heading>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Cart Items List */}
        <VStack 
          divider={<Divider borderColor="gray.200" />} 
          spacing={6} 
          align="stretch" 
          flex={2} 
          bg="white" 
          p={{base: 4, md: 6}}
          borderRadius="md"
          boxShadow="md"
        >
          {cartItems.map((item) => (
            <Flex key={item.id} direction={{ base: 'column', sm: 'row' }} align={{ base: 'flex-start', sm: 'center' }} gap={4} w="100%">
              <AspectRatio ratio={1} w={{ base: '100%', sm: '80px' }} borderRadius="md" overflow="hidden">
                <Image src={item.image} alt={item.name} objectFit="cover" />
              </AspectRatio>
              <Box flex={1}>
                <Heading as="h3" size="md" fontFamily="heading" color="brand.neutralDarkGray">{item.name}</Heading>
                <Text fontSize="sm" color="gray.500">${item.price.toFixed(2)} each</Text>
              </Box>
              <HStack spacing={2} alignSelf={{base: 'flex-end', sm: 'center'}}>
                <IconButton 
                  icon={<MinusIcon />} 
                  size="sm" 
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  isDisabled={item.quantity <= 1}
                  bg="gray.200"
                  _hover={{bg: 'gray.300'}}
                />
                <Text fontWeight="semibold" minW="20px" textAlign="center">{item.quantity}</Text>
                <IconButton 
                  icon={<AddIcon />} 
                  size="sm" 
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  bg="gray.200"
                  _hover={{bg: 'gray.300'}}
                />
              </HStack>
              <Text fontWeight="semibold" color="brand.primary" minW="70px" textAlign="right" alignSelf={{base: 'flex-end', sm: 'center'}}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
              <IconButton 
                icon={<DeleteIcon />} 
                size="sm" 
                variant="ghost"
                colorScheme="red"
                aria-label="Remove item"
                onClick={() => removeFromCart(item.id)}
                alignSelf={{base: 'flex-end', sm: 'center'}}
              />
            </Flex>
          ))}
           <Button 
            variant="outline" 
            colorScheme="red" 
            onClick={clearCart} 
            alignSelf="flex-start"
            mt={4}
            leftIcon={<DeleteIcon />}
            >Clear Cart</Button>
        </VStack>

        {/* Cart Summary */}
        <Box 
          flex={1} 
          bg="white" 
          p={{base: 4, md: 6}} 
          borderRadius="md" 
          boxShadow="md" 
          alignSelf="flex-start" 
          position={{lg: "sticky"}} 
          top={{lg: "100px"}} // Adjust based on header height
        >
          <Heading as="h3" size="lg" mb={6} fontFamily="heading" borderBottomWidth="1px" pb={3}>Order Summary</Heading>
          <VStack spacing={3} align="stretch" mb={6}>
            <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Taxes (mock 5%)</Text>
              <Text fontWeight="semibold">${taxes.toFixed(2)}</Text>
            </HStack>
            <Divider my={2} />
            <HStack justify="space-between" fontSize="xl">
              <Text fontWeight="bold" color="brand.primary">Total</Text>
              <Text fontWeight="bold" color="brand.primary">${total.toFixed(2)}</Text>
            </HStack>
          </VStack>
          <VStack spacing={4} align="stretch">
            <Button as={RouterLink} to="/checkout" colorScheme="primary" size="lg" w="100%">
              Proceed to Checkout
            </Button>
            <Button as={RouterLink} to="/" variant="outline" colorScheme="secondary" size="lg" w="100%">
              Continue Shopping
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartPage;
