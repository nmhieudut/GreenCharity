import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

export default function Button({ noLinear, children, ...rest }) {
  return (
    <ChakraButton
      color='white'
      size='sm'
      {...rest}
      bgGradient={
        !noLinear && 'linear(to-r, purple.400, purple.500, purple.600)'
      }
    >
      {children}
    </ChakraButton>
  );
}
