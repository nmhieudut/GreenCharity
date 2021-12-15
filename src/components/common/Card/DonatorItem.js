import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { VNDFormatter } from 'src/utils/number';

export default function DonatorItem({ donation }) {
  console.log('---', donation);
  const { donator } = donation;
  return (
    <Flex p={4} shadow='md'>
      <Avatar src={donator.picture} alt={'Donator'} />
      <Stack ml={2} direction={'column'} spacing={1} fontSize={'md'}>
        <b>{donator.name}</b>
        <Text color='gray.500' fontSize='xs'>
          {donator.phoneNumber.slice(0, -3) + '***'}
        </Text>
      </Stack>
      {/* amount display */}
      <Flex align='center' ml='auto'>
        <Text fontSize='sm' fontWeight='600' color='gray.600'>
          {VNDFormatter(donation.amount)}đ
        </Text>
      </Flex>
    </Flex>
  );
}
