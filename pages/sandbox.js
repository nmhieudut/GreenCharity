import { Flex } from '@chakra-ui/react';
import React from 'react';
import { MdCampaign } from 'react-icons/md';
import AnimatedButton from 'src/components/common/AnimatedButton';
import MemberCard from 'src/components/common/Card/MemberCard';

export default function sandbox() {
  return (
    <Flex h='100vh' align='center' justify='center'>
      {/* <AnimatedButton
        nolinear
        variant={'solid'}
        size={'sm'}
        colorScheme='purple'
        leftIcon={<MdCampaign />}
      >
        Hehehehe
      </AnimatedButton> */}
    </Flex>
  );
}
