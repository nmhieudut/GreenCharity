import { Box, Flex, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { FcDonate, FcMoneyTransfer } from 'react-icons/fc';
import { VNDFormatter } from 'src/utils/number';

export default function ChargeItem(props) {
  const { history, idx } = props;
  const bg = useColorModeValue('purple.200', 'gray.800');
  const bg2 = useColorModeValue('gray.50', 'gray.900');
  return (
    <Flex w={'full'} rounded='sm' py={2} px={4} bg={idx % 2 !== 0 ? bg : bg2}>
      <Box p={2} mr='6'>
        {history.action === 'charge' && <FcMoneyTransfer size='2rem' />}
        {history.action === 'donate' && <FcDonate size='2rem' />}
      </Box>
      <Flex flexDir='column' alignItems='flex-start'>
        {history.action === 'charge' && (
          <Box>Nạp tiền vào ví từ {history.method}</Box>
        )}
        {history.action === 'donate' && <Box>Quyên góp từ thiện</Box>}
        <Text color='gray.500' fontSize='sm'>
          {format(new Date(history.createdAt), "dd/MM/yyyy - hh:mm aaaaa'm'")}
        </Text>
      </Flex>
      <Box ml='auto'>
        {history.action === 'charge' ? (
          <Tag colorScheme='green'>
            <Text fontSize='sm'>+ {VNDFormatter(history.amount)} VND</Text>
          </Tag>
        ) : (
          <Tag colorScheme='red'>
            <Text fontSize='sm'>- {VNDFormatter(history.amount)} VND</Text>
          </Tag>
        )}
      </Box>
    </Flex>
  );
}
