import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Particle from '../uncommon/Particle';

export default function SectionContainer({
  children,
  hasBg,
  hasParticle,
  ...rest
}) {
  const bg = useColorModeValue('gray.100', 'gray.700');
  return (
    <Box as={'section'} bg={hasBg && bg} {...rest} w='full'>
      {hasParticle && <Particle />}
      <Container mx='auto' maxW='container.xl'>
        {children}
      </Container>
    </Box>
  );
}
