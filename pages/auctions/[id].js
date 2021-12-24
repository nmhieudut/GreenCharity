import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useNumberInput,
  useToast
} from '@chakra-ui/react';
import vi from 'date-fns/locale/vi';
import { formatDistanceToNow } from 'date-fns';
import FsLightbox from 'fslightbox-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import campaigns from 'pages/admin/campaigns';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import CountDown from 'src/components/common/CountDown';
import NeedLogin from 'src/components/common/NeedLogin';
import SectionContainer from 'src/components/common/SectionContainer';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import { AuctionService } from 'src/services/auction';
import { subscribeToAuctionChanges } from 'src/services/io';
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';

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

export async function getServerSideProps(ctx) {
  try {
    const { auction } = await AuctionService.getAuction(ctx.query.id);
    return {
      props: {
        data: auction
      }
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true
    };
  }
}

export default function AuctionDetails({ data }) {
  const router = useRouter();
  const toast = useToast();
  const user = useSelector(state => state.auth.currentUser);
  const [slider, setSlider] = useState(null);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0
  });
  const [auction, setAuction] = useState(data);
  const [loading, setLoading] = useState(false);
  const {
    _id,
    title,
    description,
    campaign,
    images,
    startPrice,
    currentBid,
    finishedAt,
    status,
    author
  } = auction || {};
  const [amount, setAmount] = useState(startPrice);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      onChange: valueString => setAmount(parseInt(valueString)),
      step: 500000,
      defaultValue: amount,
      min: currentBid ? currentBid.amount : startPrice,
      keepWithinRange: true,
      clampValueOnBlur: false
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: false });

  useEffect(() => {
    subscribeToAuctionChanges(event => {
      console.log('====updating', event);
      const { auction, type } = event;
      if (type === 'update') {
        return setAuction(auction);
      }
    });
  }, []);
  const bg = useColorModeValue('white', 'gray.700');
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });
  function openLightboxOnSource(sourceIndex) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: sourceIndex
    });
  }

  const handleBid = async () => {
    setLoading(true);
    try {
      await AuctionService.bid(auction._id, amount);
      toast({
        title: 'Thành công',
        description: 'Đã đặt giá thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: 'Thất bại.',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      {auction && (
        <Box>
          <Text as={'h1'} fontSize={'3xl'} fontWeight={600}>
            {title}
          </Text>
          <Badge
            mt={4}
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

          {/* two column layout */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            mx='auto'
            mt={12}
          >
            <Box>
              <FsLightbox
                toggler={lightboxController.toggler}
                sources={images}
              />
              <Box position={'relative'} overflow='hidden'>
                {images?.length > 1 && (
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
                      rounded='xl'
                      key={idx}
                      height={72}
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
              <Box rounded='xl' shadow='md' mt={6} p={4}>
                <Grid templateColumns={['2fr 1fr']} gap={4}>
                  <Box>
                    <Heading
                      textAlign='center'
                      fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                      lineHeight={'110%'}
                      color={color.PRIMARY}
                      mb={4}
                    >
                      Thông tin chi tiết
                    </Heading>
                    <Flex
                      justify='space-between'
                      align='center'
                      py={2}
                      borderBottom={'1px solid lightgray'}
                    >
                      <Text fontWeight={600} fontSize={'md'}>
                        Tên sản phẩm:
                      </Text>
                      <Text fontSize={'md'}>{title}</Text>
                    </Flex>
                    <Flex
                      justify='space-between'
                      align='center'
                      py={2}
                      borderBottom={'1px solid lightgray'}
                    >
                      <Text fontWeight={600} fontSize={'md'}>
                        Hoạt động được tài trợ:
                      </Text>
                      <Link
                        href={`/campaigns/${campaign.slug}`}
                        fontSize={'md'}
                      >
                        {campaign.name}
                      </Link>
                    </Flex>
                    <Flex flexDirection='column' py={2}>
                      <Text fontWeight={600} fontSize={'md'} textAlign='center'>
                        Mô tả:
                      </Text>
                      <Text fontSize={'md'}>{description}</Text>
                    </Flex>
                  </Box>
                  <Stack
                    spacing={4}
                    direction='column'
                    borderLeft='2px solid lightgray'
                    align='center'
                    justify='center'
                  >
                    <Heading
                      textAlign='center'
                      fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                      lineHeight={'110%'}
                      color={color.PRIMARY}
                      mb={2}
                    >
                      Giá khởi điểm
                    </Heading>
                    <Text fontWeight={600}>{VNDFormatter(startPrice)}</Text>
                    <Divider />
                    <Heading
                      textAlign='center'
                      fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                      lineHeight={'110%'}
                      color={color.PRIMARY}
                      mb={2}
                    >
                      Cao nhất
                    </Heading>
                    <Text fontWeight={600}>
                      {currentBid ? VNDFormatter(currentBid.amount) : 'Chưa có'}
                    </Text>
                  </Stack>
                </Grid>
              </Box>
            </Box>

            <Flex flexDirection='column' rounded='xl' p={6} shadow='md'>
              <Flex align='center' flexWrap='wrap'>
                <Heading
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                  lineHeight={'110%'}
                  color={color.PRIMARY}
                  mr={6}
                >
                  Thời hạn:
                </Heading>

                <CountDown time={finishedAt} />
              </Flex>
              <Box border='1px solid #eaeaea ' p={8} my={4} rounded='xl'>
                <Heading
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                  lineHeight={'110%'}
                  color={color.PRIMARY}
                  mb={6}
                >
                  Đấu giá ngay
                </Heading>
                {!user ? (
                  <Box>
                    <NeedLogin />
                  </Box>
                ) : (
                  <>
                    <HStack w='full'>
                      <Button colorScheme='purple' {...inc}>
                        +
                      </Button>
                      <Input {...input} />
                      <Button colorScheme='purple' {...dec}>
                        -
                      </Button>
                    </HStack>

                    {/* check if current user is owner of this auction */}
                    <Box my={6}>
                      {user && user.id === author._id ? (
                        'Bạn không thể đấu giá chính mình'
                      ) : (
                        <Button
                          disabled={loading}
                          isLoading={loading}
                          colorScheme='purple'
                          onClick={handleBid}
                          w='full'
                        >
                          {' '}
                          Đấu giá này{' '}
                        </Button>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <Box mt={2} pt={4} borderTop='1px solid black'>
                <Heading
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                  lineHeight={'110%'}
                  color={color.PRIMARY}
                  mr={6}
                >
                  Top những nhà leo núi
                </Heading>
                {/* list all top bidder */}
                <Box mt={4}>
                  {auction.bids?.length > 0 ? (
                    <List>
                      {auction.bids
                        .slice(0)
                        .reverse()
                        .map((bid, idx) => (
                          <ListItem
                            key={idx}
                            rounded='lg'
                            shadow='md'
                            p={2}
                            my={2}
                            bg={bg}
                          >
                            <Flex align='center'>
                              <Avatar
                                name={bid.author.name}
                                src={bid.author.picture}
                                size='sm'
                                mr={4}
                              />
                              <Text fontWeight={600}>{bid.author.name}</Text>
                              <Text fontSize={'md'} ml={4} color='green'>
                                +{' '}
                                {VNDFormatter(
                                  auction.bids.length > 0 &&
                                    bid.amount - auction.bids[0].amount
                                )}
                              </Text>
                              <Text
                                as='i'
                                color='gray.500'
                                ml={'auto'}
                                fontSize='xs'
                              >
                                {formatDistanceToNow(new Date(bid.createdAt), {
                                  locale: vi
                                })}{' '}
                                trước
                              </Text>
                            </Flex>
                          </ListItem>
                        ))}
                    </List>
                  ) : (
                    <Flex justify='center' align='center' h='100%'>
                      Chưa có người đấu giá
                    </Flex>
                  )}
                </Box>
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
      )}
    </SectionContainer>
  );
}
