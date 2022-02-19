import { Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';

export default function ServerSideError() {
  const router = useRouter();
  return (
    <SectionContainer>
      <Head>
        <title>Không tìm thấy trang</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Flex flexDir='column' h='100vh' align='center' justify='center' py={10} px={6}>
        <Heading
          display='inline-block'
          as='h2'
          size='2xl'
          bgGradient='linear(to-r, purple.400, purple.500, purple.600)'
          backgroundClip='text'
        >
          500
        </Heading>
        <Text fontSize='18px' mt={3} mb={2}>
          Ooops! Lỗi hệ thống.
        </Text>
        <Text color={color.PRIMARY} mb={6}>
          Có vẻ hệ thống đã có trục trặc. Vui lòng thử lại sau.
        </Text>

        <Button
          colorScheme='purple'
          color='white'
          variant='solid'
          onClick={() => router.push('/')}
        >
          Trở về trang chủ
        </Button>
      </Flex>
    </SectionContainer>
  );
}
