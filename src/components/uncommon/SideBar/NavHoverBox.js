import React from 'react';
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { color } from 'src/constants/color';

export default function NavHoverBox({ title, icon, description }) {
  return (
    <>
      <Flex
        pos='absolute'
        mt='calc(50px - 7.5px)'
        ml='-10px'
        width={0}
        height={0}
        borderTop='10px solid transparent'
        borderBottom='10px solid transparent'
        borderRight={`10px solid ${color.PRIMARY}`}
      />
      <Flex
        h={100}
        w={250}
        flexDir='column'
        alignItems='center'
        justify='center'
        backgroundColor={color.PRIMARY}
        borderRadius='10px'
        color='#fff'
        textAlign='center'
      >
        <Icon as={icon} fontSize='xl' mb={4} />
        <Heading size='sm' fontWeight='normal'>
          {title}
        </Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}
