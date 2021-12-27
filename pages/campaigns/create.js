import Head from 'next/head';
import React from 'react';
import { CampaignForm } from 'src/components/common/Campaign/CampaignForm';
import withAuth from 'src/HOCs/withAuth';

function CreateCampaign() {
  return (
    <>
      <Head>
        <title>Tạo hoạt động mới</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <CampaignForm />
    </>
  );
}
export default withAuth(CreateCampaign);
