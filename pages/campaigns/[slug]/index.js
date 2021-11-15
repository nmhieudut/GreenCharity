import {
  Avatar,
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
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
import FsLightbox from 'fslightbox-react';
import * as _ from 'lodash';
import Head from 'next/head';
import * as n from 'numeral';
import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineLeft } from 'react-icons/ai';
import { RiEditLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
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
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  const settings = {
    dots: true,
    arrows: true,
    infinite: images.length > 4,
    slidesToShow: 4,
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
                onClick={() => openLightboxOnSource(idx)}
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
                  <Flex justify={'space-between'} fontSize='sm'>
                    <Flex align={'end'}>
                      <Text fontSize={'lg'} fontWeight={600}>
                        {n(donated_amount).format('0,0')}đ quyên góp
                      </Text>
                      &nbsp;/&nbsp;<Text>{n(amount).format('0,0')}đ</Text>
                    </Flex>
                  </Flex>
                  <ProgressBar
                    color={color.PRIMARY}
                    percent={`${((donated_amount / amount) * 100).toFixed(2)}%`}
                  />
                </Stack>
                <Flex
                  my={2}
                  fontSize='sm'
                  justifyContent='space-between'
                  flexWrap='wrap'
                >
                  <Flex flexDir='column' alignItems='center'>
                    <Text fontSize={'md'}>Lượt ủng hộ</Text>
                    <Text color={'gray.500'} as={'b'}>
                      4.500 lượt
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center'>
                    <Text fontSize={'md'}>Đạt được</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {percent}
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center'>
                    <Text fontSize={'md'}>Thời hạn còn</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {DateUtils.calculateDaysFromNow(finishedAt)} ngày
                    </Text>
                  </Flex>
                </Flex>
                <Box py={2}>
                  <Text color={color.PRIMARY} fontSize='lg' fontWeight={600}>
                    Thông tin đóng góp xin gửi về{' '}
                  </Text>
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
                    <InputGroup>
                      <Input
                        type='number'
                        placeholder='Nhập số tiền muốn quyên góp tại đây'
                        focusBorderColor={color.PRIMARY}
                      />
                      <InputRightAddon>VND</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <Button w='full' mt={4} colorScheme={'pink'} type='submit'>
                    Quyên góp
                  </Button>
                </form>
                <Divider my={2} />
                <Stack py={1}>
                  <Text
                    as={'b'}
                    color={color.PRIMARY}
                    fontSize='lg'
                    fontWeight={600}
                  >
                    Đồng hành cùng dự án
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
                </Stack>
              </Box>
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Button
            leftIcon={<AiOutlineLeft />}
            colorScheme='purple'
            onClick={() => setCanEdit(false)}
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
