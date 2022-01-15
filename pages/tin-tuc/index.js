import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import CampaignItemSkeleton from 'src/components/core/Campaign/CampaignItemSkeleton';
import NewsItem from 'src/components/core/Card/NewsItem';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { newsService } from 'src/services/news';

export default function News() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // const { data, isLoading, isError, error } = useQuery('news', () =>
  //   newsService.fetchAll()
  // );
  // const { news } = data || [];
  async function fetchNews() {
    setNews([]);
    setLoading(true);
    setPage(0);
    try {
      const { news } = await newsService.fetchAll(5, page);
      return setNews(news);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMore() {
    setLoading(true);
    try {
      const data = await newsService.fetchAll(5, page);
      if (data.news.length === 0) {
        setHasMore(false);
        return;
      }
      return setNews([...news].concat(data.news));
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    fetchMore();
  }, [page]);

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
        <InfiniteScroll
          dataLength={news.length}
          next={() => setPage(page + 1)}
          loader={Array.from({ length: 3 }, (_, i) => (
            <CampaignItemSkeleton key={i} />
          ))}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Không còn tin tức nào</b>
            </p>
          }
        >
          {news?.map((item, index) => (
            <NewsItem key={index} data={item} />
          ))}
        </InfiniteScroll>

        {loading &&
          Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton key={i} />)}
      </Box>
    </SectionContainer>
  );
}
