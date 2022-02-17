import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CheckoutService } from 'src/services/checkout';
import { UserService } from 'src/services/user';
import Checkmark from 'src/components/common/Checkmark';
import Head from 'next/head';
import Loading from 'src/components/common/Spinner/Loading';

export default function VNPayReturn() {
  const router = useRouter();
  const [status, setStatus] = React.useState();
  const [checking, setChecking] = React.useState(false);

  useEffect(() => {
    async function check() {
      setChecking(true);
      try {
        const res = await CheckoutService.returnUrl('vn-pay', router.query);
        if (res?.code === '00') {
          await UserService.charge(res.userId, {
            orderId: res.orderId,
            amount: res.amount,
            currency: 'VND',
            method: 'VNPAY'
          });
          return setStatus('success');
        }
        return setStatus('failed');
      } catch (e) {
        setStatus('failed');
      } finally {
        setChecking(false);
      }
    }
    check();
  }, [router]);
  return (
    <Flex w='full' h={'100vh'} justify='center' align='center'>
      {checking && <Loading />}
      {!checking && status && (
        <Box textAlign='center' py={10} px={6}>
          <Head>
            <title>Kết quả thanh toán</title>
          </Head>
          <Checkmark status={status} />
          <Heading as='h2' size='xl' mt={6} mb={2}>
            {status === 'success' ? 'Nạp tiền thành công' : 'Nạp tiền thất bại'}
          </Heading>
          <Text color={'gray.500'}>
            {status === 'success' ? (
              <div>
                Tiền đã được nạp thành công vào tài khoản của bạn. Bấm vào{' '}
                <Link href='/account' textDecor='underline'>
                  đây
                </Link>{' '}
                để kiểm tra số dư
              </div>
            ) : (
              <div>
                Đã có lỗi xảy ra trong quá trình nạp tiền. Bấm vào{' '}
                <Link href='/checkout' textDecor='underline'>
                  đây
                </Link>{' '}
                để nạp lại
              </div>
            )}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
