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
      const res = await CheckoutService.returnUrl('vn-pay', router.query);
      if (res?.code === '00') {
        await UserService.charge(res.userId, {
          orderId: res.orderId,
          amount: res.amount,
          currency: 'VND',
          method: 'VNPAY'
        })
          .then(res => {
            console.log('res', res);
            setStatus('success');
          })
          .catch(err => {
            setStatus('failed');
          });
      }
      setChecking(false);
    }
    check();
  }, [router]);
  return (
    <Flex w='full' h={'100vh'} justify='center' align='center'>
      {checking && !status ? (
        <Loading />
      ) : (
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
              'Đã có lỗi xảy ra trong quá trình nạp tiền. Vui lòng thử lại sau.'
            )}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
// vnp_Amount=10000000&
// vnp_BankCode = NCB &
//   vnp_BankTranNo=20211125142226 &
//   vnp_CardType=ATM &
//   vnp_OrderInfo=undefined &
//   vnp_PayDate=20211125142221 &
//   vnp_ResponseCode=00 &
//   vnp_TmnCode=M0T60KQH &
//   vnp_TransactionNo=13639874 &
//   vnp_TransactionStatus=00 &
//   vnp_TxnRef=ZnwqS &
//     vnp_SecureHash=72ab0e130deaf4043dfc62b57c41c1b0baa8a6a80190dcf17c0e16fe4c6ad35d3bc5c5ee13c8061d02ca1355d4e198f13b0aec8be35bbeec61e9d7b123e333b7

// amount: "12121212"
// extraData: ""
// message: "Transaction denied by user."
// orderId: "617915dab4a3fe410c8603ac-Ls3kN6m_d3"
// orderInfo: "Nạp tiền vào hệ thống"
// orderType: "momo_wallet"
// partnerCode: "MOMOK8K020211025"
// payType: ""
// requestId: "617915dab4a3fe410c8603ac-Ls3kN"
// responseTime: "1637826484326"
// resultCode: "1006"
// signature: "3eb1b00a67ffbd42e56937840f776a96438911719fff748de599704d34ec2e2d"
// transId: "1637826484273"
