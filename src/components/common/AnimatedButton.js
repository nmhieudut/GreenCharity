import { Box, Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

export default function AnimatedButton({
  noLinear,
  children,
  leftIcon,
  ...rest
}) {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <ChakraButton
      size='sm'
      bgGradient={
        !noLinear && 'linear(to-r, purple.400, purple.500, purple.600)'
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className='spread'
      overflow='hidden'
      maxW={isHover ? '100%' : 12}
      {...rest}
    >
      {leftIcon}
      <Box
        className='transition-all duration-500 ease-in-out'
        overflow='hidden'
        w={isHover ? '100%' : 0}
        ml={isHover ? 2 : 0}
        opacity={isHover ? 1 : 0}
      >
        {children}
      </Box>
    </ChakraButton>
  );
}
