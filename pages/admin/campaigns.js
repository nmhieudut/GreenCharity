import {
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import CampaignRow from 'src/components/admin/CampaignRow';
import { color } from 'src/constants/color';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

export default function Campaigns() {
  const toast = useToast();
  const router = useRouter();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { data, isLoading, isError, error } = useQuery('campaigns', () =>
    AdminService.getCampaigns()
  );
  const { campaigns } = data || [];

  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (id, data) => {
    setUpdating(true);
    try {
      await AdminService.updateCampaign(id, data);
      toast({
        title: 'Cập nhật thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
    setUpdating(false);
  };

  const handleActive = async id => {
    setUpdating(true);
    try {
      await AdminService.activeCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được phê duyệt',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    setUpdating(false);
  };

  const handleEnd = async id => {
    setUpdating(true);
    try {
      await AdminService.endCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được kết thúc',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    setUpdating(false);
  };

  const handleDelete = async id => {
    setUpdating(true);
    try {
      await AdminService.deleteCampaign(id);
      toast({
        title: 'Thành công',
        description: 'Hoạt động đã được xóa',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        title: 'Có lỗi xảy ra',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    setUpdating(false);
  };

  return (
    <AdminLayout>
      <Heading
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
        mb={4}
      >
        Quản lí các hoạt động
      </Heading>

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
              loading={updating}
              onUpdate={handleUpdate}
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
