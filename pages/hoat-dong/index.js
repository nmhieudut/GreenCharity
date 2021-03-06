import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CampaignItem from 'src/components/core/Campaign/CampaignItem';
import CampaignItemSkeleton from 'src/components/core/Campaign/CampaignItemSkeleton';
import Search from 'src/components/common/Search';
import SectionContainer from 'src/components/common/SectionContainer';
import { options } from 'src/constants/filter';
import { CampaignService } from 'src/services/campaign';

export default function Campaigns({ total, campaigns }) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('');
  const handleSearch = async (query, status) => {
    setQuery(query);
    setStatus(status);
  };
  return (
    <>
      <Head>
        <title>Các hoạt động</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box
        background="url('/images/tuthienlogin.jpeg') no-repeat"
        backgroundSize='cover'
      >
        <Box bg={'rgba(128,90,213,0.5)'}>
          <Center maxW='3xl' mx='auto' py={48} display='flex'>
            <Flex w='full' flexDirection='column' color='white'>
              <Heading className='text-center font-bold text-4xl'>
                Các hoạt động thiện nguyện
              </Heading>
              <p className='mx-auto font-normal text-sm my-6 max-w-lg'>
                Nhập tên hoạt động và chọn trạng thái của các hoạt động đó (đang
                diễn ra, kết thúc)
              </p>
              <Search hasOptions options={options} onSearch={handleSearch} />
            </Flex>
          </Center>
        </Box>
      </Box>
      <SectionContainer>
        <CampaignsList query={query} status={status} />
      </SectionContainer>
    </>
  );
}

const CampaignsList = ({ query, status }) => {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchCampaigns() {
    setCampaigns([]);
    setLoading(true);
    setPage(0);
    try {
      const data = await CampaignService.fetchCampaigns(query, status, 5, page);
      return setCampaigns(data.campaigns);
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
      const data = await CampaignService.fetchCampaigns(query, status, 5, page);
      if (data.campaigns.length === 0) {
        return setHasMore(false);
      }
      return setCampaigns([...campaigns].concat(data.campaigns));
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCampaigns();
  }, [query, status]);

  useEffect(() => {
    fetchMore();
  }, [page]);

  return (
    <div>
      {error && <div>Có gì đó không ổn, thử lại sau</div>}
      {loading &&
        Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton key={i} />)}
      {campaigns && (
        <>
          <Text as={'h6'}>Hiển thị {campaigns.length} kết quả</Text>
          <InfiniteScroll
            dataLength={campaigns.length}
            next={() => setPage(page + 1)}
            loader={Array.from({ length: 3 }, (_, i) => (
              <CampaignItemSkeleton />
            ))}
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Không còn hoạt động nào</b>
              </p>
            }
          >
            <Box py={6}>
              {campaigns.map(campaign => (
                <CampaignItem key={campaign._id} data={campaign} />
              ))}
            </Box>
          </InfiniteScroll>
        </>
      )}
      {campaigns?.length === 0 && (
        <Flex justify='center' align='center'>
          Không có hoạt động tương ứng
        </Flex>
      )}
    </div>
  );
};
