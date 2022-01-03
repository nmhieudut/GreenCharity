import {
  Box,
  chakra,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
import { AiOutlineTransaction } from 'react-icons/ai';
import { FaDonate } from 'react-icons/fa';
import { FcConferenceCall, FcDonate, FcOnlineSupport } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import { CampaignService } from 'src/services/campaign';

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
  const user = useSelector(state => state.auth.currentUser);
  const { campaigns } = data || {};

  const Feature = props => {
    return (
      <Box>
        <Flex
          alignItems='center'
          justifyContent='center'
          w={8}
          h={8}
          mb={4}
          rounded='full'
          color={useColorModeValue(`${props.color}.600`, `${props.color}.100`)}
          bg={useColorModeValue(`${props.color}.100`, `${props.color}.600`)}
        >
          {props.icon}
        </Flex>
        <chakra.h3
          mb={2}
          fontWeight='semibold'
          lineHeight='shorter'
          color={useColorModeValue('gray.900')}
        >
          {props.title}
        </chakra.h3>
        <chakra.p
          fontSize='sm'
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {props.children}
        </chakra.p>
      </Box>
    );
  };

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
        noContainer
        height='100vh'
        pos='relative'
        overflow={'hidden'}
        background='none'
      >
        <Box
          w='full'
          h='container.sm'
          background="url('/images/tuthienhero.jpg') no-repeat"
          bgPos='center'
          bgSize='cover'
        >
          <Flex
            align='center'
            pos='relative'
            justify='center'
            boxSize='full'
            bg='blackAlpha.700'
          >
            <Stack textAlign='center' alignItems='center' spacing={6}>
              <Box
                w='full'
                textAlign={{ sm: 'center', lg: 'left' }}
                justifyContent='center'
                alignItems='center'
              >
                <chakra.h1
                  fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
                  letterSpacing='tight'
                  lineHeight='short'
                  fontWeight='extrabold'
                  color={useColorModeValue('gray.900', 'white')}
                >
                  <chakra.span
                    display={{ base: 'block', md: 'inline' }}
                    color={'green.400'}
                  >
                    Green
                  </chakra.span>
                  <chakra.span
                    display={{ base: 'block', md: 'inline' }}
                    color={color.PRIMARY}
                  >
                    Charity
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  fontSize={{ sm: 'lg', md: 'xl' }}
                  maxW={{ sm: 'xl' }}
                  mx={{ sm: 'auto', lg: 0 }}
                  color='gray.100'
                >
                  Là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng
                  hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả
                  nước.
                </chakra.p>
                <Flex
                  justify='space-between'
                  alignItems='center'
                  mt={{ base: 3, sm: 5, md: 5 }}
                >
                  <Box>
                    <Box color={color.PRIMARY} fontWeight={600}>
                      <CountUp end={total_campaigns} duration={3} />
                    </Box>
                    <Text color={'white'}>Hoạt động</Text>
                  </Box>
                  <Box>
                    <Box color={color.PRIMARY} fontWeight={600}>
                      <CountUp separator=',' end={total_donors} duration={3} />
                    </Box>
                    <Text color={'white'}>Lượt quyên góp</Text>
                  </Box>
                  <Box>
                    <Box color={color.PRIMARY} fontWeight={600}>
                      <CountUp
                        separator=','
                        end={total_amount_donations}
                        duration={3}
                      />
                    </Box>
                    <Text color={'white'}>Đồng được quyên góp</Text>
                  </Box>
                </Flex>
                <Box
                  mt={{ base: 5, sm: 8 }}
                  display={{ sm: 'flex' }}
                  justifyContent={{ sm: 'center', lg: 'start' }}
                  fontWeight='extrabold'
                  fontFamily='fantasy'
                >
                  <Link passHref href='/#current-campaigns'>
                    <Button
                      w={'full'}
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
                      w={'full'}
                      ml={[0, 4]}
                      noLinear
                      size='md'
                      colorScheme={'purple'}
                      rounded={'full'}
                      px={6}
                      variant='outline'
                    >
                      Bắt đầu ngay
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </SectionContainer>
      <SectionContainer>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
          <Flex>
            <Image
              src='http://imgs.vietnamnet.vn/Images/2016/06/08/11/20160608105845-tuthien1.jpg'
              alt=''
              fit='cover'
              w='full'
              h={{ base: 64, md: 'full' }}
              loading='lazy'
            />
          </Flex>
          <Flex
            direction='column'
            alignItems='start'
            justifyContent='center'
            px={{ base: 4, md: 8, lg: 20 }}
            py={24}
            zIndex={3}
          >
            <chakra.h1
              mb={4}
              fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
              fontWeight='bold'
              color={useColorModeValue('brand.600', 'gray.300')}
              lineHeight='shorter'
              textShadow='2px 0 currentcolor'
            >
              Chúng tôi ở đây để giúp đỡ
            </chakra.h1>
            <chakra.p
              pr={{ base: 0, lg: 16 }}
              mb={4}
              fontSize='lg'
              color={useColorModeValue('brand.600', 'gray.400')}
              letterSpacing='wider'
            >
              Là nền tảng #1 giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng
              triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.
            </chakra.p>
            {!user && (
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                rightIcon={<FiExternalLink />}
                onClick={() => router.push('/auth')}
              >
                Tham gia ngay
              </Button>
            )}
          </Flex>
        </SimpleGrid>
      </SectionContainer>
      <SectionContainer hasBg>
        <Flex w='auto' justifyContent='center' alignItems='center'>
          <Box px={8} py={20} mx='auto'>
            <Heading
              textAlign='center'
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
              lineHeight={'110%'}
              color={color.PRIMARY}
              mb={14}
            >
              Vì sao lại chọn Green Charity?
            </Heading>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacingX={{ base: 16, lg: 24 }}
              spacingY={20}
              mt={6}
            >
              <Feature
                color='yellow'
                title='Thao tác nhanh, dễ sử dụng'
                icon={<GiClick />}
              >
                Dễ dàng kêu gọi, quyên góp chỉ với vài thao tác cơ bản.
              </Feature>

              <Feature
                color='pink'
                title='Bạn có thể quyên góp cho nhiều người'
                icon={<FaDonate />}
              >
                Bạn có thể quyên góp cho nhiều người, nhưng chỉ cần chọn một
                người để quyên góp. Và nếu bạn không thể chọn được người để
                quyên góp, bạn có thể quyên góp cho chính mình.
              </Feature>

              <Feature
                color='green'
                title='Quyên góp trực tuyến'
                icon={<AiOutlineTransaction />}
              >
                Bạn không thể quyên góp trực tiếp cho người kêu gọi ? Đừng lo
                bạn có thể quyên góp thông qua nạp tiền vào số dư của bạn và
                quyên góp.
              </Feature>
              <Feature
                color='blue'
                title='Đội ngũ hỗ trợ nhiệt tình'
                icon={<FcOnlineSupport />}
              >
                Đội ngũ hỗ trợ nhiệt tình và chuyên nghiệp sẽ giúp bạn đạt được
                mục tiêu của bạn. Bạn có thể liên hệ với chúng tôi qua số điện
                thoại, email hoặc thông qua Facebook messenger trên màn hình.
                Chúng tôi sẽ phản hồi bạn trong vòng nhiều nhất 24h kể từ khi
                nhận được yêu cầu.
              </Feature>
            </SimpleGrid>
          </Box>
        </Flex>
      </SectionContainer>
      <SectionContainer id='get-started'>
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
                onClick={() => router.push('/campaigns/create')}
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
      <SectionContainer id='current-campaigns' hasBg>
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
            noLinear='true'
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
      <SectionContainer>
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
