import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Button, Image, Divider, Flex, FormControl, FormLabel, Input, useToast, AspectRatio, SimpleGrid, Center, Spinner } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { submitOrder } from '../services/api';

const CheckoutPage = () => {
  const { cartItems, getCartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const subtotal = getCartSubtotal();
  const taxes = subtotal * 0.05; // Mock 5% tax
  const total = subtotal + taxes;

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      toast({
        title: 'Your cart is empty!',
        description: 'Please add items to your cart before proceeding to checkout.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate('/cart');
    }
  }, [cartItems, navigate, toast, orderPlaced]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required customer fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerInfo,
        items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        totalAmount: total,
      };
      const response = await submitOrder(orderData);
      setOrderId(response.orderId); // Assuming API returns an orderId
      clearCart();
      setOrderPlaced(true);
      toast({
        title: 'Order Placed!',
        description: `Your order #${response.orderId} has been placed successfully.`,
        status: 'success',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to submit order:', error);
      toast({
        title: 'Order Submission Failed',
        description: error.message || 'There was an issue placing your order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <Center py={10} flexDirection="column">
        <Heading as="h1" size="xl" color="brand.success" mb={4} fontFamily="heading">🎉 Order Placed Successfully! 🎉</Heading>
        <Text fontSize="lg" mb={2}>Thank you for your order, {customerInfo.fullName}.</Text>
        {orderId && <Text fontSize="lg" mb={4}>Your Order ID is: <strong>#{orderId}</strong></Text>}
        <Text mb={6}>A confirmation email (mock) has been sent to {customerInfo.email}.</Text>
        <Button as={RouterLink} to="/" colorScheme="primary" size="lg">Continue Shopping</Button>
      </Center>
    );
  }
  
  // If cart becomes empty before order placement (e.g. due to navigation or error), redirect
  // This check is mainly for direct navigation to /checkout with an empty cart, handled by useEffect too.
  if (cartItems.length === 0) {
    return (
        <Center py={10} flexDirection="column">
            <Text fontSize="xl" color="brand.warning" mb={4}>Your cart is empty.</Text>
            <Button as={RouterLink} to="/" colorScheme="primary">Shop Now</Button>
        </Center>
    );
  }

  return (
    <Box py={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10} color="brand.primary" fontFamily="heading">
        Checkout
      </Heading>
      <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={8}>
        {/* Customer Info Form */}
        <Box flex={2} bg="white" p={{base: 4, md: 6}} borderRadius="md" boxShadow="md" as="form" onSubmit={handleSubmitOrder}>
          <Heading as="h3" size="lg" mb={6} fontFamily="heading" borderBottomWidth="1px" pb={3}>Customer Information</Heading>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input id="fullName" name="fullName" type="text" placeholder="John Doe" value={customerInfo.fullName} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={customerInfo.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" value={customerInfo.phone} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Delivery Address (Optional)</FormLabel>
              <Input id="address" name="address" type="text" placeholder="123 Main St, Anytown" value={customerInfo.address} onChange={handleInputChange} />
            </FormControl>
          </VStack>

          <Heading as="h3" size="lg" mt={8} mb={4} fontFamily="heading" borderBottomWidth="1px" pb={3}>Payment Details</Heading>
          <Box border="1px dashed" borderColor="gray.300" p={4} borderRadius="md" textAlign="center" color="gray.500" fontStyle="italic">
            <Text>Mock Payment Section</Text>
            <Text fontSize="sm">For this prototype, actual payment processing is not implemented. Clicking "Place Order" will simulate a successful order.</Text>
          </Box>
          
          <Button 
            type="submit" 
            colorScheme="primary" 
            size="lg" 
            w="100%" 
            mt={8}
            isLoading={isSubmitting}
            loadingText="Placing Order..."
          >
            Place Order
          </Button>
        </Box>

        {/* Order Summary */}
        <Box flex={1} bg="white" p={{base: 4, md: 6}} borderRadius="md" boxShadow="md" alignSelf="flex-start" position={{lg: "sticky"}} top={{lg: "100px"}}>
          <Heading as="h3" size="lg" mb={6} fontFamily="heading" borderBottomWidth="1px" pb={3}>Your Order</Heading>
          <VStack spacing={4} align="stretch" mb={6} divider={<Divider />}>
            {cartItems.map(item => (
              <HStack key={item.id} justify="space-between" align="center">
                <HStack align="center" spacing={3}>
                    <AspectRatio ratio={1} w="50px" borderRadius="md" overflow="hidden">
                        <Image src={item.image} alt={item.name} objectFit="cover" />
                    </AspectRatio>
                    <Box>
                        <Text fontWeight="medium" fontSize="sm">{item.name}</Text>
                        <Text color="gray.500" fontSize="xs">{item.quantity} x ${item.price.toFixed(2)}</Text>
                    </Box>
                </HStack>
                <Text fontWeight="medium" fontSize="sm">${(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))}
          </VStack>
          <VStack spacing={2} align="stretch" borderTopWidth="1px" pt={4} mt={4}>
             <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Taxes (mock 5%)</Text>
              <Text fontWeight="semibold">${taxes.toFixed(2)}</Text>
            </HStack>
            <Divider my={2} />
            <HStack justify="space-between" fontSize="lg">
              <Text fontWeight="bold" color="brand.primary">Total</Text>
              <Text fontWeight="bold" color="brand.primary">${total.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
