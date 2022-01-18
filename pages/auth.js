import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ImEye } from 'react-icons/im';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import DividerWithText from 'src/components/common/DividerWithText';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import {
  facebookProvider,
  googleProvider
} from 'src/constants/firebase-providers';
import { AuthService } from 'src/services/auth';
import { firebaseService } from 'src/services/firebase';
import { AuthActions } from 'src/store/auth/action';
import { storage } from 'src/utils/storage';

export default function Auth() {
  const formBg = useColorModeValue('white', 'gray.800');

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const { name, phoneNumber, email, password } = form;
  const [idToken, setIdToken] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userCred => {
      userCred?.getIdToken().then(token => {
        setIdToken(token);
        AuthService.loginWithGoogle(token)
          .then(res => {
            storage.setToken(res.token);
            dispatch(AuthActions.setCurrentUserSuccessAction(res.user));
          })
          .catch(e => {
            console.log(e);
            toast({
              position: 'top-right',
              title: 'Thất bại.',
              description: e.response.data.message,
              status: 'error',
              duration: 9000,
              isClosable: true
            });
          });
      });
    });
  }, [idToken]);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(AuthActions.loginAction());
      const res = await AuthService.login(email, password);
      dispatch(AuthActions.loginSuccessAction(res.user));
      storage.setToken(res.token);
      return;
    } catch (err) {
      toast({
        position: 'top-right',
        title: 'Thất bại.',
        description: err.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(AuthActions.signUpAction());
      const res = await AuthService.register(
        name,
        email,
        password,
        phoneNumber
      );
      dispatch(AuthActions.signUpSuccessAction(res.user));
      storage.setToken(res.token);
    } catch (err) {
      toast({
        position: 'top-right',
        title: 'Thất bại.',
        description: err.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    firebaseService
      .socialMediaAuth(googleProvider)
      .then(userCred => {})
      .catch(e => {
        toast({
          position: 'top-right',
          title: 'Thất bại.',
          description: e.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      });
  };
  if (typeof window !== 'undefined' && user) {
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box
        background="url('/images/tuthienlogin.jpeg') no-repeat"
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
            Tham gia cộng đồng Green Charity ngay hôm nay!
          </Text>
        </Center>
      </Box>
      <SectionContainer semi bg={formBg}>
        <Box className='flex-1 flex flex-col pb-12' bg={formBg}>
          <Tabs isLazy isFitted variant='enclosed'>
            <TabList>
              <Tab _selected={{ color: 'white', bg: color.PRIMARY }}>
                Đăng nhập
              </Tab>
              <Tab _selected={{ color: 'white', bg: color.PRIMARY }}>
                Đăng ký
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className='px-4 pt-4 flex flex-col'>
                  <Heading fontSize={'2xl'}>Đăng nhập</Heading>
                  <form className='mt-4' onSubmit={handleLogin}>
                    <FormControl id='email' isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        onChange={handleChange}
                        isRequired
                        className='my-2'
                        focusBorderColor={color.PRIMARY}
                        type='email'
                        placeholder='Email'
                      />
                    </FormControl>

                    <div className='my-4' />
                    <FormControl id='password' isRequired>
                      <FormLabel>Mật khẩu</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          onChange={handleChange}
                          isRequired
                          className='my-2'
                          focusBorderColor={color.PRIMARY}
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='Mật khẩu'
                        />
                        <InputRightElement className='my-2'>
                          <span
                            className='cursor-pointer'
                            onClick={() => setShow(!show)}
                          >
                            {show ? (
                              <RiEyeCloseLine color={color.PRIMARY} />
                            ) : (
                              <ImEye color={color.PRIMARY} />
                            )}
                          </span>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      w='full'
                      mt={4}
                      colorScheme='purple'
                      type='submit'
                      isLoading={loading}
                    >
                      Đăng nhập
                    </Button>
                  </form>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='px-4 pt-4 flex flex-col'>
                  <Heading fontSize={'2xl'}>Đăng ký</Heading>
                  <form className='mt-4' onSubmit={handleSignUp}>
                    <div className='flex flex-col md:flex-row'>
                      <FormControl className='flex-1' id='name' isRequired>
                        <FormLabel>Họ và tên</FormLabel>
                        <Input
                          onChange={handleChange}
                          className='my-2'
                          focusBorderColor={color.PRIMARY}
                          type='text'
                        />
                      </FormControl>
                      <div className='m-2'></div>
                      <FormControl
                        className='flex-1'
                        id='phoneNumber'
                        isRequired
                      >
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input
                          onChange={handleChange}
                          isRequired
                          className='my-2'
                          focusBorderColor={color.PRIMARY}
                          type='number'
                        />
                      </FormControl>
                    </div>

                    <div className='my-4' />
                    <FormControl id='email' isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        onChange={handleChange}
                        isRequired
                        className='my-2'
                        focusBorderColor={color.PRIMARY}
                        type='email'
                      />
                      <FormHelperText>
                        Chúng tôi sẽ không chia sẻ email của bạn.
                      </FormHelperText>
                    </FormControl>

                    <div className='my-4' />
                    <FormControl id='password' isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          onChange={handleChange}
                          isRequired
                          className='my-2'
                          focusBorderColor={color.PRIMARY}
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='Enter password'
                        />
                        <InputRightElement className='my-2'>
                          <span
                            className='h-full cursor-pointer'
                            onClick={() => setShow(!show)}
                          >
                            {show ? (
                              <RiEyeCloseLine color={color.PRIMARY} />
                            ) : (
                              <ImEye color={color.PRIMARY} />
                            )}
                          </span>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      w='full'
                      mt={4}
                      colorScheme='purple'
                      type='submit'
                      isLoading={loading}
                    >
                      Đăng ký
                    </Button>
                  </form>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <DividerWithText mb={4}>Hoặc</DividerWithText>
          <div className='px-8'>
            <Button
              noLinear='true'
              w={'full'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              onClick={loginWithGoogle}
            >
              <Center>
                <Text>Google</Text>
              </Center>
            </Button>
          </div>
        </Box>
      </SectionContainer>
    </>
  );
}
