import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import FsLightbox from 'fslightbox-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { AiOutlineComment, AiOutlineLeft } from 'react-icons/ai';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { BsBoxArrowInDownLeft, BsFilePdfFill } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { RiEditLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Pdf from 'react-to-pdf';
import Button from 'src/components/common/Button';
import DividerWithText from 'src/components/common/DividerWithText';
import NeedLogin from 'src/components/common/NeedLogin';
import ProgressBar from 'src/components/common/Progress/ProgressBar';
import SectionContainer from 'src/components/common/SectionContainer';
import CommentItem from 'src/components/core/Campaign/CommentItem';
import DonatorItem from 'src/components/core/Card/DonatorItem';
import { CampaignForm } from 'src/components/core/Form/CampaignForm';
import { color } from 'src/constants/color';
import useCountdown from 'src/hooks/useCountdown';
import { CampaignService } from 'src/services/campaign';
import { CommentService } from 'src/services/comment';
import { ModalActions } from 'src/store/modal/action';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';

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
  const { data, isLoading } = useQuery(['disbursements'], () =>
    CampaignService.fetchRE(campaign._id)
  );
  const { disbursements } = data || [];
  const user = useSelector(state => state.auth.currentUser);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.900');
  const ref = useRef();
  const [slider, setSlider] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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
    address,
    finishedAt,
    author,
    moreInfo,
    createdAt
  } = campaign;
  const { wished_amount, message } = donatedInfo;
  const isOwner = user?.id === author._id;
  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;
  const { days, hours, minutes, seconds } = useCountdown(finishedAt);

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
    setLoading(true);
    try {
      await CampaignService.donate(campaign._id, {
        amount: parseInt(wished_amount),
        message
      });
      onOpen();
      toast({
        title: `Đã quyên góp thành công số tiền ${toVND(
          wished_amount
        )} đ. Cảm ơn tấm lòng đại bác của bạn!`,
        status: 'success',
        isClosable: true
      });
      router.replace(router.asPath);
    } catch (e) {
      toast({
        title: `${e.response.data.message}`,
        status: 'error',
        isClosable: true
      });
    } finally {
      onClose();
      setLoading(false);
      dispatch(ModalActions.setModalOff());
    }
  };

  return (
    <SectionContainer position='relative'>
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
            {DateUtils.toDate(createdAt)}
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
              {fromStatusToString(status)}
            </Badge>
          </Box>
          <FsLightbox
            type='image'
            toggler={lightboxController.toggler}
            sources={images}
          />
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
                      backgroundImage={`url('${image}')`}
                      alt={`campaign-${_id}-${idx}`}
                    />
                  ))}
                </Slider>
              </Box>

              <Tabs isLazy variant='enclosed' isFitted>
                <TabList mb='1em'>
                  <Tab _selected={{ bg: color.PRIMARY, color: 'white' }}>
                    Hoàn cảnh
                  </Tab>
                  <Tab _selected={{ bg: color.PRIMARY, color: 'white' }}>
                    Các nhà hảo tâm
                  </Tab>
                  <Tab _selected={{ bg: color.PRIMARY, color: 'white' }}>
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
                  <Flex>
                    <b>Mục tiêu: </b>
                    <Text color={color.PRIMARY} ml={2} fontWeight={600}>
                      {toVND(goal)}đ
                    </Text>
                  </Flex>
                  <ProgressBar color={color.PRIMARY} percent={percent} />
                </Stack>
                <Flex
                  my={2}
                  fontSize='sm'
                  flexWrap='wrap'
                  justifyContent='space-between'
                >
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Đã quyên góp</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {toVND(donated_amount)}đ
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Đạt được</Text>
                    <Text color={'gray.500'} as={'b'}>
                      {percent}
                    </Text>
                  </Flex>
                  <Flex flexDir='column' alignItems='center' bg={bg}>
                    <Text fontSize={'md'}>Thời hạn còn</Text>
                    {status === 'active' ? (
                      <Stack spacing={1} direction='row'>
                        {days > 0 && (
                          <Text color={'gray.500'}>{days} ngày</Text>
                        )}
                        {hours > 0 && (
                          <Text color={'gray.500'}>{hours} giờ</Text>
                        )}
                        {minutes > 0 && (
                          <Text color={'gray.500'}>{minutes} phút</Text>
                        )}
                        <Text color={'gray.500'}>{seconds} giây</Text>
                      </Stack>
                    ) : status === 'pending' ? (
                      <Text color={'blue.500'} as={'b'}>
                        Đang chờ duyệt
                      </Text>
                    ) : (
                      <Text color={'red.500'} as={'b'}>
                        Hết hạn
                      </Text>
                    )}
                  </Flex>
                </Flex>
                <Flex direction={'column'} py={2}>
                  <Box verticalAlign='middle' mb={2}>
                    <span className='inline-block align-baseline'>
                      <HiLocationMarker className='mt-1' />
                    </span>
                    <Text
                      as='span'
                      fontSize='sm'
                      color='gray.500'
                      display='inline'
                    >
                      &nbsp;{address}
                    </Text>
                  </Box>
                  <Text
                    color={color.PRIMARY}
                    fontSize='lg'
                    fontWeight={600}
                    mb={2}
                  >
                    Thông tin thêm
                  </Text>
                  <Text as={'i'}>{moreInfo ? moreInfo : 'Không có'}</Text>
                </Flex>
                <DividerWithText> Hoặc quyên góp ngay</DividerWithText>
                {user ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
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
                <Pdf targetRef={ref} filename='sao-ke.pdf'>
                  {({ toPdf }) => (
                    <Button
                      mt={4}
                      colorScheme={'pink'}
                      leftIcon={<BsFilePdfFill />}
                      onClick={toPdf}
                    >
                      Xuất sao kê sang file PDF
                    </Button>
                  )}
                </Pdf>
                <Box
                  ref={ref}
                  position='fixed'
                  zIndex={-1}
                  width='100%'
                  height='90%'
                  top={0}
                  left={0}
                >
                  <Heading my={12} color={color.PRIMARY} fontSize='1.2rem'>
                    Quỹ ủng hộ
                  </Heading>
                  <style jsx>{`
                    table,
                    th,
                    td {
                      border: 1px solid black;
                      padding: 0.5rem 1rem;
                    }
                  `}</style>
                  <table>
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Diễn giải</th>
                        <th isNumeric>Thu</th>
                        <th isNumeric>Chi</th>
                        <th isNumeric>Tồn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disbursements?.map(
                        ({
                          createdAt,
                          message,
                          amount,
                          action,
                          lastBalance,
                          _id
                        }) => (
                          <tr key={_id} bg={action === 'chi' && 'lightgray'}>
                            <td>{DateUtils.toDate(createdAt)}</td>
                            <td>{message}</td>
                            <td isNumeric>
                              {action === 'thu' && toVND(amount)}
                            </td>
                            <td isNumeric>
                              {action === 'chi' && toVND(amount)}
                            </td>
                            <td isNumeric>{toVND(lastBalance)}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Tổng</th>
                        <th></th>
                        <th isNumeric>
                          <b>
                            {toVND(
                              disbursements
                                ?.filter(({ action }) => action === 'thu')
                                .reduce(
                                  (sum, item) => sum + parseInt(item.amount),
                                  0
                                )
                            )}
                          </b>
                        </th>
                        <th isNumeric>
                          <b>
                            {toVND(
                              disbursements
                                ?.filter(({ action }) => action === 'chi')
                                .reduce(
                                  (sum, item) => sum + parseInt(item.amount),
                                  0
                                )
                            )}
                          </b>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent py={4}>
                    <ModalHeader>Xác nhận quyên góp</ModalHeader>
                    <ModalBody>
                      Bạn muốn quyên góp số tiền <b>{wished_amount}</b> đồng cho
                      hoạt động này ?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        isLoading={loading}
                        colorScheme={'purple'}
                        mr={3}
                        onClick={handleDonate}
                      >
                        Đúng dậy tui chắc chắn
                      </Button>
                      <Button
                        colorScheme='gray'
                        noLinear
                        onClick={onClose}
                        isLoading={loading}
                      >
                        Tui muốn suy nghĩ lại
                      </Button>
                    </ModalFooter>
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
