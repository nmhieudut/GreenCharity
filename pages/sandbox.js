import { Flex } from '@chakra-ui/react';
import React from 'react';
import CountDown from 'src/components/common/CountDown';

export default function sandbox() {
  return (
    <Flex h='100vh' align='center' justify='center'>
      <CountDown timeTillDate='Mon Dec 20 2021 13:53:34 GMT+0700 (Giờ Đông Dương)' />
    </Flex>
  );
}
