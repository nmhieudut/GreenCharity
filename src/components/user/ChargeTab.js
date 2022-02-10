import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import ChargeItem from 'src/components/common/ChargeItem';
import Loading from 'src/components/common/Spinner/Loading';
import { UserService } from 'src/services/user';

export default function ChargeTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery('transactions', () =>
    UserService.getTransactions(user.id)
  );
  const { histories } = data || {};
  return (
    <>
      <Head>
        <title>Lịch sử giao dịch</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box my='4' w='full'>
        {isLoading && <Loading />}
        {histories?.map((history, idx) => (
          <ChargeItem key={history._id} history={history} idx={idx} />
        ))}
      </Box>
    </>
  );
}
