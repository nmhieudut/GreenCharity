import { Box, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useQuery } from 'react-query';
import CampaignItemSkeleton from 'src/components/common/core/Campaign/CampaignItemSkeleton';
import NewsItem from 'src/components/common/core/Card/NewsItem';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { newsService } from 'src/services/news';

export default function News() {
  const { data, isLoading, isError, error } = useQuery('news', () =>
    newsService.fetchAll()
  );
  const { news } = data || [];
  return (
    <SectionContainer hasBg>
      <Head>
        <title>Tin tức</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>

      <Heading
        textAlign='center'
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
        mb={14}
      >
        Tin tức về từ thiện mới nhất
      </Heading>

      <Box>
        {isLoading &&
          Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton key={i} />)}
        {news?.map((item, index) => (
          <NewsItem key={index} data={item} />
        ))}
      </Box>
    </SectionContainer>
  );
}
