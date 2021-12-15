import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import FsLightbox from 'fslightbox-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineLeft } from 'react-icons/ai';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { RiEditLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Button from 'src/components/common/Button';
import { CampaignForm } from 'src/components/common/Campaign/CampaignForm';
import CommentItem from 'src/components/common/Campaign/CommentItem';
import DonatorItem from 'src/components/common/Card/DonatorItem';
import DividerWithText from 'src/components/common/DividerWithText';
import NeedLogin from 'src/components/common/NeedLogin';
import ProgressBar from 'src/components/common/Progress/ProgressBar';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { CampaignService } from 'src/services/campaign';
import { CommentService } from 'src/services/comment';
import { ModalActions } from 'src/store/modal/action';
import { DateUtils } from 'src/utils/date';
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';

export async function getServerSideProps(ctx) {
  try {
    const { campaign } = await CampaignService.getBySlug(ctx.query.slug);
    return {
      props: {
        campaign
      }
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true
    };
  }
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function Detail({ campaign }) {
  const user = useSelector(state => state.auth.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.900');
  const [slider, setSlider] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [res, setRes] = useState(null);
  const [resMessage, setResMessage] = useState('');
  const [donatedInfo, setDonatedInfo] = useState({
    wished_amount: 0,
    message: ''
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0
  });
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  function openLightboxOnSource(sourceIndex) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: sourceIndex
    });
  }

  const {
    status,
    goal,
    donated_amount,
    _id,
    name,
    images,
    content,
    finishedAt,
    author,
    createdAt
  } = campaign;
  const { wished_amount, message } = donatedInfo;
  const isOwner = user?.id === author._id;
  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;

  const handleChange = e => {
    setDonatedInfo({
      ...donatedInfo,
      [e.target.id]: e.target.value
    });
  };

  const handleDonate = async () => {
    if (!user) {
      return;
    }
    dispatch(ModalActions.setModalOn());
    try {
      const res = await CampaignService.donate(campaign._id, {
        amount: parseInt(wished_amount),
        message
      });
      onOpen();
      setRes('success');
      setResMessage(res.message);
    } catch (e) {
      setRes('error');
      setResMessage(e.response.data.message);
    }
    dispatch(ModalActions.setModalOff());
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
            <Badge
              variant='outline'
              colorScheme={
                status === 'pending'
                  ? 'purple'
                  : status === 'active'
                  ? 'green'
                  : 'red'
              }
            >
              {convertStatusToString(status)}
            </Badge>
          </Box>
          <FsLightbox toggler={lightboxController.toggler} sources={images} />
          <Flex flexDirection={['column', 'column', 'row']} spacing={8}>
            <Box
              w={['100%', '100%', '60%']}
              my={8}
              order={['2', '2', '1']}
              mr={['0', '0', '2']}
            >
              <Box position={'relative'} overflow='hidden' mb={8}>
                {images.length > 1 && (
                  <>
                    <IconButton
                      aria-label='left-arrow'
                      colorScheme='purple'
                      position='absolute'
                      left={side}
                      top={top}
                      transform={'translate(0%, -50%)'}
                      zIndex={2}
                      onClick={() => slider?.slickPrev()}
                    >
                      <BiLeftArrowAlt size='40px' />
                    </IconButton>
                    {/* Right Icon */}
                    <IconButton
                      aria-label='right-arrow'
                      position='absolute'
                      colorScheme='purple'
                      right={side}
                      top={top}
                      transform={'translate(0%, -50%)'}
                      zIndex={2}
                      onClick={() => slider?.slickNext()}
                    >
                      <BiRightArrowAlt size='40px' />
                    </IconButton>
                  </>
                )}

                <Slider {...settings} ref={slider => setSlider(slider)}>
                  {images.map((image, idx) => (
                    <Box
                      key={idx}
                      height={'sm'}
                      onClick={() => openLightboxOnSource(idx)}
                      className='w-full transition duration-300 px-2 cursor-pointer'
                      _hover={{ boxShadow: '2xl', transform: 'scale(1.1)' }}
                      position='relative'
                      backgroundPosition='center'
                      backgroundRepeat='no-repeat'
                      backgroundSize='cover'
                      backgroundImage={`url(${image})`}
                      alt={`campaign-${_id}-${idx}`}
                    />
                  ))}
                </Slider>
              </Box>

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
                    <Donator campaignId={_id} />
                  </TabPanel>
                  <TabPanel px={0}>
                    <Comment campaignId={_id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box
              order={['1', '1', '2']}
              my={8}
              py={4}
              h='max-content'
              ml={['0', '0', '2']}
              w={['100%', '100%', '40%']}
              bg={bg}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Stack textAlign={'center'} py={1} align={'center'}>
                <Text fontSize={'xl'} color={color.PRIMARY} fontWeight={600}>
                  THÔNG TIN QUYÊN GÓP
                </Text>
              </Stack>

              <Box bg={bg} px={6} py={2} fontSize='sm'>
                <Stack my={4} w={'full'}>
                  <Flex justify={'space-between'}>
                    <Text fontWeight={600}>Đạt được:</Text>
                    <Text>{percent}</Text>
                  </Flex>
                  <ProgressBar color={color.PRIMARY} percent={percent} />
                  <Flex>
                    <b>Mục tiêu: </b>
                    <Text color={color.PRIMARY} ml={2} fontWeight={600}>
                      {VNDFormatter(goal)}đ
                    </Text>
                  </Flex>
                </Stack>
                <Flex
                  my={2}
                  fontSize='sm'
                  justifyContent='space-between'
                  flexWrap='wrap'
                >
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Lượt ủng hộ</Text>
                    <Text color={'gray.500'} as={'b'}>
                      4.500
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Đã quyên góp</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {VNDFormatter(donated_amount)}đ
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Thời hạn còn</Text>
                    {status === 'active' ? (
                      <Text color={'gray.500'} as={'b'}>
                        {DateUtils.calculateDaysFromNow(finishedAt)} ngày
                      </Text>
                    ) : (
                      <Text color={'red.500'} as={'b'}>
                        Hết hạn
                      </Text>
                    )}
                    <Text color={'gray.500'} as={'b'}></Text>
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
                <DividerWithText> Hoặc quyên góp ngay</DividerWithText>
                {user ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setRes(null);
                      setResMessage('');
                      onOpen();
                    }}
                  >
                    <FormControl my={2} id='wished_amount' isRequired>
                      <InputGroup>
                        <Input
                          onChange={handleChange}
                          type='number'
                          placeholder='Nhập số tiền muốn quyên góp tại đây'
                          focusBorderColor={color.PRIMARY}
                        />
                        <InputRightAddon>VND</InputRightAddon>
                      </InputGroup>
                    </FormControl>
                    <FormControl my={2} id='message' isRequired>
                      <Input
                        onChange={handleChange}
                        type='text'
                        placeholder='Và để lại lời nhắn ở đây'
                        focusBorderColor={color.PRIMARY}
                      />
                    </FormControl>
                    <Button w='full' mt={4} colorScheme={'pink'} type='submit'>
                      Quyên góp
                    </Button>
                  </form>
                ) : (
                  <Box>
                    <NeedLogin />
                  </Box>
                )}

                <Modal
                  isOpen={isOpen}
                  onClose={() => {
                    onClose();
                    res === 'success' && window.location.reload();
                  }}
                >
                  <ModalOverlay />
                  <ModalContent py={4}>
                    {res ? (
                      <>
                        <ModalHeader>Thông báo</ModalHeader>
                        <ModalBody>{resMessage}</ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme='gray'
                            nolinear
                            onClick={() => {
                              onClose();
                              res === 'success' && window.location.reload();
                            }}
                          >
                            {res === 'success' ? 'Hihi, không có chi' : 'Đóng'}
                          </Button>
                        </ModalFooter>
                      </>
                    ) : (
                      <>
                        <ModalHeader>Xác nhận quyên góp</ModalHeader>
                        <ModalBody>
                          Bạn muốn quyên góp số tiền <b>{wished_amount}</b> đồng
                          cho hoạt động này ?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme={'purple'}
                            mr={3}
                            onClick={handleDonate}
                          >
                            Đúng dậy tui chắc chắn
                          </Button>
                          <Button colorScheme='gray' nolinear onClick={onClose}>
                            Tui muốn suy nghĩ lại
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
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
                    <Stack direction={'column'} spacing={1} fontSize={'md'}>
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
  const [refetch, setRefetch] = useState(0);
  const { data, isLoading, isError, error } = useQuery(
    ['comments', refetch],
    () => CampaignService.fetchComments(campaignId)
  );
  const { comments } = data || [];
  const bg = useColorModeValue('gray.100', 'gray.900');
  const user = useSelector(state => state.auth.currentUser);
  async function handleComment(e) {
    e.preventDefault();
    await CommentService.create(campaignId, value).then(res => {
      setRefetch(r => r + 1);
      setValue('');
    });
  }

  return (
    <Box>
      {user ? (
        <form onSubmit={handleComment}>
          <Box bg={bg} p={4} rounded='xl' mb={4}>
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
              isLoading={isLoading}
              type='submit'
              rightIcon={<AiOutlineComment />}
            >
              Bình luận
            </Button>
          </Box>
        </form>
      ) : (
        <NeedLogin />
      )}
      {isLoading ? (
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

function Donator({ campaignId }) {
  const { data, isLoading, error, isError } = useQuery('donators', () =>
    CampaignService.fetchDonations(campaignId)
  );
  const { donations } = data || [];
  console.log(donations, isLoading, error);

  return (
    <Box>
      {/* skeleton card loading */}
      {isLoading ? (
        <Box padding='4' rounded={'xl'} bg='gray.50' my={4}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
      ) : (
        donations?.map(donation => (
          <DonatorItem key={donation._id} donation={donation} />
        ))
      )}
      {donations?.length === 0 && <div>Chưa có người quyên góp nào</div>}
    </Box>
  );
}
