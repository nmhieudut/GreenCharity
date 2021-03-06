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
        <title>Trang chu?? - Green Charity</title>
        <meta
          name='description'
          content='Green Charity l?? n???n t???ng gi??p b???n d??? d??ng chung tay quy??n g??p ti???n c??ng h??ng
              tri???u ng?????i, gi??p ????? c??c ho??n c???nh kh?? kh??n tr??n kh???p c??? n?????c.'
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
                  L?? n???n t???ng gi??p b???n d??? d??ng chung tay quy??n g??p ti???n c??ng
                  h??ng tri???u ng?????i, gi??p ????? c??c ho??n c???nh kh?? kh??n tr??n kh???p c???
                  n?????c.
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
                      Ti??m hi????u
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
                      B????t ??????u ngay
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
              <Text color='gray.400'>Ho???t ?????ng</Text>
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
              <Text color='gray.400'>L?????t quy??n g??p</Text>
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
              <Text color='gray.400'>?????ng quy??n g??p</Text>
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
          Ti??ch ??????c kh??ng kho??, la??m vi????c t????t thi?? ca??ng d???? h??n
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
                T??I MU????N TH??NG TIN T????I CA??C NHA?? HA??O T??M
              </Text>
            </Box>
            <Box px={6} pb={6} pt={'auto'}>
              <Text fontSize={'sm'}>
                Ba??n g????p va??i hoa??n ca??nh kho?? kh??n ma?? kh??ng th???? k??u go??i. Ha??y th??ng
                tin ??????n chu??ng t??i ngay
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/hoat-dong/tao-moi')}
              >
                V???n ?????ng ngay
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
                T??I LA?? NHA?? HA??O T??M
              </Text>
            </Box>
            <Box px={6} pb={6} mt='auto'>
              <Text fontSize={'sm'}>
                Ch??? v???i v??i thao ta??c ????n gia??n, b???n ???? g??p ph???n gi??p ????? 1 ho??n
                c???nh kh?? kh??n c?? cu???c s???ng t???t ?????p h??n.
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/hoat-dong')}
              >
                U??ng h???? ngay
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
                T??I MU???N M??? PHI??N ?????U GI??
              </Text>
            </Box>
            <Box px={6} pb={6} mt='auto'>
              <Text fontSize={'sm'}>
                N???u b???n ??ang s??? h???u 1 m??n ????? hay 1 th??? g?? ???? v?? ??ang c???n m???t n??i
                ????? ?????u gi?? m??n ????? ???? cho ho???t ?????ng b???n ??ang k??u g???i, b???n c?? th???
                t???o m???t phi??n ?????u gi?? ngay t???i ????y.
              </Text>
              <Button
                mt={10}
                w={'full'}
                colorScheme={'purple'}
                onClick={() => router.push('/dau-gia/tao-moi')}
              >
                M??? ngay
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
          Ca??c hoa??t ??????ng ??ang di????n ra ????
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
            Xem th??m
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
              V?? sao n??n ch???n{' '}
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
                title='Thao t??c nhanh, d??? s??? d???ng'
                icon={<GiClick />}
              >
                D??? d??ng k??u g???i, quy??n g??p ch??? v???i v??i thao t??c c?? b???n.
              </Feature>

              <Feature
                color='pink'
                title='B???n c?? th??? quy??n g??p cho nhi???u ng?????i'
                icon={<FaDonate />}
              >
                B???n c?? th??? quy??n g??p cho nhi???u ng?????i, nh??ng ch??? c???n ch???n m???t
                ng?????i ????? quy??n g??p. V?? n???u b???n kh??ng th??? ch???n ???????c ng?????i ?????
                quy??n g??p, b???n c?? th??? quy??n g??p cho ch??nh m??nh.
              </Feature>

              <Feature
                color='green'
                title='?????u gi?? t??? thi???n tr???c ti???p'
                icon={<AiOutlineTransaction />}
              >
                ?????u gi?? tr???c ti???p v???i nh???ng ng?????i kh??c, kh??ng c???n ph???i ch??? ?????i
                ng?????i kh??c ?????u gi??.
              </Feature>
              <Feature
                color='blue'
                title='?????i ng?? h??? tr??? nhi???t t??nh'
                icon={<FcOnlineSupport />}
              >
                ?????i ng?? h??? tr??? nhi???t t??nh v?? chuy??n nghi???p s??? gi??p b???n ?????t ???????c
                m???c ti??u c???a b???n. B???n c?? th??? li??n h??? v???i ch??ng t??i qua s??? ??i???n
                tho???i, email ho???c th??ng qua Facebook messenger tr??n m??n h??nh.
                Ch??ng t??i s??? ph???n h???i b???n trong v??ng nhi???u nh???t 24h k??? t??? khi
                nh???n ???????c y??u c???u.
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
          Ng?????i ng?????i l??m t??? thi???n, nh?? nh?? l??m t??? thi???n
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
              C??ng v???i nh???ng ng?????i n???i ti???ng
            </Heading>
            <Text mt={4}>
              Nhi???u g????ng m???t ?????i di???n ???? ?????ng ra k??u g???i t??? thi???n, ti??u bi???u l??
              nh???ng ca s??, ngh??? s??, g???ng s?? trong nh???ng n??m g???n ????y v?? nh???n ???????c
              nhi???u s??? ???ng h??? v?? quy??n g??p c???a nh??n d??n tr??n kh???p c??? n?????c.
            </Text>
          </Flex>
          <Box
            w={{ base: 'full', md: '50%' }}
            className='animate__item h-96'
            data-displacement='img/displacement/8.jpg'
          >
            <div className='animate__item-content'>
              <h3 className='animate__item-subtitle'>
                <Heading fontSize='md'>??ng ????m V??nh Bi???t</Heading>
                <span>Anh s??? v?? em l??m cha th??n b??</span>
              </h3>
              <h3 className='animate__item-subtitle'>
                <Heading fontSize='md'>B?? L?? Th??? Th???y T???</Heading>
                <span>Em l??m t??? thi???n t??? n??m 10 tu???i</span>
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
          Tin t???c m???i nh???t ????
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
            Xem th??m
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
          M???t s??? c??u h???i th?????ng g???p ????
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
                  Tr??? l???i: {item.answer}
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
          C??c ?????i t??c kh??c ????
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
                <Heading>Li??n h???</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                  ??i???n v??o bi???u m???u ????? g???i th??ng tin li??n l???c
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
