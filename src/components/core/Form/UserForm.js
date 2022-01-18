import {
  Avatar,
  Badge,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { initial } from 'lodash';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete
} from 'react-icons/ai';
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import { CampaignForm } from 'src/components/core/Form/CampaignForm';
import CustomDrawer from 'src/components/common/CustomDrawer';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import { useStorage } from 'src/hooks/useStorage';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';
import { toVND } from 'src/utils/number';

const emptyFields = {
  name: '',
  email: '',
  phoneNumber: '',
  picture: '',
  balance: 0
};

export default function UserForm({ isEdited, initialValue }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(
    isEdited ? initialValue : emptyFields
  );
  const { _id, email, name, picture, balance, phoneNumber } = userData;
  const toast = useToast();
  const router = useRouter();
  const firstField = useRef();
  const imageRef = useRef();

  const { url, uploadLoading } = useStorage(picture, image, 'avatars');

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const onChange = e => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEdited) {
        await AdminService.updateUser(
          _id,
          Object.assign(userData, { picture: url })
        );
        toast({
          position: 'top-right',
          title: 'Thành công',
          description: 'Cập nhật tài khoản thành công',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        return router.replace(router.asPath);
      }
      await AdminService.createUser(Object.assign(userData, { picture: url }));
      toast({
        title: 'Thêm thành công',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      return router.replace(router.asPath);
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack spacing='24px' p={4}>
      <FormControl id='userName'>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            {url ? (
              <Avatar size='xl' src={url} />
            ) : uploadLoading ? (
              <Spinner
                color={color.PRIMARY}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                size='xl'
              />
            ) : (
              <Avatar size='xl' />
            )}
          </Center>
          <Center w='full'>
            <Button
              w='full'
              onClick={() => imageRef.current.click()}
              colorScheme='purple'
              color='white'
              variant='solid'
            >
              {isEdited ? 'Cập nhật ảnh' : 'Thêm ảnh'}
            </Button>
            <input
              ref={imageRef}
              type='file'
              className='hidden'
              onChange={handleImageChange}
            />
          </Center>
        </Stack>
      </FormControl>
      <FormControl id='name' isRequired>
        <FormLabel htmlFor='name'>Tên</FormLabel>
        <Input
          ref={firstField}
          name='name'
          id='name'
          value={name}
          onChange={e => onChange(e)}
        />
      </FormControl>
      <FormControl id='email'>
        <FormLabel htmlFor='email'>Email</FormLabel>
        {isEdited ? (
          <Input value={email} readOnly id='email' />
        ) : (
          <Input
            name='email'
            id='email'
            value={email}
            onChange={e => onChange(e)}
          />
        )}
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
        <Input
          onChange={e => onChange(e)}
          type='password'
          name='password'
          id='password'
          placeholder='Nhập mật khẩu mới'
        />
      </FormControl>
      <FormControl id='balance' isRequired>
        <FormLabel htmlFor='balance'>Số dư</FormLabel>
        <Input
          onChange={e => onChange(e)}
          value={balance}
          type='number'
          min='0'
          name='balance'
          id='balance'
        />
      </FormControl>
      <FormControl id='phoneNumber' isRequired>
        <FormLabel htmlFor='phoneNumber'>Số điện thoại</FormLabel>
        <Input
          onChange={e => onChange(e)}
          value={phoneNumber}
          type='number'
          name='phoneNumber'
          id='phoneNumber'
        />
      </FormControl>

      <Button
        colorScheme='purple'
        color='white'
        variant='solid'
        disabled={loading}
        isLoading={loading}
        onClick={handleSubmit}
      >
        {isEdited ? 'Cập nhật' : 'Tạo mới'}
      </Button>
    </Stack>
  );
}
