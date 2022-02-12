import { Badge, Image, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { toVND } from 'src/utils/number';

export default function TransactionRow({ transaction }) {
  const { orderId, method, amount, action, createdAt, author } = transaction;
  return (
    <Tr>
      <Td>{orderId}</Td>
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
        <Badge colorScheme='green'>{action}</Badge>
      </Td>
      <Td>{toVND(amount)}</Td>
      <Td>
        <Badge colorScheme='green'>Thành công</Badge>
      </Td>
    </Tr>
  );
}
