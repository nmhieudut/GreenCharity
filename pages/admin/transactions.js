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
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import TransactionRow from 'src/components/admin/TransactionRow';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function Transactions() {
  const { data, isLoading, isError } = useQuery('transactions', () =>
    AdminService.getTransactions()
  );
  const { transactions } = data || {};

  const bg = useColorModeValue('gray.100', 'gray.800');

  return (
    <AdminLayout>
      <Stack
        direction={['column', 'row']}
        spacing={4}
        align='center'
        mb={4}
        p={8}
        bg={bg}
      >
        <Heading
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Các giao dịch hệ thống
        </Heading>
      </Stack>
      <Table
        variant='striped'
        colorScheme='gray'
        shadow='xl'
        rounded='md'
        overflow='hidden'
        size='sm'
      >
        <Thead bg={bg}>
          <Tr>
            <Th>Mã giao dịch</Th>
            <Th>Tài khoản</Th>
            <Th>Phương thức</Th>
            <Th>Ngày giao dịch</Th>
            <Th>Kiểu giao dịch</Th>
            <Th>Số tiền</Th>
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
          {transactions?.map(transaction => (
            <TransactionRow key={transaction._id} transaction={transaction} />
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
}
export default withAdmin(Transactions);
