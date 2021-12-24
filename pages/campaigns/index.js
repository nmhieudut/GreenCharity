import {
  Box,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import CampaignItem from 'src/components/common/Campaign/CampaignItem';
import CampaignItemSkeleton from 'src/components/common/Campaign/CampaignItemSkeleton';
import Search from 'src/components/common/Search';
import SectionContainer from 'src/components/common/SectionContainer';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
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
      {/* <Box
        background="url('/images/tuthienlogin.jpeg') no-repeat"
        backgroundSize='cover'
      >
        <Center
          mx='auto'
          py={48}
          style={{ background: 'rgba(128,90,213,0.5)' }}
        >
          <Text
            textAlign='center'
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color='white'
            fontWeight='bold'
          >
            Tham gia cộng đồng Green Charity ngay hôm nay!
          </Text>
        </Center>
      </Box> */}
      <Box
        background="url('/images/tuthienlogin.jpeg') no-repeat"
        backgroundSize='cover'
      >
        <SectionContainer
          mt={12}
          style={{ background: 'rgba(128,90,213,0.5)' }}
        >
          <Heading className='text-center font-bold text-white text-4xl'>
            Tìm kiếm các hoạt động thiện nguyện ngay
            <p className='mx-auto font-normal text-sm my-6 max-w-lg'>
              Nhập tên hoạt động và chọn trạng thái của các hoạt động đó (đang
              diễn ra, kết thúc)
            </p>
            <Search hasOptions options={options} onSearch={handleSearch} />
          </Heading>
        </SectionContainer>
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

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const data = await CampaignService.fetchCampaigns(
          query,
          status,
          5,
          page
        );
        setCampaigns([...campaigns].concat(data.campaigns));
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, [query, status, page]);
  console.log('res', campaigns);
  return (
    <div>
      {error && <div>Có gì đó không ổn, thử lại sau</div>}
      {loading && Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton />)}
      {campaigns && (
        <Box>
          <Text as={'h6'}>Hiển thị {campaigns.length} kết quả</Text>
          <InfiniteScroll
            dataLength={campaigns.length} //This is important field to render the next data
            next={() => setPage(page + 1)}
            loader={<Loading />}
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
        </Box>
      )}
      {campaigns?.length === 0 && (
        <Flex justify='center' align='center'>
          Không có hoạt động tương ứng
        </Flex>
      )}
    </div>
  );
};
