import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { MdBuild } from 'react-icons/md';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import withAuth from 'src/HOCs/withAuth';
import MeLayout from 'src/layout/MeLayout';
import { UserService } from 'src/services/user';
import { VNDFormatter } from 'src/utils/number';

function DonateHistory({ user }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery('donations', () =>
    UserService.getDonationsHistory(user.id)
  );
  const { donations } = data || {};
  console.log(donations);

  return (
    <MeLayout>
      <Box py={4} pl={4} w='full'>
        <Heading fontSize='3xl' fontWeight='bold' mb={4}>
          Lịch sử quyên góp
        </Heading>
        <Table colorScheme='purple'>
          <Thead>
            <Tr>
              <Th>Tên hoạt động</Th>
              <Th>Hình ảnh</Th>
              <Th isNumeric>Số tiền đã quyên góp (VND)</Th>
              <Th>Ngày quyên góp</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody fontSize='sm'>
            {donations?.map(donation => (
              <Tr key={donation._id}>
                <Td>{donation.campaignInfo.name}</Td>
                <Td>
                  <Image
                    src={donation.campaignInfo.images[0]}
                    alt='hinh anh'
                    w='10'
                  />
                </Td>
                <Td isNumeric>{VNDFormatter(donation.amount)}</Td>
                <Td>{format(new Date(donation.createdAt), 'dd/mm/yyyy')}</Td>
                <Td>
                  <Stack direction='row' spacing={4}>
                    <Button
                      leftIcon={<AiOutlineEye />}
                      colorScheme='pink'
                      variant='solid'
                      onClick={() =>
                        router.push(`/campaigns/${donation.campaignInfo.slug}`)
                      }
                    >
                      Xem
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Tổng sô tiền</Th>
              <Th></Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </MeLayout>
  );
}
export default withAuth(DonateHistory);
