import { Flex, Text, Box } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from 'src/components/common/Button';

export default function NeedLogin({ hasHeader }) {
  const router = useRouter();
  return (
    <>
      {hasHeader && (
        <Head>
          <title>Cần đăng nhập</title>
        </Head>
      )}

      <Flex
        direction='column'
        w={'full'}
        h={'full'}
        justify='center'
        align='center'
      >
        <Text fontSize='xl' mb={4}>
          Bạn cần đăng nhập để thực hiện hành động này
        </Text>
        <Button colorScheme='purple' onClick={() => router.push('/auth')}>
          Đăng nhập ngay
        </Button>
      </Flex>
    </>
  );
}
