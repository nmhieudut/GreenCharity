import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiWalletAlt } from 'react-icons/bi';
import { FaCcStripe } from 'react-icons/fa';
import { FcCalendar, FcPhone } from 'react-icons/fc';
import { FiEdit3 } from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from 'src/components/common/Alert';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import withAuth from 'src/HOCs/withAuth';
import { storage } from 'src/libs/firebase';
import { UserService } from 'src/services/user';

function AccountPage() {
  const user = useSelector(state => state.auth.currentUser);
  const imageRef = useRef();
  const [info, setInfo] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(user.picture);

  const { name, phoneNumber, dateOfBirth } = info;

  const uploadButton = (
    <div>
      {imgLoading && (
        <Spinner
          color={color.PRIMARY}
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          size='xl'
        />
      )}
    </div>
  );

  const handleChange = (field, value) => {
    setInfo({
      ...info,
      [field]: value
    });
  };

  useEffect(() => {
    if (image) handleUpload();
  }, [image]);

  const handleImageChange = e => {
    setImageUrl('');
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setImgLoading(true);
    const uploadTask = storage.ref(`avatars/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('avatars')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageUrl(url);
            setImgLoading(false);
          });
      }
    );
  };

  const onUpdateInfo = async e => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    const res = await UserService.update(
      Object.assign(info, { picture: imageUrl })
    );
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <SectionContainer>
      <Head>
        <title>Tài khoản</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Heading
        textAlign='center'
        fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
      >
        Cài đặt tài khoản
      </Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display='flex'
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
      >
        <Box display='flex' flex='1' justifyContent='center' mt={4}>
          <div className='px-4 py-5 w-full'>
            <Box className='flex justify-center relative w-48 h-48'>
              {imageUrl ? (
                <Image
                  className='absolute h-full w-full rounded-full object-cover object-center'
                  src={imageUrl}
                  alt={user.name}
                />
              ) : (
                uploadButton
              )}
              <IconButton
                colorScheme='purple'
                rounded='full'
                pos='absolute'
                bottom='20px'
                right={0}
                onClick={() => imageRef.current.click()}
                icon={<FiEdit3 />}
              />
              <input
                ref={imageRef}
                type='file'
                className='hidden'
                onChange={handleImageChange}
              />
            </Box>
          </div>
        </Box>
        <Box
          display='flex'
          flex='3'
          flexDirection='column'
          justifyContent='start'
          marginTop={{ base: '3', md: '0' }}
          marginLeft={{ base: 0, md: '9' }}
        >
          <Tabs isLazy>
            <TabList>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Thông tin cá nhân
              </Tab>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Tài khoản ví
              </Tab>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Các hoạt động
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack direction='column' spacing={8} maxW='3xl'>
                  <form onSubmit={onUpdateInfo}>
                    <div className='my-8'></div>
                    <FormControl className='flex flex-col md:flex-row md:items-center md:justify-between'>
                      <FormLabel className='w-36'>EMAIL</FormLabel>
                      <Input
                        className='max-w-xl'
                        value={user.email}
                        focusBorderColor={color.PRIMARY}
                        isReadOnly
                      />
                    </FormControl>
                    <div className='my-8'></div>
                    <FormControl
                      className='flex flex-col md:flex-row md:items-center md:justify-between'
                      isRequired
                    >
                      <FormLabel className='w-36'>TÊN</FormLabel>
                      <Input
                        isDisabled={loading}
                        className='max-w-xl'
                        focusBorderColor={color.PRIMARY}
                        value={name}
                        onChange={e => handleChange('name', e.target.value)}
                      />
                    </FormControl>
                    <div className='my-8'></div>
                    <FormControl
                      className='flex flex-col md:flex-row md:items-center md:justify-between'
                      isRequired
                    >
                      <FormLabel className='w-36'>SỐ ĐIỆN THOẠI</FormLabel>

                      <InputGroup className='max-w-xl'>
                        <InputLeftElement pointerEvents='none'>
                          <FcPhone color='gray.300' />
                        </InputLeftElement>
                        <Input
                          isDisabled={loading}
                          value={phoneNumber}
                          placeholder='Nhập số điện thoại'
                          focusBorderColor={color.PRIMARY}
                          onChange={e =>
                            handleChange('phoneNumber', e.target.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>
                    <div className='my-8'></div>
                    <FormControl
                      className='flex flex-col md:flex-row md:items-center md:justify-between'
                      isRequired
                    >
                      <FormLabel className='w-36'>Sinh nhật</FormLabel>
                      <InputGroup className='max-w-xl'>
                        <InputLeftElement pointerEvents='none'>
                          <FcCalendar />
                        </InputLeftElement>
                        <Flatpickr
                          options={{ dateFormat: 'Y/m/d' }}
                          value={dateOfBirth}
                          onChange={([date]) =>
                            handleChange(
                              'dateOfBirth',
                              format(date, 'yyyy/MM/dd')
                            )
                          }
                          render={({ value, ...props }, ref) => {
                            return (
                              <Input
                                isDisabled={loading}
                                placeholder='Chọn ngày'
                                focusBorderColor={color.PRIMARY}
                                pl={10}
                                value={value}
                                ref={ref}
                              />
                            );
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <div className='mt-4'></div>
                    {success && (
                      <Box py={2}>
                        <CustomAlert
                          label='Cập nhật tài khoản thành công'
                          status='success'
                        />
                      </Box>
                    )}
                    <div
                      className='mt
                    isDisable={loading}-8'
                    ></div>
                    <Box textAlign='right'>
                      <Button
                        colorScheme={'purple'}
                        type='submit'
                        isLoading={loading}
                      >
                        Cập nhật
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </TabPanel>
              <TabPanel>
                <WalletTabs />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </SectionContainer>
  );
}

function WalletTabs() {
  const [refetch, setRefetch] = useState(0);
  const { data, error, isError, isLoading } = useQuery(
    ['wallets', refetch],
    () => UserService.getWallets()
  );
  const { wallets } = data || [];
  const onCreateWallet = async () => {
    const res = await UserService.createWallet();
    if (res) {
      setRefetch(refetch + 1);
    }
  };

  const onDeleteWallet = async id => {
    const res = await UserService.deleteWallet(id);
    if (res) {
      setRefetch(refetch + 1);
    }
  };

  return (
    <Box>
      <Alert status='warning'>
        <AlertIcon />
        Chúng tôi sẽ không lưu thẻ hoặc tài khoản thẻ trên hệ thống để tránh các
        trường hợp đánh cắp thông tin của bạn. Vui lòng chọn phương thức thanh
        toán cho mỗi lần nạp tiền.
      </Alert>
      <Flex justifyContent='flex-end'>
        <Button
          leftIcon={<BiWalletAlt />}
          colorScheme='purple'
          variant='solid'
          onClick={onCreateWallet}
        >
          Tạo ví mới
        </Button>
      </Flex>
      {wallets?.map(wallet => (
        <Box key={wallet._id}>
          <WalletItem wallet={wallet} onDelete={onDeleteWallet} />
        </Box>
      ))}
    </Box>
  );
}

function WalletItem({ wallet, onDelete }) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box boxShadow={'xl'} my={8} p={4}>
      <Text>Mã ví: {wallet._id}</Text>
      <Text>
        Số dư hiện có:{' '}
        <Text as='b'>{wallet.amount_money ? wallet.amount_money : 0} VND</Text>
      </Text>
      <Flex justify='flex-end'>
        <Button
          size='sm'
          leftIcon={<GiMoneyStack />}
          colorScheme='purple'
          variant='solid'
          nolinear='true'
          onClick={onToggle}
        >
          Nạp tiền
        </Button>
        <Button
          size='sm'
          leftIcon={<AiOutlineDelete />}
          ml={4}
          nolinear='true'
          onClick={() => onDelete(wallet._id)}
          colorScheme='red'
        >
          Xóa ví
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity py={4}>
        <Text>Chọn phương thức nạp tiền</Text>
        <Button
          nolinear='true'
          colorScheme='pink'
          size='sm'
          my={2}
          leftIcon={
            <svg
              width='16'
              className='svg-icon fill-current momo__logo '
              viewBox='0 0 96 87'
              fill='#fff'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M75.5326 0C64.2284 0 55.0651 8.74843 55.0651 19.5409C55.0651 30.3333 64.2284 39.0818 75.5326 39.0818C86.8368 39.0818 96 30.3333 96 19.5409C96 8.74843 86.8368 0 75.5326 0ZM75.5326 27.8805C70.7368 27.8805 66.8403 24.1604 66.8403 19.5818C66.8403 15.0031 70.7368 11.283 75.5326 11.283C80.3283 11.283 84.2248 15.0031 84.2248 19.5818C84.2248 24.1604 80.3283 27.8805 75.5326 27.8805ZM49.1561 14.6761V39.1226H37.3809V14.5535C37.3809 12.7138 35.8394 11.2421 33.9126 11.2421C31.9857 11.2421 30.4442 12.7138 30.4442 14.5535V39.1226H18.669V14.5535C18.669 12.7138 17.1276 11.2421 15.2007 11.2421C13.2739 11.2421 11.7324 12.7138 11.7324 14.5535V39.1226H0V14.6761C0 6.58176 6.89385 0 15.372 0C18.8403 0 22.0089 1.10377 24.5781 2.9434C27.1472 1.10377 30.3586 0 33.7841 0C42.2623 0 49.1561 6.58176 49.1561 14.6761ZM75.5326 47.544C64.2284 47.544 55.0651 56.2925 55.0651 67.0849C55.0651 77.8774 64.2284 86.6258 75.5326 86.6258C86.8368 86.6258 96 77.8774 96 67.0849C96 56.2925 86.8368 47.544 75.5326 47.544ZM75.5326 75.4245C70.7368 75.4245 66.8403 71.7044 66.8403 67.1258C66.8403 62.5472 70.7368 58.827 75.5326 58.827C80.3283 58.827 84.2248 62.5472 84.2248 67.1258C84.2248 71.7044 80.3283 75.4245 75.5326 75.4245ZM49.1561 62.2201V86.6667H37.3809V62.0975C37.3809 60.2579 35.8394 58.7862 33.9126 58.7862C31.9857 58.7862 30.4442 60.2579 30.4442 62.0975V86.6667H18.669V62.0975C18.669 60.2579 17.1276 58.7862 15.2007 58.7862C13.2739 58.7862 11.7324 60.2579 11.7324 62.0975V86.6667H0V62.2201C0 54.1258 6.89385 47.544 15.372 47.544C18.8403 47.544 22.0089 48.6478 24.5781 50.4874C27.1472 48.6478 30.3158 47.544 33.7841 47.544C42.2623 47.544 49.1561 54.1258 49.1561 62.2201Z'
                fill=''
              />
            </svg>
          }
        >
          Momo
        </Button>
        <Button
          ml={4}
          nolinear='true'
          my={2}
          size='sm'
          colorScheme={'gray'}
          leftIcon={<FaCcStripe size='1rem' />}
        >
          <Center>
            <Text>Stripe</Text>
          </Center>
        </Button>
      </Collapse>
    </Box>
  );
}

export default withAuth(AccountPage);
