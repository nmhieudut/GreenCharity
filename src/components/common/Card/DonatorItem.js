import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { VNDFormatter } from 'src/utils/number';

export default function DonatorItem({ donation }) {
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
      <Flex align='center' ml='auto'>
        <Text as={'i'} fontSize='xs' color='gray.500'>
          {VNDFormatter(donation.amount)}đ
        </Text>
      </Flex>
    </Flex>
  );
}
