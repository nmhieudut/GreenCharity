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
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { useQuery } from 'react-query';
import AuctionRow from 'src/components/admin/AuctionRow';
import Button from 'src/components/common/Button';
import CustomDrawer from 'src/components/common/CustomDrawer';
import AuctionForm from 'src/components/core/Form/AuctionForm';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function Auctions() {
  const toast = useToast();
  const { data, isLoading, isError } = useQuery('auctions', () =>
    AdminService.getAuctions()
  );
  const { auctions } = data || {};

  const bg = useColorModeValue('gray.100', 'gray.800');
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
          Quản lí các phiên đấu giá
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
          drawerHeader='Tạo'
          drawerBody={<AuctionForm />}
        ></CustomDrawer>
      </Stack>
      <Table shadow='xl' rounded='md' overflow='hidden'>
        <Thead bg={bg}>
          <Tr>
            <Th>Tên sản phẩm</Th>
            <Th>Người bán</Th>
            <Th>Kết thúc trong</Th>
            <Th>Giá khởi điểm</Th>
            <Th>Hiện tại</Th>
            <Th>Trạng thái</Th>
            <Th>Kết quả</Th>
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
          {auctions?.map(auction => (
            <AuctionRow key={auction._id} auction={auction} />
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
}
export default withAdmin(Auctions);
