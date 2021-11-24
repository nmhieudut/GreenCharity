import {
  Alert,
  AlertIcon,
  Box,
  Center,
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
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiWalletAlt } from 'react-icons/bi';
import { FaCcStripe } from 'react-icons/fa';
import { FcCalendar, FcPhone } from 'react-icons/fc';
import { FiEdit3 } from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import CustomAlert from 'src/components/common/Alert';
import Button from 'src/components/common/Button';
import { color } from 'src/constants/color';
import withAuth from 'src/HOCs/withAuth';
import MeLayout from 'src/layout/MeLayout';
import { storage } from 'src/libs/firebase';
import { UserService } from 'src/services/user';

function AccountPage() {
  const user = useSelector(state => state.auth.currentUser);
  const router = useRouter();
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
      user.id,
      Object.assign(info, { picture: imageUrl })
    );
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        // window.location.reload();
      }, 1000);
    }
  };

  return (
    <MeLayout>
      <Box w={'full'} py={4} px={10} mx={'auto'}>
        <Heading
          textAlign='center'
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Cài đặt tài khoản
        </Heading>
        <Flex flexDirection='column' justifyContent='center' mt={6} maxW='3xl'>
          <Flex flexDir={{ base: 'column', md: 'row' }} justify='space-between'>
            <Box className='flex justify-end relative w-48 h-48'>
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
            <Flex flexDir={'column'}>
              <Text fontSize='lg'>
                Số dư hiện có: <b>{user.balance} VND</b>{' '}
              </Text>
              <Button
                mt={2}
                colorScheme={'purple'}
                type='submit'
                onClick={() => router.push('/checkout')}
              >
                Nạp tiền
              </Button>
            </Flex>
          </Flex>

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
                  onChange={e => handleChange('phoneNumber', e.target.value)}
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
                    handleChange('dateOfBirth', format(date, 'yyyy/MM/dd'))
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
            <div className='mt-8' isDisable={loading}></div>
            <Box textAlign='right'>
              <Button colorScheme={'purple'} type='submit' isLoading={loading}>
                Cập nhật
              </Button>
            </Box>
          </form>
        </Flex>
      </Box>
    </MeLayout>
  );
}

function WalletTabs() {
  const [refetch, setRefetch] = useState(0);
  const { data, error, isError, isLoading } = useQuery(
    ['wallets', refetch],
    () => UserService.getWallets()
  );
  const { wallets } = data || [];

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
    </Box>
  );
}

export default withAuth(AccountPage);
