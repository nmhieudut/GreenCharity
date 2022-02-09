import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ImArrowRight2 } from 'react-icons/im';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import withAuth from 'src/HOCs/withAuth';
import { CheckoutService } from 'src/services/checkout';

function CheckoutDetail(props) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const router = useRouter();
  const [method, setMethod] = React.useState('momo');
  const [amount, setAmount] = React.useState(0);
  const onCheckout = async e => {
    e.preventDefault();
    const res = await CheckoutService.checkout(method, {
      amount_money: amount
    });
    router.push(res.payUrl);
  };

  return (
    <>
      <Head>
        <title>Nạp tiền</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box
        background="url('/images/checkout.jpg') no-repeat"
        backgroundSize='cover'
      >
        <Center
          mx='auto'
          py={48}
          style={{ background: 'rgba(128,90,213,0.5)' }}
        >
          <Text
            textAlign='center'
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color='white'
            fontWeight='bold'
          >
            Thủ tục thanh toán
          </Text>
        </Center>
      </Box>
      <SectionContainer>
        <Flex>
          <Box flex={3}>
            <Box p={8} bg={bg} rounded='md'>
              <Text fontWeight={600} fontSize='xl'>
                Chọn phương thức nạp tiền:
              </Text>
              <Box my={4}>
                <form className='mt-4' onSubmit={onCheckout}>
                  <FormControl my={2} isRequired>
                    <FormLabel mb={2}>
                      Nhập số tiền muốn nạp vào tài khoản:
                    </FormLabel>
                    <Input
                      type='number'
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder='Nhập tại đây'
                    />
                  </FormControl>
                  <FormControl my={2} isRequired>
                    <FormLabel mb={2}>Bạn muốn thanh toán qua:</FormLabel>
                    <RadioGroup onChange={setMethod} value={method}>
                      <Stack direction='column'>
                        <Radio value='momo'>
                          <Button
                            noLinear='true'
                            colorScheme='pink'
                            size='sm'
                            my={2}
                            leftIcon={
                              <Image src='/icons/momo.svg' alt='momo' />
                            }
                          >
                            Momo
                          </Button>
                        </Radio>
                        <Radio value='vn-pay'>
                          <Button
                            noLinear='true'
                            my={2}
                            size='sm'
                            leftIcon={
                              <Image
                                src='/images/vnpay.png'
                                alt='vn-pay'
                                w={30}
                              />
                            }
                          >
                            <Center>
                              <Text>VNPay</Text>
                            </Center>
                          </Button>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <Box textAlign='right' w='full'>
                    <Button
                      my={2}
                      size='md'
                      type='submit'
                      colorScheme={'purple'}
                      rightIcon={<ImArrowRight2 size='1.5rem' />}
                    >
                      Thanh toán ngay
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
          <Box ml={8} flex={2}>
            Order Summary
          </Box>
        </Flex>
      </SectionContainer>
    </>
  );
}
export default withAuth(CheckoutDetail);
