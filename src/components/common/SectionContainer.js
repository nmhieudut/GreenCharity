import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Particle from '../uncommon/Particle';

export default function SectionContainer({
  children,
  hasBg,
  hasParticle,
  semi,
  noContainer,
  ...rest
}) {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const bg2 = useColorModeValue('gray.50', 'gray.800');
  return (
    <Box
      as={'section'}
      bg={hasBg ? bg : bg2}
      {...rest}
      w='full'
      position='relative'
    >
      {hasParticle && <Particle />}
      {!noContainer ? (
        <Container
          mx='auto'
          maxW={semi ? 'container.sm' : 'container.xl'}
          h='full'
          mt={4}
        >
          {children}
        </Container>
      ) : (
        <>{children}</>
      )}
    </Box>
  );
}
