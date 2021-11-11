import {
  Avatar,
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';
import * as _ from 'lodash';
import Head from 'next/head';
import * as n from 'numeral';
import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineLeft } from 'react-icons/ai';
import { FaCcStripe } from 'react-icons/fa';
import { RiEditLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import { CampaignForm } from 'src/components/common/Campaign/CampaignForm';
import CommentItem from 'src/components/common/Campaign/CommentItem';
import NeedLogin from 'src/components/common/NeedLogin';
import ProgressBar from 'src/components/common/Progress/ProgressBar';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { CampaignService } from 'src/services/campaign';
import { CommentService } from 'src/services/comment';
import { DateUtils } from 'src/utils/date';
import FsLightbox from 'fslightbox-react';
import Slider from 'react-slick';

export async function getServerSideProps(ctx) {
  const { campaign } = await CampaignService.getById(ctx.query.slug);
  if (!_.isEmpty(campaign)) {
    return {
      props: {
        campaign
      }
    };
  }
  return {
    notFound: true
  };
}

export default function Detail({ campaign }) {
  const user = useSelector(state => state.auth.currentUser);
  const bg = useColorModeValue('white', 'gray.800');
  const [canEdit, setCanEdit] = useState(false);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0
  });
  function openLightboxOnSource(sourceIndex) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: sourceIndex
    });
  }

  const {
    status,
    amount,
    donated_amount,
    _id,
    name,
    images,
    content,
    finishedAt,
    author,
    createdAt
  } = campaign;
  const isEnded = status === 'ended';
  const isOwner = user?.id === author._id;

  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: images.length > 4 ? 4 : images.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <SectionContainer>
      <Head>
        <title>{name}</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      {!canEdit ? (
        <>
          <Flex justifyContent='space-between'>
            <Text as={'h1'} fontSize={'3xl'} fontWeight={600}>
              {name}
            </Text>
            {isOwner && (
              <Button
                my={4}
                colorScheme={'purple'}
                leftIcon={<RiEditLine />}
                onClick={() => setCanEdit(true)}
              >
                Chỉnh sửa hoạt động
              </Button>
            )}
          </Flex>

          <Text as={'p'} fontSize='sm'>
            {format(new Date(createdAt), 'dd/MM/yyyy')}
          </Text>
          <Box mt={4}>
            {isEnded ? (
              <Tag colorScheme='red'>Hoạt động đã kết thúc</Tag>
            ) : (
              <Tag colorScheme='purple'>Hoạt động đang diễn ra</Tag>
            )}
          </Box>

          <Slider className='my-4 w-full' {...settings}>
            {images.map((image, idx) => (
              <Image
                key={idx}
                onClick={() => openLightboxOnSource(1)}
                className='h-56 w-full object-cover object-center transition duration-300 px-2 cursor-pointer'
                _hover={{ boxShadow: '2xl', transform: 'scale(1.1)' }}
                src={image}
                alt={`campaign-${_id}-${idx}`}
              />
            ))}
          </Slider>

          <FsLightbox toggler={lightboxController.toggler} sources={images} />
          <Flex flexDirection={['column', 'column', 'row']} spacing={8}>
            <Box flex={3} my={8} order={['2', '2', '1']} mr={['0', '0', '8']}>
              <Tabs isLazy>
                <TabList mb='1em'>
                  <Tab _selected={{ borderColor: color.PRIMARY }}>
                    Miếng trầu là đầu câu chuyện
                  </Tab>
                  <Tab _selected={{ borderColor: color.PRIMARY }}>
                    Các nhà hảo tâm
                  </Tab>
                  <Tab _selected={{ borderColor: color.PRIMARY }}>
                    Bình luận
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </TabPanel>
                  <TabPanel px={0}>
                    <div>nha hao tam</div>
                  </TabPanel>
                  <TabPanel px={0}>
                    <Comment campaignId={_id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box
              className='border-2'
              order={['1', '1', '2']}
              my={8}
              h='max-content'
              ml={['0', '0', '8']}
              flex={2}
              bg={bg}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Stack textAlign={'center'} p={6} align={'center'}>
                <Text fontSize={'xl'} color={color.PRIMARY} fontWeight={600}>
                  THÔNG TIN QUYÊN GÓP
                </Text>
              </Stack>

              <Box bg={bg} px={6} py={2}>
                <Stack my={4} w={'full'}>
                  <Flex justify={'space-between'}>
                    <Flex align={'end'}>
                      <Text fontSize={'xl'} fontWeight={600}>
                        {n(donated_amount).format('0,0')}đ quyên góp
                      </Text>
                      / <Text>{n(amount).format('0,0')}đ</Text>
                    </Flex>
                  </Flex>
                  <ProgressBar
                    color={color.PRIMARY}
                    percent={`${((donated_amount / amount) * 100).toFixed(2)}%`}
                  />
                </Stack>
                <Stack my={2}>
                  <Box>
                    <Text fontSize={'xl'}>Đạt được</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {((donated_amount / amount) * 100).toFixed(2)} %
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={'xl'}>Ngày hết hạn</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {format(new Date(finishedAt), 'dd / MM / yyyy')} (Còn{' '}
                      {DateUtils.calculateDaysFromNow(finishedAt)} ngày)
                    </Text>
                  </Box>
                </Stack>
                <Box py={2}>
                  <Text color={color.PRIMARY} fontSize='lg' fontWeight={600}>
                    Mọi thông tin xin liên hệ với{' '}
                  </Text>
                  <Stack my={2} direction={'row'} spacing={4} align={'center'}>
                    <Avatar src={author.picture} alt={'Author'} />
                    <Stack direction={'column'} spacing={2} fontSize={'md'}>
                      <b>{author.name}</b>
                      <Text>
                        Số điện thoại:&nbsp; <b>{author.phoneNumber}</b>
                      </Text>
                    </Stack>
                  </Stack>
                  <Flex direction={'column'} pt={2}>
                    <Text py={2}>
                      STK: <b>0909090909090</b>
                    </Text>
                    <Text py={2}>
                      Tên CTK: <b>NGUYEN MINH HIEU</b>
                    </Text>
                    <Text py={2}>
                      Chi nhánh: <b>Đà nẽn</b>
                    </Text>
                  </Flex>
                </Box>
                <Text textAlign={'center'} my={2} fontSize={'lg'}>
                  Hoặc quyên góp ngay
                </Text>
                <form onSubmit={() => {}}>
                  <FormControl id='amount' isRequired>
                    <FormLabel>Số tiền mong muốn</FormLabel>
                    <InputGroup>
                      <Input
                        type='number'
                        placeholder='Nhập số tiền tại đây'
                        focusBorderColor={color.PRIMARY}
                      />
                      <InputRightAddon>VND</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <Button w='full' mt={4} colorScheme={'pink'} type='submit'>
                    Quyên góp
                  </Button>
                </form>

                <Button
                  nolinear='true'
                  my={2}
                  w={'full'}
                  colorScheme={'pink'}
                  leftIcon={
                    <svg
                      width='24'
                      className='svg-icon fill-current momo__logo '
                      viewBox='0 0 96 87'
                      fill='#fff'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M75.5326 0C64.2284 0 55.0651 8.74843 55.0651 19.5409C55.0651 30.3333 64.2284 39.0818 75.5326 39.0818C86.8368 39.0818 96 30.3333 96 19.5409C96 8.74843 86.8368 0 75.5326 0ZM75.5326 27.8805C70.7368 27.8805 66.8403 24.1604 66.8403 19.5818C66.8403 15.0031 70.7368 11.283 75.5326 11.283C80.3283 11.283 84.2248 15.0031 84.2248 19.5818C84.2248 24.1604 80.3283 27.8805 75.5326 27.8805ZM49.1561 14.6761V39.1226H37.3809V14.5535C37.3809 12.7138 35.8394 11.2421 33.9126 11.2421C31.9857 11.2421 30.4442 12.7138 30.4442 14.5535V39.1226H18.669V14.5535C18.669 12.7138 17.1276 11.2421 15.2007 11.2421C13.2739 11.2421 11.7324 12.7138 11.7324 14.5535V39.1226H0V14.6761C0 6.58176 6.89385 0 15.372 0C18.8403 0 22.0089 1.10377 24.5781 2.9434C27.1472 1.10377 30.3586 0 33.7841 0C42.2623 0 49.1561 6.58176 49.1561 14.6761ZM75.5326 47.544C64.2284 47.544 55.0651 56.2925 55.0651 67.0849C55.0651 77.8774 64.2284 86.6258 75.5326 86.6258C86.8368 86.6258 96 77.8774 96 67.0849C96 56.2925 86.8368 47.544 75.5326 47.544ZM75.5326 75.4245C70.7368 75.4245 66.8403 71.7044 66.8403 67.1258C66.8403 62.5472 70.7368 58.827 75.5326 58.827C80.3283 58.827 84.2248 62.5472 84.2248 67.1258C84.2248 71.7044 80.3283 75.4245 75.5326 75.4245ZM49.1561 62.2201V86.6667H37.3809V62.0975C37.3809 60.2579 35.8394 58.7862 33.9126 58.7862C31.9857 58.7862 30.4442 60.2579 30.4442 62.0975V86.6667H18.669V62.0975C18.669 60.2579 17.1276 58.7862 15.2007 58.7862C13.2739 58.7862 11.7324 60.2579 11.7324 62.0975V86.6667H0V62.2201C0 54.1258 6.89385 47.544 15.372 47.544C18.8403 47.544 22.0089 48.6478 24.5781 50.4874C27.1472 48.6478 30.3158 47.544 33.7841 47.544C42.2623 47.544 49.1561 54.1258 49.1561 62.2201Z'
                        fill=''
                      />
                    </svg>
                  }
                >
                  Momo
                </Button>
                <Button
                  nolinear='true'
                  my={2}
                  w={'full'}
                  colorScheme={'gray'}
                  leftIcon={<FaCcStripe size='2rem' />}
                >
                  <Center>
                    <Text>Stripe</Text>
                  </Center>
                </Button>
              </Box>
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Button
            leftIcon={<AiOutlineLeft />}
            variant='outline'
            onClick={() => setCanEdit(false)}
            borderColor={color.PRIMARY}
          >
            Trở lại
          </Button>
          <CampaignForm isEdited initialValues={campaign} />
        </>
      )}
    </SectionContainer>
  );
}

function Comment({ campaignId }) {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.currentUser);
  async function handleComment(e) {
    e.preventDefault();
    await CommentService.create(campaignId, value).then(res => {
      getComments();
      setValue('');
    });
  }
  async function getComments() {
    setLoading(true);
    await CampaignService.fetchComments(campaignId)
      .then(res => {
        console.log('res', res);
        setComments(res);
      })
      .catch(e => {
        console.log('e', e);
      });
    setLoading(false);
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box>
      {user ? (
        <form
          onSubmit={handleComment}
          className='p-4 rounded-xl bg-gray-50 my-4'
        >
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Viết bình luận</FormLabel>
            <Input
              onChange={e => setValue(e.target.value)}
              value={value}
              id='name'
              placeholder='Cảm nghĩ của bạn'
              focusBorderColor={color.PRIMARY}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme='purple'
            isLoading={loading}
            type='submit'
            rightIcon={<AiOutlineComment />}
          >
            Bình luận
          </Button>
        </form>
      ) : (
        <NeedLogin />
      )}
      {loading ? (
        <Box padding='4' rounded={'xl'} bg='gray.50' my={4}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
      ) : (
        comments?.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}
      {comments?.length === 0 && <div>Chưa có bình luận nào</div>}
    </Box>
  );
}
