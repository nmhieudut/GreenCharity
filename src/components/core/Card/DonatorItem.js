import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { toVND } from 'src/utils/number';

export default function DonatorItem({ donation }) {
  const { donator } = donation;
  const bg = useColorModeValue('white', 'gray.900');
  return (
    <Flex p={2} border='1px solid #eaeaea' bg={bg} align='center'>
      <Avatar src={donator.picture} alt={'Donator'} size='sm' />
      <Stack ml={2} direction={'column'} spacing={1} fontSize={'md'}>
        <Text color='gray.700'>{donator.name}</Text>
        <Text color='gray.500' fontSize='xs'>
          {donator.phoneNumber.slice(0, -3) + '***'}
        </Text>
      </Stack>
      <Flex align='center' ml='auto' mr={2}>
        <Text color='gray.500'>{toVND(donation.amount)}đ</Text>
      </Flex>
    </Flex>
  );
}
