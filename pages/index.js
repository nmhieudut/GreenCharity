import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail
} from 'react-icons/md';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
import { AiFillDollarCircle, AiOutlineTransaction } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { FaDonate } from 'react-icons/fa';
import { FcConferenceCall, FcDonate, FcOnlineSupport } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { MdOutlineCampaign } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import TitleLines from 'src/components/common/TitleLines';
import CardSkeleton from 'src/components/core/Card/CardSkeleton';
import NewsCard from 'src/components/core/Card/NewsCard';
import { color } from 'src/constants/color';
import { partners } from 'src/constants/partner';
import { qa } from 'src/constants/qa';
import { CampaignService } from 'src/services/campaign';
import { newsService } from 'src/services/news';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

const SectionContainer = dynamic(() =>
  import('src/components/common/SectionContainer')
);
const CampaignCard = dynamic(() =>
  import('src/components/core/Card/CampaignCard')
);

export default function Home({
  total_campaigns,
  total_amount_donations,
  total_donors
}) {
  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const { data, isLoading } = useQuery('campaigns', () =>
    CampaignService.fetchCampaignsByStatus('active')
  );
  const { data: newsData, isLoading: newsLoading } = useQuery('news', () =>
    newsService.fetchAll(4, 0)
  );
  const user = useSelector(state => state.auth.currentUser);
  const { campaigns } = data || {};
  const { news } = newsData || [];

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
        p='0'
        noContainer
        height='100vh'
        pos='relative'
        overflow={'hidden'}
        background='none'
      >
        <Box
          w='full'
          h='100vh'
          background="url('/images/tuthienhero.jpg') no-repeat"
          bgPos='center'
          bgSize='cover'
        />
      </SectionContainer>
      <SectionContainer hasParticle>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
          <Flex
            data-aos='fade-right'
            direction='column'
            alignItems='start'
            justifyContent='center'
            px={{ base: 4, md: 8, lg: 20 }}
            py={24}
            zIndex={3}
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
                >
                  Là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng
                  hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả
                  nước.
                </chakra.p>
                <Stack
                  spacing={6}
                  mt={{ base: 5, sm: 8 }}
                  direction={{ base: 'column', md: 'row' }}
                  fontWeight='extrabold'
                >
                  <Link passHref href='/#current-campaigns'>
                    <Button
                      w={'full'}
                      size='md'
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
                      px={6}
                      variant='outline'
                    >
                      Bắt đầu ngay
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </Stack>

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
          <Image
            data-aos='fade-left'
            src='http://imgs.vietnamnet.vn/Images/2016/06/08/11/20160608105845-tuthien1.jpg'
            alt=''
            fit='cover'
            w='full'
            h={{ base: 64, md: 'full' }}
            loading='lazy'
          />
        </SimpleGrid>
      </SectionContainer>
      <SectionContainer boxShadow='2xl'>
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)'
          ]}
          gap={4}
          w='full'
          h='full'
          px={4}
          textAlign='center'
        >
          <Flex justify='center'>
            <Box bg={'yellow.100'} rounded={'full'} p={2}>
              <MdOutlineCampaign className='w-full h-full' color='purple' />
            </Box>
            <Flex direction='column' ml={4} align='flex-start'>
              <Box color={color.PRIMARY} fontWeight={600} fontSize='3xl'>
                <CountUp end={total_campaigns} duration={3} />
              </Box>
              <Text color='gray.400'>Hoạt động</Text>
            </Flex>
          </Flex>
          <Flex justify='center'>
            <Box bg={'red.100'} rounded={'full'} p={2}>
              <BiDonateHeart className='w-full h-full' color='red' />
            </Box>
            <Flex direction='column' ml={4} align='flex-start'>
              <Box color={color.PRIMARY} fontWeight={600} fontSize='3xl'>
                <CountUp separator=',' end={total_donors} duration={3} />
              </Box>
              <Text color='gray.400'>Lượt quyên góp</Text>
            </Flex>
          </Flex>
          <Flex justify='center'>
            <Box bg={'green.100'} rounded={'full'} p={2}>
              <AiFillDollarCircle className='w-full h-full' color='green' />
            </Box>
            <Flex direction='column' ml={4} align='flex-start'>
              <Box color={color.PRIMARY} fontWeight={600} fontSize='3xl'>
                <CountUp
                  separator=','
                  end={total_amount_donations}
                  duration={3}
                />
              </Box>
              <Text color='gray.400'>Đồng quyên góp</Text>
            </Flex>
          </Flex>
        </Grid>
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

        <TitleLines />
        <Grid
          my={12}
          mx='auto'
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)'
          ]}
        >
          <Flex
            data-aos='fade-up'
            data-aos-delay='200'
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
                onClick={() => router.push('/hoat-dong/tao-moi')}
              >
                Vận động ngay
              </Button>
            </Box>
          </Flex>
          <Flex
            data-aos='fade-up'
            data-aos-delay='300'
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
                onClick={() => router.push('/hoat-dong')}
              >
                Ủng hộ ngay
              </Button>
            </Box>
          </Flex>
          <Flex
            data-aos='fade-up'
            data-aos-delay='400'
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
              <RiAuctionFill size='3rem' color='orange' />
              <Text pt={4} fontWeight={600} fontSize={'md'}>
                TÔI MUỐN MỞ PHIÊN ĐẤU GIÁ
              </Text>
            </Box>
            <Box px={6} pb={6} mt='auto'>
              <Text fontSize={'sm'}>
                Nếu bạn đang sở hữu 1 món đồ hay 1 thứ gì đó và đang cần một nơi
                để đấu giá món đồ đó cho hoạt động bạn đang kêu gọi, bạn có thể
                tạo một phiên đấu giá ngay tại đây.
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/dau-gia/tao-moi')}
              >
                Mở ngay
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
        <TitleLines />
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)'
          ]}
          gap={2}
          className='mt-14 mb-10'
        >
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          {campaigns?.map((campaign, index) => (
            <CampaignCard
              data-aos='zoom-in'
              data-aos-delay={100 * index}
              key={index}
              campaign={campaign}
            />
          ))}
        </Grid>
        <Flex justify='center'>
          <Button
            noLinear='true'
            size='md'
            px={4}
            variant='outline'
            colorScheme={'purple'}
            onClick={() => router.push('/hoat-dong')}
          >
            Xem thêm
          </Button>
        </Flex>
      </SectionContainer>
      <SectionContainer hasBg>
        <Flex w='auto' justifyContent='center' alignItems='center'>
          <Box px={8} mx='auto'>
            <Heading
              textAlign='center'
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
              lineHeight={'110%'}
              color={color.PRIMARY}
            >
              Vì sao nên chọn{' '}
              <chakra.span
                display={{ base: 'block', md: 'inline' }}
                color={'green.400'}
              >
                Green{' '}
              </chakra.span>
              <chakra.span
                display={{ base: 'block', md: 'inline' }}
                color={color.PRIMARY}
              >
                Charity
              </chakra.span>
              ?
            </Heading>
            <TitleLines />
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacingX={{ base: 12, lg: 20 }}
              spacingY={20}
              mt={14}
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
                title='Đấu giá từ thiện trực tiếp'
                icon={<AiOutlineTransaction />}
              >
                Đấu giá trực tiếp với những người khác, không cần phải chờ đợi
                người khác đấu giá.
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
      <SectionContainer>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Người người làm từ thiện, nhà nhà làm từ thiện
        </Heading>
        <TitleLines />
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
            <Text mt={4}>
              Nhiều gương mặt đại diện đã đứng ra kêu gọi từ thiện, tiêu biểu là
              những ca sĩ, nghệ sĩ, gừng sĩ trong những năm gần đây và nhận được
              nhiều sự ủng hộ và quyên góp của nhân dân trên khắp cả nước.
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
      <SectionContainer hasBg>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Tin tức mới nhất 📰
        </Heading>
        <TitleLines />
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)'
          ]}
          gap={4}
          className='mt-14 mb-10'
        >
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          {news?.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </Grid>
        <Flex justify='center'>
          <Button
            noLinear='true'
            size='md'
            px={4}
            variant='outline'
            colorScheme={'purple'}
            onClick={() => router.push('/tin-tuc')}
          >
            Xem thêm
          </Button>
        </Flex>
      </SectionContainer>
      <SectionContainer id='qanda'>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Một số câu hỏi thường gặp 🤔
        </Heading>
        <TitleLines />
        <Flex mt={14} w='full'>
          <Accordion allowToggle w='full' colorScheme='purple'>
            {qa.map((item, index) => (
              <AccordionItem
                key={index}
                py={2}
                borderBottom='.5px solid lightgray'
                borderTop='none'
              >
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='lg' color={color.PRIMARY} fontWeight={600}>
                      {item.question}
                    </Text>
                  </Box>

                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4} fontSize='md'>
                  Trả lời: {item.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </SectionContainer>
      <SectionContainer hasBg>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Các đối tác khác 🤝
        </Heading>
        <TitleLines />
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
          gap={4}
          className='mt-14 mb-10'
        >
          {partners.map(p => (
            <Flex
              key={p.id}
              bg={useColorModeValue('white', 'gray.800')}
              className='relative border border-gray-200 px-3 py-3 rounded-md'
              align='center'
            >
              <Image className='w-12 h-12' src={p.logo} alt={p.name} />
              <Box ml='3'>
                <Text fontWeight='bold'>{p.name}</Text>
                <Text fontSize='sm'> {p.description}</Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </SectionContainer>
      <SectionContainer>
        <Box
          bg='#02054B'
          color='white'
          borderRadius='lg'
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(2, 1fr)'
              ]}
              gap={{ base: 20, sm: 3, md: 5, lg: 20 }}
            >
              <Box>
                <Heading>Liên hệ</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                  Điền vào biểu mẫu để gửi thông tin liên lạc
                </Text>
                <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                  <VStack pl={0} spacing={3} alignItems='flex-start'>
                    <Button
                      size='md'
                      height='48px'
                      variant='ghost'
                      color='#DCE2FF'
                      _hover={{ border: `2px solid ${color.PRIMARY}` }}
                      leftIcon={<MdPhone color={color.PRIMARY} size='20px' />}
                    >
                      +84-905245054
                    </Button>
                    <Button
                      size='md'
                      height='48px'
                      variant='ghost'
                      color='#DCE2FF'
                      _hover={{ border: `2px solid ${color.PRIMARY}` }}
                      leftIcon={<MdEmail color={color.PRIMARY} size='20px' />}
                    >
                      greencharity.help@gmail.com
                    </Button>
                    <Button
                      size='md'
                      height='48px'
                      variant='ghost'
                      color='#DCE2FF'
                      _hover={{ border: `2px solid ${color.PRIMARY}` }}
                      leftIcon={
                        <MdLocationOn color={color.PRIMARY} size='20px' />
                      }
                    >
                      Da Nang, Viet Nam
                    </Button>
                  </VStack>
                </Box>
                <HStack
                  mt={{ lg: 10, md: 10 }}
                  spacing={5}
                  px={5}
                  alignItems='flex-start'
                >
                  <IconButton
                    variant='ghost'
                    size='lg'
                    isRound={true}
                    _hover={{ bg: color.PRIMARY }}
                    icon={<MdFacebook size='28px' />}
                  />
                  <IconButton
                    variant='ghost'
                    size='lg'
                    isRound={true}
                    _hover={{ bg: color.PRIMARY }}
                    icon={<BsGithub size='28px' />}
                  />
                  <IconButton
                    variant='ghost'
                    size='lg'
                    isRound={true}
                    _hover={{ bg: color.PRIMARY }}
                    icon={<BsDiscord size='28px' />}
                  />
                </HStack>
              </Box>

              <Box bg='white' borderRadius='lg'>
                <Box m={8} color='#0B0E3F'>
                  <VStack spacing={5}>
                    <FormControl id='name'>
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor='#E0E1E7'>
                        <InputLeftElement pointerEvents='none'>
                          <BsPerson color='gray.800' />{' '}
                        </InputLeftElement>
                        <Input type='text' size='md' />
                      </InputGroup>
                    </FormControl>
                    <FormControl id='name'>
                      <FormLabel>Mail</FormLabel>
                      <InputGroup borderColor='#E0E1E7'>
                        <InputLeftElement pointerEvents='none'>
                          <MdOutlineEmail color='gray.800' />
                        </InputLeftElement>
                        <Input type='text' size='md' />
                      </InputGroup>
                    </FormControl>
                    <FormControl id='name'>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        borderColor='gray.300'
                        _hover={{
                          borderRadius: 'gray.300'
                        }}
                        placeholder='message'
                      />
                    </FormControl>
                    <FormControl id='name' float='right'>
                      <Button
                        variant='solid'
                        bg='#0D74FF'
                        color='white'
                        _hover={{}}
                      >
                        Send Message
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </SectionContainer>
    </>
  );
}

export const getServerSideProps = async () => {
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
