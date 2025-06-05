import React from 'react';
import { Box, Heading, Text, VStack, Image, SimpleGrid, Container, useColorModeValue } from '@chakra-ui/react';

const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <VStack 
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      spacing={3}
    >
      <Image src={imageUrl} alt={name} borderRadius="full" boxSize="120px" objectFit="cover" mb={2} boxShadow="sm" />
      <Heading as="h4" size="md" fontFamily="heading" color="brand.neutralDarkGray">{name}</Heading>
      <Text fontSize="sm" color="gray.500">{role}</Text>
    </VStack>
  );
};

const AboutUsPage = () => {
  const sectionBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('brand.neutralDarkGray', 'gray.200');

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4} color="brand.primary" fontFamily="heading">
            About FoodHub
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Your friendly neighborhood food ordering platform.
          </Text>
        </Box>

        <Box bg={sectionBg} p={{base:6, md:8}} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" mb={5} color="brand.primary" fontFamily="heading">Our Story</Heading>
          <Text fontSize="md" lineHeight="tall" color={textColor} mb={4}>
            Welcome to FoodHub, where passion for food meets convenience. Founded in 2024, FoodHub started as a small dream to bring delicious, high-quality meals directly to your doorstep. We believe that good food has the power to bring people together and create lasting memories.
          </Text>
          <Image 
            src="https://placehold.co/800x400/FFA07A/333?text=Our+Kitchen+Story&font=Montserrat" 
            alt="FoodHub Kitchen or Team" 
            borderRadius="md" 
            boxShadow="lg"
            my={6}
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/800x400?text=Our+Kitchen"
          />
          <Text fontSize="md" lineHeight="tall" color={textColor}>
            Our journey began with a simple idea: make ordering food a delightful experience. We noticed that often, the process was cumbersome and impersonal. We wanted to change that by creating a platform that is not only easy to use but also connects you with the heart behind the food – the chefs, the ingredients, and the stories.
          </Text>
        </Box>

        <Box bg={sectionBg} p={{base:6, md:8}} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" mb={5} color="brand.primary" fontFamily="heading">Our Mission</Heading>
          <Text fontSize="md" lineHeight="tall" color={textColor} mb={4}>
            Our mission is simple: to provide an exceptional online food ordering experience. We are committed to using the freshest ingredients, crafting innovative dishes, and ensuring every order is prepared with care. We strive to make your mealtime easy, enjoyable, and utterly satisfying.
          </Text>
          <Text fontSize="md" lineHeight="tall" color={textColor}>
            We aim to support local culinary talents and bring a diverse range of flavors to our community. By fostering strong relationships with our partner chefs and suppliers, we ensure that every dish served through FoodHub meets our high standards of quality and taste.
          </Text>
        </Box>
        
        <Box bg={sectionBg} p={{base:6, md:8}} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" mb={5} color="brand.primary" fontFamily="heading">Why Choose Us?</Heading>
          <Text fontSize="md" lineHeight="tall" color={textColor} mb={4}>
            At FoodHub, we're not just about food; we're about the experience. From browsing our user-friendly menu to the moment your order arrives, we aim for perfection. Our dedicated team works tirelessly to ensure quality, speed, and a touch of culinary magic in every bite. We value our customers and are always looking for ways to improve and delight you.
          </Text>
           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mt={6}>
            <VStack spacing={2} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md">
              <Heading size="md" color="brand.secondary">Quality Ingredients</Heading>
              <Text fontSize="sm" textAlign="center" color={textColor}>We partner with the best suppliers to bring you fresh, high-quality ingredients in every dish.</Text>
            </VStack>
            <VStack spacing={2} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md">
              <Heading size="md" color="brand.secondary">User-Friendly</Heading>
              <Text fontSize="sm" textAlign="center" color={textColor}>Our platform is designed for ease of use, making your ordering process smooth and enjoyable.</Text>
            </VStack>
            <VStack spacing={2} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md">
              <Heading size="md" color="brand.secondary">Dedicated Support</Heading>
              <Text fontSize="sm" textAlign="center" color={textColor}>Our team is here to ensure your experience is nothing short of excellent, every time.</Text>
            </VStack>
          </SimpleGrid>
        </Box>

        <Box bg={sectionBg} p={{base:6, md:8}} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.primary" fontFamily="heading">Meet The (Mock) Team</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            <TeamMemberCard 
              name="Chef Alex" 
              role="Head Chef" 
              imageUrl="https://placehold.co/120x120/FF6347/FFF?text=Chef+A&font=Poppins"
            />
            <TeamMemberCard 
              name="Maria Silva" 
              role="Operations Manager" 
              imageUrl="https://placehold.co/120x120/FFD700/333?text=Maria+S&font=Poppins"
            />
            <TeamMemberCard 
              name="Sam Lee" 
              role="Customer Happiness" 
              imageUrl="https://placehold.co/120x120/32CD32/FFF?text=Dev+Sam&font=Poppins"
            />
          </SimpleGrid>
        </Box>

      </VStack>
    </Container>
  );
};

export default AboutUsPage;
