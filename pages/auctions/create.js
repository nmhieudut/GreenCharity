import {
  Box,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VisuallyHidden
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Flatpickr from 'react-flatpickr';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import withAuth from 'src/HOCs/withAuth';
import { storage } from 'src/libs/firebase';
import { AuctionService } from 'src/services/auction';
import { CampaignService } from 'src/services/campaign';
import { ModalActions } from 'src/store/modal/action';
import { DateUtils } from 'src/utils/date';
import { VNDFormatter } from 'src/utils/number';

function Create() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(state => state.auth.currentUser);
  const { data, isLoading, error } = useQuery('own campaigns', () =>
    CampaignService.getByAuthor(user.id)
  );
  const { campaigns } = data || [];
  const activeCampaigns = campaigns?.filter(cam => cam.status === 'active');
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auctionPayload, setPayloadAuction] = useState({
    title: '',
    description: '',
    startPrice: 0,
    images: [],
    campaign: '',
    finishedAt: null
  });
  const { title, description, startPrice, images, finishedAt } = auctionPayload;
  console.log('jdjasdijasdfjoiasdjio', auctionPayload);

  useEffect(() => {
    if (imageFiles.length > 0) {
      handleUpload();
    }
  }, [imageFiles]);

  const onChange = e => {
    setPayloadAuction({
      ...auctionPayload,
      [e.target.id]: e.target.value
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setImageFiles(acceptedFiles);
    }
  }, []);

  const handleUpload = () => {
    const promises = [];
    setLoading(true);
    imageFiles.map(image => {
      const uploadTask = storage.ref(`auctions/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error);
        },
        async () => {
          await storage
            .ref('auctions')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setLoading(false);
              setPayloadAuction({
                ...auctionPayload,
                images: [...images, url]
              });
            });
        }
      );
    });

    Promise.all(promises)
      .then(values => {
        console.log('All uploaded images was done');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onRemove = item => {
    setPayloadAuction({
      ...auctionPayload,
      images: images.filter(img => img !== item)
    });
  };

  const onCreate = async e => {
    e.preventDefault();
    dispatch(ModalActions.setModalOn());
    try {
      await AuctionService.createAuction(auctionPayload);
      setPayloadAuction({
        title: '',
        description: '',
        startPrice: 0,
        images: [],
        campaign: '',
        finishedAt: null
      });
      toast({
        title: 'Tạo đấu giá thành công',
        description: 'Yêu cầu tạo đấu giá đã được gửi đi thành công',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Yêu cầu tạo thất bại',
        description: e.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      dispatch(ModalActions.setModalOff());
    }
  };

  return (
    <SectionContainer>
      <Head>
        <title>Tạo mới đấu giá</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
          mb={14}
        >
          Tạo phiên đấu giá
        </Heading>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box className='w-full md:mb-0'>
              <Box className='rounded-sm shadow' overflow='hidden'>
                <Box
                  backgroundImage={images[0]}
                  backgroundSize='cover'
                  backgroundRepeat='no-repeat'
                  backgroundPosition='center'
                  h={'12rem'}
                />

                <Box className='px-4 pt-4 h-auto md:h-40 lg:h-40'>
                  <Flex mb={2} alignItems='center' justify='space-between'>
                    <Flex color={'gray.500'} align='center' justify='end'>
                      <BsClock className='mr-2' size='.75rem' />
                      {!DateUtils.isExpired(finishedAt) ? (
                        <Text color={'gray.500'} as={'b'}>
                          {DateUtils.calculateDaysFromNow(finishedAt)} ngày
                        </Text>
                      ) : (
                        <Text color={'red.500'} as={'b'}>
                          Hết hạn
                        </Text>
                      )}
                    </Flex>
                  </Flex>

                  <Stack>
                    <Heading fontSize={'lg'} fontFamily={'bold'}>
                      {title}
                    </Heading>
                    <Box className='text-gray-600 leading-relaxed block'>
                      <div className='text-sm line-clamp'>{description} </div>
                    </Box>
                  </Stack>
                  <Flex fontSize='sm' className='mt-4' justify='space-between'>
                    <Text fontFamily={'bold'}>Khởi điểm:</Text>
                    <Text>{VNDFormatter(startPrice)} đ</Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              onSubmit={onCreate}
              shadow='base'
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl
                    as={GridItem}
                    id='title'
                    colSpan={[3, 2]}
                    isRequired
                  >
                    <FormLabel
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Tiêu đề
                    </FormLabel>
                    <InputGroup size='sm'>
                      <Input
                        type='text'
                        onChange={onChange}
                        placeholder='Giáp thiên nhiên'
                        focusBorderColor='brand.400'
                        rounded='md'
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>
                <FormControl id='description' mt={1} isRequired>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Miêu tả
                  </FormLabel>
                  <Textarea
                    placeholder='Tăng thêm 1 slot trên bàn cờ'
                    onChange={onChange}
                    mt={1}
                    rows={3}
                    shadow='sm'
                    focusBorderColor='brand.400'
                    fontSize={{ sm: 'sm' }}
                  />
                </FormControl>
                <FormControl id='startPrice' mt={1} isRequired>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Giá khởi điểm
                  </FormLabel>
                  <InputGroup mt={1} size='sm'>
                    <Input
                      type='number'
                      onChange={onChange}
                      placeholder='Giá đặt'
                      focusBorderColor='brand.400'
                      rounded='md'
                    />
                    <InputRightAddon>VND</InputRightAddon>
                  </InputGroup>
                </FormControl>

                <FormControl id='campaign' isRequired>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Đấu giá cho chiến dịch nào
                  </FormLabel>
                  <Flex alignItems='center' mt={1}>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <Select
                        name='campaign'
                        placeholder='Chọn chiến dịch'
                        mt={1}
                        focusBorderColor='brand.400'
                        onChange={onChange}
                        shadow='sm'
                        size='sm'
                        w='full'
                        rounded='md'
                      >
                        {activeCampaigns?.map(cam => (
                          <option key={cam.id} value={cam._id}>
                            {cam.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Flex>
                </FormControl>
                <FormControl id='finishedAt' isRequired>
                  <FormLabel>Ngày hết hạn</FormLabel>
                  <InputGroup>
                    <Flatpickr
                      options={{ minDate: new Date(), dateFormat: 'Y/m/d' }}
                      onChange={([date]) => {
                        setPayloadAuction({
                          ...auctionPayload,
                          finishedAt: date
                        });
                      }}
                      render={({ value, ...props }, ref) => {
                        return (
                          <Input
                            name='3'
                            value={value}
                            ref={ref}
                            focusBorderColor={color.PRIMARY}
                          />
                        );
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Hình ảnh
                  </FormLabel>
                  <Flex
                    {...getRootProps()}
                    mt={1}
                    justify='center'
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={useColorModeValue('gray.300', 'gray.500')}
                    borderStyle='dashed'
                    rounded='md'
                  >
                    <Stack spacing={1} textAlign='center'>
                      <Icon
                        mx='auto'
                        boxSize={12}
                        color={useColorModeValue('gray.400', 'gray.500')}
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 48 48'
                        aria-hidden='true'
                      >
                        <path
                          d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </Icon>

                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          <Flex fontSize='sm' alignItems='baseline'>
                            <chakra.label
                              htmlFor='file-upload'
                              cursor='pointer'
                              rounded='md'
                              fontSize='md'
                              pos='relative'
                            >
                              <span>Upload files</span>
                              <VisuallyHidden>
                                <Input
                                  {...getInputProps()}
                                  id='file-upload'
                                  name='file-upload'
                                  type='file'
                                />
                              </VisuallyHidden>
                            </chakra.label>
                            <Text pl={1}>or drag and drop</Text>
                          </Flex>
                          <Text fontSize='xs'>PNG, JPG, GIF up to 10MB</Text>
                        </>
                      )}
                    </Stack>
                  </Flex>
                </FormControl>
                <Text>Xem trước hình ảnh</Text>
                <Grid
                  templateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(4, 1fr)'
                  ]}
                  gap={2}
                  py={4}
                >
                  {images?.map((img, idx) => (
                    <Flex
                      key={idx}
                      justifyContent='center'
                      pos='relative'
                      border='1px dashed black'
                    >
                      <Image
                        src={img}
                        alt=''
                        className='h-24 object-cover object-center transition duration-300 px-2'
                      />
                      <IconButton
                        position='absolute'
                        cursor='pointer'
                        colorScheme='purple'
                        size='xs'
                        top={0}
                        right={0}
                        onClick={() => onRemove(img)}
                        rounded='none'
                        icon={<AiOutlineMinus className='text-white' />}
                      />
                    </Flex>
                  ))}
                </Grid>
              </Stack>

              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign='right'
              >
                <Button
                  type='submit'
                  colorScheme='purple'
                  _focus={{ shadow: '' }}
                  fontWeight='md'
                >
                  Bắt đầu
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden='true'>
        <Box py={5}>
          <Box
            borderTop='solid 1px'
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}

export default withAuth(Create);
