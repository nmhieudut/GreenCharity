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
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import { useStorage } from 'src/hooks/useStorage';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';
import { VNDFormatter } from 'src/utils/number';

function UserItem({
  user,
  onToggleActive,
  onUpdateUser,
  onDeleteUser,
  loading
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const imageRef = useRef();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const [userData, setUserData] = useState(user);
  const [image, setImage] = useState(null);

  const {
    _id,
    email,
    name,
    picture,
    balance,
    phoneNumber,
    dateOfBirth,
    isActive
  } = userData;

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

  const onUpdateInfo = async () => {
    await onUpdateUser(_id, Object.assign(userData, { picture: url }));
    onClose();
  };
  console.log('----', userData);
  return (
    <Tr
      cursor='pointer'
      _hover={{
        bg: bg
      }}
    >
      <Td>
        <Stack direction='row' align='center'>
          <Avatar name={user.name} size='sm' src={user.picture} />
          <Flex direction='column'>
            <Heading as='h3' size='sm'>
              {user.name}
            </Heading>
            <Text as='i' size='xs'>
              {user.email}
            </Text>
          </Flex>
        </Stack>
      </Td>
      <Td>{user.role}</Td>
      <Td>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</Td>
      <Td isNumeric>{VNDFormatter(user.balance)}</Td>
      <Td>
        <Flex align='center' justify='space-between'>
          <Badge colorScheme={user.isActive ? 'green' : 'red'}>
            {user.isActive ? 'Bình thường' : 'Bị khóa'}
          </Badge>
          <Menu ml='auto'>
            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
            <MenuList>
              <MenuItem icon={<FiEdit />} onClick={onOpen}>
                Sửa
              </MenuItem>
              <MenuItem
                icon={
                  user.isActive ? (
                    <AiOutlineCloseCircle />
                  ) : (
                    <AiOutlineCheckCircle />
                  )
                }
                onClick={() => onToggleActive(_id)}
              >
                {user.isActive ? 'Vô hiệu hóa' : ' Kích hoạt'}
              </MenuItem>

              <MenuDivider />
              <MenuItem
                icon={<AiOutlineDelete />}
                onClick={() => onDeleteUser(_id)}
              >
                Xóa
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Td>
      <Drawer
        size='sm'
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>{name}</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <FormControl id='userName'>
                <Stack direction={['column', 'row']} spacing={6}>
                  <Center>
                    {url ? (
                      <Avatar size='xl' src={url} />
                    ) : (
                      uploadLoading && (
                        <Spinner
                          color={color.PRIMARY}
                          thickness='4px'
                          speed='0.65s'
                          emptyColor='gray.200'
                          size='xl'
                        />
                      )
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
                      Đổi hình đại diện
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
                <Input value={email} readOnly id='email' />
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
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                noLinear
                variant='solid'
                disabled={loading}
                isLoading={loading}
                onClick={onClose}
              >
                Hủy bỏ
              </Button>
              <Button
                colorScheme='purple'
                color='white'
                variant='solid'
                disabled={loading}
                isLoading={loading}
                onClick={onUpdateInfo}
              >
                Cập nhật
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Tr>
  );
}

function Users() {
  const router = useRouter();
  const toast = useToast();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { data, isLoading, isError, error } = useQuery('users', () =>
    AdminService.getUsers()
  );
  const { users } = data || [];
  const [loading, setLoading] = useState(false);

  const handleToggleActive = async id => {
    try {
      await AdminService.toggleActiveUser(id);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Cập nhật trạng thái thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const onUpdateUser = async (id, payload) => {
    setLoading(true);
    try {
      await AdminService.updateUser(id, payload);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Cập nhật tài khoản thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const onDeleteUser = async id => {
    try {
      await AdminService.deleteUser(id);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Xóa tài khoản thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <AdminLayout>
      <Heading
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
        mb={4}
      >
        Quản lí người dùng
      </Heading>

      <Table size='sm' shadow='xl' rounded='md' overflow='hidden'>
        <Thead bg={bg}>
          <Tr>
            <Th>Tên / Email</Th>
            <Th>Phân quyền</Th>
            <Th>Tham gia vào</Th>
            <Th isNumeric>Số dư (VND)</Th>
            <Th>Tình trạng</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Center>
              <Loading />
            </Center>
          )}
          {users?.map(user => (
            <UserItem
              key={user._id}
              user={user}
              loading={loading}
              onUpdateUser={onUpdateUser}
              onToggleActive={handleToggleActive}
              onDeleteUser={onDeleteUser}
            />
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
}
export default withAdmin(Users);
