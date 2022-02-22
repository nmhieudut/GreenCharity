import { Badge, Image, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { toVND } from 'src/utils/number';
import { fromActionToString } from 'src/utils/status';

export default function TransactionRow({ transaction }) {
  const { orderId, method, amount, action, createdAt, author, _id } =
    transaction;
  return (
    <Tr>
      <Td>{_id}</Td>
      <Td>{author.email}</Td>
      <Td>
        <Image
          src={
            method === 'Momo'
              ? '/images/retangle-momo.png'
              : '/images/vnpay.png'
          }
          alt=''
          w={30}
        />
      </Td>
      <Td>{format(new Date(createdAt), 'dd/MM/yyyy')}</Td>
      <Td>
        <Badge colorScheme={action === 'donate' ? 'green' : 'blue'}>
          {fromActionToString(action)}
        </Badge>
      </Td>
      <Td>{toVND(amount)}</Td>
      <Td>
        <Badge colorScheme='green'>Thành công</Badge>
      </Td>
    </Tr>
  );
}
