import {
  Avatar,
  Badge,
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
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
import CustomDrawer from 'src/components/common/CustomDrawer';
import UserForm from 'src/components/core/User/UserForm';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';
import { toVND } from 'src/utils/number';

function UserItem({ user, onToggleActive, onDeleteUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const bg = useColorModeValue('gray.100', 'gray.800');

  const {
    _id,
    email,
    name,
    picture,
    balance,
    phoneNumber,
    role,
    isActive,
    createdAt
  } = user;

  return (
    <Tr
      cursor='pointer'
      _hover={{
        bg: bg
      }}
    >
      <Td>
        <Flex>
          <Avatar name={name} size='sm' src={picture} />
          <Box ml='3'>
            <Text fontWeight='bold'>{name}</Text>
            <Text fontSize='sm'> {email}</Text>
          </Box>
        </Flex>
      </Td>
      <Td>
        <Badge>{role === 'user' ? 'Thành viên' : 'Khác'}</Badge>
      </Td>
      <Td>{format(new Date(createdAt), 'dd/MM/yyyy')}</Td>
      <Td isNumeric>{toVND(balance)}</Td>
      <Td>
        <Flex align='center' justify='space-between'>
          <Badge colorScheme={isActive ? 'green' : 'red'}>
            {isActive ? 'Bình thường' : 'Bị khóa'}
          </Badge>
          <Menu ml='auto'>
            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
            <MenuList>
              <MenuItem icon={<FiEdit />} onClick={onOpen}>
                Sửa
              </MenuItem>
              <MenuItem
                icon={
                  isActive ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />
                }
                onClick={() => onToggleActive(_id)}
              >
                {isActive ? 'Vô hiệu hóa' : ' Kích hoạt'}
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
          <UserForm isEdited initialValue={user} />
        </DrawerContent>
      </Drawer>
    </Tr>
  );
}

function Users() {
  const toast = useToast();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { data, isLoading, isError, error } = useQuery(['users', refresh], () =>
    AdminService.getUsers()
  );
  const { users } = data || [];
  const [refresh, setRefresh] = useState(0);

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
      setRefresh(refresh + 1);
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
      setRefresh(refresh + 1);
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
      <Stack
        direction={['column', 'row']}
        spacing={4}
        align='center'
        justify='space-between'
        mb={4}
      >
        <Heading
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
          mb={4}
        >
          Quản lí người dùng
        </Heading>
        <CustomDrawer
          showModalButtonText={
            <Button
              ml='auto'
              noLinear
              leftIcon={<BsPlus />}
              colorScheme='purple'
            >
              Thêm mới
            </Button>
          }
          drawerHeader='Thêm mới hoạt động'
          drawerBody={<UserForm />}
        ></CustomDrawer>
      </Stack>

      <Table shadow='xl' rounded='md' overflow='hidden'>
        <Thead bg={bg}>
          <Tr>
            <Th>Tên / Email</Th>
            <Th>Tư cách</Th>
            <Th>Tham gia vào</Th>
            <Th isNumeric>Số dư (VND)</Th>
            <Th>Tình trạng</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={5}>
                <Spinner />
              </Td>
            </Tr>
          )}
          {users?.map(user => (
            <UserItem
              key={user._id}
              user={user}
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
