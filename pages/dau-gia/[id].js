import {
  Alert,
  AlertIcon,
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
  ScaleFade,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useNumberInput,
  useToast
} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import FsLightbox from 'fslightbox-react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import CountDown from 'src/components/common/CountDown';
import NeedLogin from 'src/components/common/NeedLogin';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { AuctionService } from 'src/services/auction';
import { subscribeToAuctionChanges } from 'src/services/io';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';

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
  const toast = useToast();
  const user = useSelector(state => state.auth.currentUser);
  const [slider, setSlider] = useState(null);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0
  });
  const [auction, setAuction] = useState(data);
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
  const [loading, setLoading] = useState(false);
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
  const bg = useColorModeValue('white', 'gray.700');
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  useEffect(() => {
    subscribeToAuctionChanges(event => {
      const { auction, type } = event;
      if (type === 'update') {
        return setAuction(auction);
      }
    });
  }, []);

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
        position: 'top-right',
        title: 'Th??nh c??ng',
        description: '???? ?????t gi?? th??nh c??ng',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Th???t b???i.',
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
        <title>?????u gi?? {title}</title>
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
            {fromStatusToString(status)}
          </Badge>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            mx='auto'
            mt={12}
          >
            <Box>
              <FsLightbox
                type='image'
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
                      backgroundImage={`url('${image}')`}
                      alt={`campaign-${_id}-${idx}`}
                    />
                  ))}
                </Slider>
              </Box>
              <Box rounded='xl' shadow='md' mt={6} p={4} bg={bg}>
                <Grid templateColumns={['2fr 1fr']} gap={4}>
                  <Box>
                    <Heading
                      textAlign='center'
                      fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                      lineHeight={'110%'}
                      color={color.PRIMARY}
                      mb={4}
                    >
                      Th??ng tin chi ti???t
                    </Heading>
                    <Flex
                      flexDirection='column'
                      py={2}
                      borderBottom={'1px solid lightgray'}
                    >
                      <Text fontWeight={600} fontSize={'md'}>
                        T??n s???n ph???m
                      </Text>
                      <Text fontSize={'md'}>{title}</Text>
                    </Flex>
                    <Flex
                      flexDirection='column'
                      py={2}
                      borderBottom={'1px solid lightgray'}
                    >
                      <Text fontWeight={600} fontSize={'md'}>
                        Ho???t ?????ng ???????c t??i tr???
                      </Text>
                      <Link
                        href={`/hoat-dong/${campaign.slug}`}
                        fontSize={'md'}
                      >
                        {campaign.name}
                      </Link>
                    </Flex>
                    <Flex flexDirection='column' py={2}>
                      <Text fontWeight={600} fontSize={'md'}>
                        M?? t???
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
                      Gi?? kh???i ??i???m
                    </Heading>
                    <Text fontWeight={600}>{toVND(startPrice)}</Text>
                    <Divider />
                    <Heading
                      textAlign='center'
                      fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                      lineHeight={'110%'}
                      color={color.PRIMARY}
                      mb={2}
                    >
                      Cao nh???t
                    </Heading>
                    <Text fontWeight={600}>
                      {currentBid ? (
                        <>
                          <Text textAlign='center'>
                            {toVND(currentBid.amount)}
                          </Text>

                          <Flex
                            my={2}
                            p={2}
                            flexDirection='column'
                            align='center'
                          >
                            <Avatar size='sm' src={currentBid.author.picture} />
                            <Text mt={2} color={color.PRIMARY}>
                              {currentBid.author.name}
                            </Text>
                          </Flex>
                        </>
                      ) : (
                        'Ch??a c??'
                      )}
                    </Text>
                  </Stack>
                </Grid>
              </Box>
            </Box>

            <Flex flexDirection='column' rounded='xl' p={6} shadow='lg' bg={bg}>
              <Flex justify='center' align='center'>
                <CountDown time={finishedAt} />
              </Flex>
              <Box border='1px solid #eaeaea ' p={8} my={4} rounded='xl'>
                <Heading
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                  lineHeight={'110%'}
                  color={color.PRIMARY}
                  mb={6}
                >
                  ?????u gi?? ngay
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
                    <Box my={2}>
                      {user && user.id === author._id ? (
                        'B???n kh??ng th??? ?????u gi?? ch??nh m??nh'
                      ) : (
                        <>
                          <Button
                            disabled={loading}
                            isLoading={loading}
                            colorScheme='purple'
                            onClick={handleBid}
                            w='full'
                          >
                            {' '}
                            ?????u gi?? n??y{' '}
                          </Button>
                          <Alert mt={4} status='info'>
                            <AlertIcon />
                            Khi b???n ?????u gi??, vui l??ng ki???m tra l???i s??? d?? khi ?????u
                            gi??. N???u th??nh c??ng, b???n s??? b??? tr??? ti???n t??i kho???n
                            c???a m??nh, n???u c?? ng?????i ?????u gi?? h??n b???n s??? ???????c ho??n
                            l???i ti???n t????ng ???ng v???i gi?? ?????u c???a b???n tr?????c ????.
                          </Alert>
                        </>
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
                  Top nh???ng nh?? leo n??i
                </Heading>
                {/* list all top bidder */}
                <Box mt={4}>
                  {auction.bids?.length > 0 ? (
                    <List>
                      {auction.bids
                        .slice(0)
                        .reverse()
                        .map((bid, idx) => (
                          <ScaleFade key={idx} initialScale={0.9} in={true}>
                            <ListItem
                              borderBottom='1px solid lightgray'
                              className='fadeIn'
                              px={2}
                              py={4}
                              bgGradient={
                                user &&
                                user.id === bid.author._id &&
                                'linear(to-r, purple.100, purple.200, purple.300)'
                              }
                            >
                              <Flex align='center'>
                                <Box w={8}>
                                  {idx === 0 && (
                                    <GiLaurelsTrophy
                                      size='1.5rem'
                                      color='yellow'
                                    />
                                  )}
                                </Box>
                                <Avatar
                                  name={bid.author.name}
                                  src={bid.author.picture}
                                  size='sm'
                                  mr={4}
                                />
                                <Text fontWeight={600}>{bid.author.name}</Text>
                                <Text fontSize={'sm'} ml={4} color='green'>
                                  +{' '}
                                  {toVND(
                                    auction.bids.length > 0 &&
                                      bid.amount - startPrice > 0 &&
                                      bid.amount - startPrice
                                  )}
                                </Text>
                                <Text
                                  as='i'
                                  color='gray.500'
                                  ml={'auto'}
                                  fontSize='xs'
                                >
                                  {formatDistanceToNow(
                                    new Date(bid.createdAt),
                                    {
                                      locale: vi
                                    }
                                  )}{' '}
                                  tr?????c
                                </Text>
                              </Flex>
                            </ListItem>
                          </ScaleFade>
                        ))}
                    </List>
                  ) : (
                    <Flex justify='center' align='center' h='100%'>
                      Ch??a c?? ng?????i ?????u gi??
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
