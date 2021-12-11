import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
import { FcConferenceCall, FcDonate } from 'react-icons/fc';
import { color } from 'src/constants/color';
import { CampaignService } from 'src/services/campaign';
import Button from 'src/components/common/Button';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import Loading from 'src/components/common/Spinner/Loading';

const SectionContainer = dynamic(() =>
  import('src/components/common/SectionContainer')
);
const CampaignCard = dynamic(() =>
  import('src/components/common/Campaign/CampaignCard')
);

export default function Home({
  total_campaigns,
  total_amount_donations,
  total_donors
}) {
  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const { data, isLoading, isError, error } = useQuery('campaigns', () =>
    CampaignService.fetchCampaignsByStatus('active')
  );
  const { campaigns } = data || {};

  return (
    <>
      <Head>
        <title>Trang chủ - Green Charity</title>
        <meta
          name='description'
          content='Green Charity là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng
              triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.'
        />
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <SectionContainer
        minH='100vh'
        pos='relative'
        hasParticle
        overflow={'hidden'}
        background='none'
      >
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 6 }}>
            <Heading
              color={color.PRIMARY}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight={'bold'}
            >
              <Text as={'span'} color={'green.400'}>
                Green
              </Text>
              <Text as={'span'} color={color.PRIMARY}>
                Charity
              </Text>
            </Heading>
            <Text fontSize={'md'}>
              <Text as={'span'} color={'green.400'}>
                Green
              </Text>
              <Text as={'span'} color={color.PRIMARY}>
                Charity
              </Text>{' '}
              là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng
              triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.
            </Text>
            <Flex justify='space-between' alignItems='center'>
              <Box>
                <Box color={color.PRIMARY} fontWeight={600}>
                  <CountUp end={total_campaigns} duration={3} />
                </Box>
                <Text>Hoạt động</Text>
              </Box>
              <Box>
                <Box color={color.PRIMARY} fontWeight={600}>
                  <CountUp separator=',' end={total_donors} duration={3} />
                </Box>
                <Text>Lượt quyên góp</Text>
              </Box>
              <Box>
                <Box color={color.PRIMARY} fontWeight={600}>
                  <CountUp
                    separator=','
                    end={total_amount_donations}
                    duration={3}
                  />
                </Box>
                <Text>Đồng được quyên góp</Text>
              </Box>
            </Flex>
            <Stack spacing={6} direction={['column', 'row']}>
              <Link passHref href='/#current-campaigns'>
                <Button
                  size='md'
                  rounded={'full'}
                  px={6}
                  colorScheme={'purple'}
                  bg={color.PRIMARY}
                >
                  Tìm hiểu
                </Button>
              </Link>

              <Link passHref href='/#get-started'>
                <Button
                  nolinear='true'
                  size='md'
                  colorScheme={'purple'}
                  rounded={'full'}
                  px={6}
                  variant='outline'
                >
                  Bắt đầu ngay
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Image src='/images/hero.png' alt='hero' w='full' />
          </Flex>
        </Stack>
      </SectionContainer>
      <SectionContainer id='get-started' hasBg>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Tích đức không khó, làm việc tốt thì càng dễ hơn
        </Heading>

        <Grid
          my={12}
          mx='auto'
          maxW={'3xl'}
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(1, 1fr)',
            'repeat(2, 1fr)'
          ]}
        >
          <Flex
            direction='column'
            className='border-2'
            bg={bg}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            m={4}
          >
            <Box
              p={6}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}
              flex={1}
            >
              <FcConferenceCall size='3rem' />
              <Text pt={4} fontWeight={600} fontSize={'md'}>
                TÔI MUỐN THÔNG TIN TỚI CÁC NHÀ HẢO TÂM
              </Text>
            </Box>
            <Box px={6} pb={6} pt={'auto'}>
              <Text fontSize={'sm'}>
                Bạn gặp vài hoàn cảnh khó khăn mà không thể kêu gọi. Hãy thông
                tin đến chúng tôi ngay
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/new-campaign')}
              >
                Vận động ngay
              </Button>
            </Box>
          </Flex>
          <Flex
            direction='column'
            className='border-2'
            bg={bg}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            m={4}
          >
            <Box
              p={6}
              flex={1}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}
            >
              <FcDonate size='3rem' />
              <Text pt={4} fontWeight={600} fontSize={'md'}>
                TÔI LÀ NHÀ HẢO TÂM
              </Text>
            </Box>
            <Box px={6} pb={6} mt='auto'>
              <Text fontSize={'sm'}>
                Chỉ với vài thao tác đơn giản, bạn đã góp phần giúp đỡ 1 hoàn
                cảnh khó khăn có cuộc sống tốt đẹp hơn.
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/campaigns')}
              >
                Ủng hộ ngay
              </Button>
            </Box>
          </Flex>
        </Grid>
      </SectionContainer>
      <SectionContainer id='current-campaigns'>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Các hoạt động đang diễn ra 🔥
        </Heading>
        <Box className='flex flex-wrap mt-14 mb-10'>
          {isLoading && <Loading />}
          {campaigns?.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </Box>
        <Flex justify='center'>
          <Button
            nolinear='true'
            size='md'
            px={4}
            variant='outline'
            colorScheme={'purple'}
            onClick={() => router.push('/campaigns')}
          >
            Xem thêm
          </Button>
        </Flex>
      </SectionContainer>
      <SectionContainer hasBg>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Người người làm từ thiện, nhà nhà làm từ thiện
        </Heading>
        <Flex
          mt={14}
          overflow={'hidden'}
          w={'full'}
          flexWrap='wrap'
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Flex
            w={{ base: 'full', md: '50%' }}
            flexDir='column'
            bg={color.PRIMARY}
            p={8}
            color={'#fff'}
            h={96}
          >
            <Heading fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}>
              Cùng với những người nổi tiếng
            </Heading>
            <Text>
              Nhiều gương mặt đại diện đã đứng ra kêu gọi từ thiện, tiêu biểu là
              những ca sĩ, nghệ sĩ trong những năm gần đây.
            </Text>
          </Flex>
          <Box
            w={{ base: 'full', md: '50%' }}
            className='animate__item h-96'
            data-displacement='img/displacement/8.jpg'
          >
            <div className='animate__item-content'>
              <h3 className='animate__item-subtitle'>
                <Heading fontSize='md'>Ông Đàm Vĩnh Biệt</Heading>
                <span>Anh sẽ vì em làm cha thèn bé</span>
              </h3>
              <h3 className='animate__item-subtitle'>
                <Heading fontSize='md'>Bà Lê Thị Thủy Tề</Heading>
                <span>Em làm từ thiện từ năm 10 tuổi</span>
              </h3>
            </div>
          </Box>
        </Flex>
      </SectionContainer>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const { total_campaigns, total_amount_donations, total_donors } =
      await CampaignService.fetchSummary();
    return {
      props: {
        total_campaigns,
        total_amount_donations,
        total_donors
      }
    };
  } catch (e) {
    return {
      props: {
        total_campaigns: 0,
        total_amount_donations: 0,
        total_donors: 0
      }
    };
  }
};
