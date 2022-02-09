import Head from 'next/head';
import React from 'react';
import SectionContainer from 'src/components/common/SectionContainer';
import AuctionForm from 'src/components/core/Form/AuctionForm';
import withAuth from 'src/HOCs/withAuth';

function Create() {
  return (
    <SectionContainer>
      <Head>
        <title>Tạo mới đấu giá</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <AuctionForm />
    </SectionContainer>
  );
}

export default withAuth(Create);
