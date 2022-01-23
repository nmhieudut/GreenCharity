import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { color } from 'src/constants/color';

export default function TitleLines(props) {
  return (
    <Flex align='center' justify='center' direction='column' mt={4} {...props}>
      <Flex as='span' w={100} h={'2px'} bg={color.PRIMARY}></Flex>
      <Box as='span' w={65} h={'2px'} bg={color.PRIMARY} mt={1}></Box>
    </Flex>
  );
}
