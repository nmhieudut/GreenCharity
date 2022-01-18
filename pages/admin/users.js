import {
  Heading,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useQuery } from 'react-query';
import UserRow from 'src/components/admin/UserRow';
import Button from 'src/components/common/Button';
import CustomDrawer from 'src/components/common/CustomDrawer';
import UserForm from 'src/components/core/Form/UserForm';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

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
        py={2}
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
            <UserRow
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
