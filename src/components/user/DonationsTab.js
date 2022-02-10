import {
  Box,
  Stack,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import Loading from 'src/components/common/Spinner/Loading';
import { UserService } from 'src/services/user';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';

export default function DonateTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery('donations', () =>
    UserService.getDonationsHistory(user.id)
  );
  const { donations } = data || {};
  console.log(donations);
  return (
    <>
      <Head>
        <title>Lịch sử quyên góp</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box py={4} w='full'>
        {isLoading && <Loading />}
        {data && (
          <Table colorScheme='purple'>
            <Thead>
              <Tr>
                <Th>Tên hoạt động</Th>
                <Th isNumeric>Số tiền đã quyên góp (VND)</Th>
                <Th>Ngày quyên góp</Th>
                <Th>Lời nhắn </Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody fontSize='sm'>
              {donations?.map(donation => (
                <Tr key={donation._id}>
                  <Td>{donation.campaignInfo.name}</Td>
                  <Td isNumeric>{toVND(donation.amount)}</Td>
                  <Td>{DateUtils.toDate(donation.createdAt)}</Td>
                  <Td>{donation.message}</Td>
                  <Td>
                    <Stack direction='row' spacing={4}>
                      <Button
                        leftIcon={<AiOutlineEye />}
                        colorScheme='pink'
                        variant='solid'
                        onClick={() =>
                          router.push(
                            `/hoat-dong/${donation.campaignInfo.slug}`
                          )
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
                <Th isNumeric>
                  {toVND(
                    donations?.reduce(
                      (total, currentVal) => total + currentVal.amount,
                      0
                    )
                  )}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Box>
    </>
  );
}
