import { Flex } from '@chakra-ui/react';
import React from 'react';
import MemberCard from 'src/components/core/Card/MemberCard';
import CountDown from 'src/components/common/CountDown/CountDown';

export default function sandbox() {
  return (
    <Flex h='100vh' align='center' justify='center'>
      <MemberCard />
    </Flex>
  );
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'development') {
    return {
      props: {}
    };
  }
  return {
    notFound: true
  };
}
