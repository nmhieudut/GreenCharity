import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';

function ERTable({ disbursements }) {
  return (
    <Table variant='simple' size='small'>
      <TableCaption>Quỹ tiền tài trợ</TableCaption>
      <Thead>
        <Tr>
          <Th>Ngày</Th>
          <Th>Diễn giải</Th>
          <Th>Thu</Th>
          <Th>Chi</Th>
          <Th>Tồn</Th>
        </Tr>
      </Thead>
      <Tbody>
        {disbursements?.map(
          ({ createdAt, message, amount, action, lastBalance, _id }) => (
            <Tr key={_id} bg={action === 'expenditures' && 'lightgray'}>
              <Td>{DateUtils.toDate(createdAt)}</Td>
              <Td>{message}</Td>
              <Td>{action === 'receipts' && toVND(amount)}</Td>
              <Td>{action === 'expenditures' && toVND(amount)}</Td>
              <Td>{toVND(lastBalance)}</Td>
            </Tr>
          )
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Tổng</Th>
          <Th></Th>
          <Th>
            {toVND(
              disbursements
                ?.filter(({ action }) => action === 'receipts')
                .reduce((sum, item) => sum + parseInt(item.amount), 0)
            )}
          </Th>
          <Th>
            {toVND(
              disbursements
                ?.filter(({ action }) => action === 'expenditures')
                .reduce((sum, item) => sum + parseInt(item.amount), 0)
            )}
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
export default ERTable;
