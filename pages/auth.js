import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImEye } from "react-icons/im";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "src/components/common/Alert";
import { color } from "src/constants/color";
import {
  facebookProvider,
  googleProvider
} from "src/constants/firebase-providers";
import { AuthService } from "src/services/auth";
import { firebaseService } from "src/services/firebase";
import { AuthActions } from "src/store/auth/action";
import { storage } from "src/utils/storage";

export default function Auth() {
  const bg = useColorModeValue("purple.200", "gray.800");
  const formBg = useColorModeValue("white", "gray.800");

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.currentUser);
  const loading = useSelector(state => state.auth.loading);
  const logInError = useSelector(state => state.auth.logInError);
  const signUpError = useSelector(state => state.auth.signUpError);

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });
  const { name, phoneNumber, email, password } = form;
  const [idToken, setIdToken] = useState();

  useEffect(() => {
    if (user) {
      router.back();
    }
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userCred => {
      if (userCred) {
        userCred.getIdToken().then(token => {
          setIdToken(token);
          AuthService.loginWithGoogle(token).then(res => {
            storage.setToken(res.token);
            dispatch(AuthActions.setCurrentUserAction(res.user));
            router.push("/");
          });
        });
      }
    });
  }, [idToken]);

  const handleShow = () => setShow(!show);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = e => {
    e.preventDefault();
    dispatch(AuthActions.loginAction());
    AuthService.login(email, password)
      .then(res => {
        dispatch(AuthActions.loginSuccessAction(res.user));
        storage.setToken(res.token);
        router.push("/");
      })
      .catch(e => {
        console.log({ e });
        dispatch(AuthActions.loginFailedAction(e.response.data.message));
      });
  };

  const handleSignUp = e => {
    e.preventDefault();
    dispatch(AuthActions.signUpAction());
    AuthService.register(name, email, password, phoneNumber)
      .then(res => {
        dispatch(AuthActions.signUpSuccessAction(res.user));
        storage.setToken(res.token);
        router.push("/");
      })
      .catch(e => {
        console.log({ e });
        dispatch(AuthActions.signUpFailedAction(e.response.data.message));
      });
  };

  const loginWithGoogle = () => {
    firebaseService
      .socialMediaAuth(googleProvider)
      .then(userCred => {})
      .catch(e => {
        console.log(e);
      });
  };

  const loginWithFacebook = () => {
    firebaseService
      .socialMediaAuth(facebookProvider)
      .then(userCred => {})
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} bg={bg}>
        <div className="container">
          <div className="flex h-full flex-col lg:flex-row lg:items-center">
            <Flex flex={1}>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                src={"/images/banner.png"}
              />
            </Flex>
            <Box
              className="flex-1 flex flex-col border-2 rounded-lg pb-12"
              bg={formBg}
            >
              <Tabs isLazy isFitted variant="enclosed">
                <TabList>
                  <Tab _selected={{ color: "white", bg: color.PRIMARY }}>
                    Đăng nhập
                  </Tab>
                  <Tab _selected={{ color: "white", bg: color.PRIMARY }}>
                    Đăng ký
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="px-4 pt-4 flex flex-col">
                      <Heading fontSize={"2xl"}>Đăng nhập</Heading>
                      <form className="my-4" onSubmit={handleLogin}>
                        <FormControl id="email" isRequired>
                          <FormLabel>Email</FormLabel>
                          <Input
                            onChange={handleChange}
                            isRequired
                            className="my-2"
                            focusBorderColor={color.PRIMARY}
                            type="email"
                          />
                        </FormControl>

                        <div className="my-4" />
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <InputGroup size="md">
                            <Input
                              onChange={handleChange}
                              isRequired
                              className="my-2"
                              focusBorderColor={color.PRIMARY}
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                            />
                            <InputRightElement className="my-2">
                              <span
                                className="cursor-pointer"
                                onClick={handleShow}
                              >
                                {show ? (
                                  <RiEyeCloseLine color={color.PRIMARY} />
                                ) : (
                                  <ImEye color={color.PRIMARY} />
                                )}
                              </span>
                            </InputRightElement>
                          </InputGroup>
                          {logInError && (
                            <Box py={2}>
                              <CustomAlert label={logInError} status="error" />
                            </Box>
                          )}
                        </FormControl>

                        <Divider className="my-4" />
                        <div className="w-full">
                          <Button
                            w="full"
                            colorScheme="purple"
                            type="submit"
                            isLoading={loading}
                          >
                            Đăng nhập
                          </Button>
                        </div>
                      </form>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="px-4 pt-4 flex flex-col">
                      <Heading fontSize={"2xl"}>Đăng ký</Heading>
                      <form className="my-4" onSubmit={handleSignUp}>
                        <div className="flex flex-col md:flex-row">
                          <FormControl className="flex-1" id="name" isRequired>
                            <FormLabel>Họ và tên</FormLabel>
                            <Input
                              onChange={handleChange}
                              className="my-2"
                              focusBorderColor={color.PRIMARY}
                              type="text"
                            />
                          </FormControl>
                          <div className="m-2"></div>
                          <FormControl
                            className="flex-1"
                            id="phoneNumber"
                            isRequired
                          >
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input
                              onChange={handleChange}
                              isRequired
                              className="my-2"
                              focusBorderColor={color.PRIMARY}
                              type="number"
                            />
                          </FormControl>
                        </div>

                        <div className="my-4" />
                        <FormControl id="email" isRequired>
                          <FormLabel>Email</FormLabel>
                          <Input
                            onChange={handleChange}
                            isRequired
                            className="my-2"
                            focusBorderColor={color.PRIMARY}
                            type="email"
                          />
                          <FormHelperText>
                            Chúng tôi sẽ không chia sẻ email của bạn.
                          </FormHelperText>
                        </FormControl>

                        <div className="my-4" />
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <InputGroup size="md">
                            <Input
                              onChange={handleChange}
                              isRequired
                              className="my-2"
                              focusBorderColor={color.PRIMARY}
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                            />
                            <InputRightElement className="my-2">
                              <span
                                className="h-full"
                                className="cursor-pointer"
                                onClick={handleShow}
                              >
                                {show ? (
                                  <RiEyeCloseLine color={color.PRIMARY} />
                                ) : (
                                  <ImEye color={color.PRIMARY} />
                                )}
                              </span>
                            </InputRightElement>
                          </InputGroup>
                          {signUpError && (
                            <Box py={2}>
                              <CustomAlert label={signUpError} status="error" />
                            </Box>
                          )}
                        </FormControl>
                        <Divider className="my-4" />
                        <div className="w-full">
                          <Button
                            w="full"
                            colorScheme="purple"
                            type="submit"
                            isLoading={loading}
                          >
                            Đăng ký
                          </Button>
                        </div>
                      </form>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <span className="text-center mb-4">Hoặc</span>
              <div className="px-8 flex flex-col md:flex-row">
                <Button
                  w={"full"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={loginWithGoogle}
                >
                  <Center>
                    <Text>Google</Text>
                  </Center>
                </Button>
                <div className="m-2"></div>
                <Button
                  w={"full"}
                  colorScheme={"facebook"}
                  leftIcon={<FaFacebook />}
                  onClick={loginWithFacebook}
                >
                  <Center>
                    <Text>Facebook</Text>
                  </Center>
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </Stack>
    </>
  );
}
