import { Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { CampaignForm } from 'src/components/core/Campaign/CampaignForm';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import withAuth from 'src/HOCs/withAuth';

function CreateCampaign() {
  return (
    <>
      <Head>
        <title>Tạo hoạt động mới</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <SectionContainer>
        <Heading
          textAlign='center'
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Tạo hoạt động từ thiện mới
        </Heading>
        <Text my={2} textAlign={'center'} fontSize={'lg'} color={'gray.500'}>
          Điền vào form dưới để tạo 1 hoạt động mới
        </Text>
        <CampaignForm />
      </SectionContainer>
    </>
  );
}
export default withAuth(CreateCampaign);
