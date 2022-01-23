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
import CampaignRow from 'src/components/admin/CampaignRow';
import Button from 'src/components/common/Button';
import { CampaignForm } from 'src/components/core/Form/CampaignForm';
import CustomDrawer from 'src/components/common/CustomDrawer';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function Campaigns() {
  const toast = useToast();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { data, isLoading, isError, error } = useQuery(
    ['campaigns', refresh],
    () => AdminService.getCampaigns()
  );
  const { campaigns } = data || [];
  const [refresh, setRefresh] = useState(0);

  const handleRenewal = async (id, days) => {
    try {
      await AdminService.renewalCampaign(id, { addedDays: days });
      toast({
        title: 'Gia hạn thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      setRefresh(refresh + 1);
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const handleActive = async id => {
    try {
      await AdminService.activeCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được phê duyệt',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      setRefresh(refresh + 1);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleEnd = async id => {
    try {
      await AdminService.endCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được kết thúc',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      setRefresh(refresh + 1);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleDelete = async id => {
    try {
      await AdminService.deleteCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được xóa',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      setRefresh(refresh + 1);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
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
        p={8}
        bg={bg}
      >
        <Heading
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Quản lí các hoạt động
        </Heading>
        <CustomDrawer
          size='lg'
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
          drawerBody={<CampaignForm />}
        ></CustomDrawer>
      </Stack>

      <Table shadow='xl' rounded='md' overflow='hidden'>
        <Thead bg={bg}>
          <Tr>
            <Th>Tên hoạt động</Th>
            <Th>Người tạo</Th>
            <Th>Ngày tạo</Th>
            <Th>Ngày kết thúc</Th>
            <Th>Mục tiêu (VND)</Th>
            <Th>Đạt được (VND)</Th>
            <Th>Trạng thái</Th>
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
          {campaigns?.map(campaign => (
            <CampaignRow
              key={campaign._id}
              campaign={campaign}
              onRenewal={handleRenewal}
              onActive={handleActive}
              onEnd={handleEnd}
              onDelete={handleDelete}
            />
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
}
export default withAdmin(Campaigns);
