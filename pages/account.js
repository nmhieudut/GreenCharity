import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { AiOutlineEye } from 'react-icons/ai';
import { FcCalendar, FcPhone } from 'react-icons/fc';
import { FiEdit3 } from 'react-icons/fi';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import ChargeItem from 'src/components/common/ChargeItem';
import SectionContainer from 'src/components/common/SectionContainer';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import { meSideBar } from 'src/constants/sidebar';
import withAuth from 'src/HOCs/withAuth';
import { useStorage } from 'src/hooks/useStorage';
import { CampaignService } from 'src/services/campaign';
import { UserService } from 'src/services/user';
import { DateUtils } from 'src/utils/date';
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';

function AccountPage(props) {
  const { user } = props;
  const router = useRouter();
  const imageRef = useRef();
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const [info, setInfo] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth
  });
  const { name, phoneNumber, dateOfBirth } = info;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { url, uploadLoading } = useStorage(user.picture, image, 'avatars');

  const handleChange = (field, value) => {
    setInfo({
      ...info,
      [field]: value
    });
  };

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onUpdateInfo = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await UserService.update(user.id, Object.assign(info, { picture: url }));
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Cập nhật tài khoản thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer>
      <Head>
        <title>Tài khoản</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box w={'full'} mx={'auto'} bg={bg} border='1px solid #d9d9d9'>
        <Tabs
          isFitted
          isLazy
          colorScheme='purple'
          orientation='vertical'
          minH={'100vh'}
        >
          <TabList w='240px' borderRight='1px solid #d9d9d9'>
            {meSideBar.map((item, index) => (
              <Tab
                key={index}
                width='full'
                _selected={{ color: 'white', bg: color.PRIMARY }}
              >
                <Flex w='full' alignItems='center'>
                  <Icon key={index} as={item.icon} fontSize='1rem' />
                  <Text ml={2} fontSize='sm'>
                    {item.title}
                  </Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel
              maxW={'3xl'}
              mx='auto'
              display='flex'
              flexDirection='column'
              alginItem='center'
            >
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                justify='space-between'
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={4}
                  align='center'
                >
                  <Box className='flex justify-end relative w-24 h-24'>
                    {url ? (
                      <Image
                        className='absolute h-full w-full rounded-full object-cover object-center'
                        src={url}
                        alt={user.name}
                      />
                    ) : (
                      uploadLoading && (
                        <Spinner
                          color={color.PRIMARY}
                          thickness='4px'
                          speed='0.65s'
                          emptyColor='gray.200'
                          size='xl'
                        />
                      )
                    )}
                    <IconButton
                      colorScheme='purple'
                      rounded='full'
                      pos='absolute'
                      size='sm'
                      bottom={0}
                      right={0}
                      onClick={() => imageRef.current.click()}
                      icon={<FiEdit3 />}
                    />
                    <input
                      ref={imageRef}
                      type='file'
                      className='hidden'
                      onChange={handleImageChange}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight={600} fontSize='lg'>
                      {user.name}
                    </Text>
                    <Text as={'i'} fontSize='sm'>
                      {user.email}
                    </Text>
                  </Box>
                </Stack>

                <Flex flexDir={'column'}>
                  <Text fontSize='lg'>
                    Số dư: <b> {VNDFormatter(user.balance)} VND</b>
                  </Text>
                  <Button
                    mt={2}
                    colorScheme={'purple'}
                    type='submit'
                    onClick={() => router.push('/checkout')}
                  >
                    Nạp tiền
                  </Button>
                </Flex>
              </Flex>
              <form onSubmit={onUpdateInfo} className='w-full'>
                <div className='my-8'></div>
                <FormControl className='flex flex-col md:flex-row md:items-center md:justify-between'>
                  <FormLabel className='w-1/2 px-4 text-right text-sm'>
                    Email
                  </FormLabel>
                  <Input
                    className='max-w-xl'
                    value={user.email}
                    focusBorderColor={color.PRIMARY}
                    isReadOnly
                  />
                </FormControl>
                <div className='my-8' />
                <FormControl
                  className='flex flex-col md:flex-row md:items-center md:justify-between'
                  isRequired
                >
                  <FormLabel className='w-1/2 px-4 text-right text-sm'>
                    Tên
                  </FormLabel>
                  <Input
                    isDisabled={loading}
                    className='max-w-xl'
                    focusBorderColor={color.PRIMARY}
                    value={name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </FormControl>
                <div className='my-8'></div>
                <FormControl
                  className='flex flex-col md:flex-row md:items-center md:justify-between'
                  isRequired
                >
                  <FormLabel className='w-1/2 px-4 text-right text-sm'>
                    Điện thoại
                  </FormLabel>
                  <InputGroup className='max-w-xl'>
                    <InputLeftElement pointerEvents='none'>
                      <FcPhone color='gray.300' />
                    </InputLeftElement>
                    <Input
                      isDisabled={loading}
                      value={phoneNumber}
                      placeholder='Nhập số điện thoại'
                      focusBorderColor={color.PRIMARY}
                      onChange={e =>
                        handleChange('phoneNumber', e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>
                <div className='my-8'></div>
                <FormControl
                  className='flex flex-col md:flex-row md:items-center md:justify-between'
                  isRequired
                >
                  <FormLabel className='w-1/2 px-4 text-right text-sm'>
                    Sinh nhật
                  </FormLabel>
                  <InputGroup className='max-w-xl'>
                    <InputLeftElement pointerEvents='none'>
                      <FcCalendar />
                    </InputLeftElement>
                    <Flatpickr
                      options={{ dateFormat: 'Y/m/d' }}
                      value={dateOfBirth}
                      onChange={([date]) =>
                        handleChange('dateOfBirth', format(date, 'yyyy/MM/dd'))
                      }
                      render={({ value, ...props }, ref) => {
                        return (
                          <Input
                            isDisabled={loading}
                            placeholder='Chọn ngày'
                            focusBorderColor={color.PRIMARY}
                            pl={10}
                            value={value}
                            ref={ref}
                          />
                        );
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <div className='mt-4'></div>
                <div className='mt-8' isDisable={loading}></div>
                <Box textAlign='right'>
                  <Button
                    colorScheme={'purple'}
                    type='submit'
                    isLoading={loading}
                  >
                    Cập nhật
                  </Button>
                </Box>
              </form>
            </TabPanel>
            <TabPanel>
              <RsPassword user={user} />
            </TabPanel>
            <TabPanel>
              <CampaignTab user={user} />
            </TabPanel>
            <TabPanel>
              <DonateTab user={user} />
            </TabPanel>
            <TabPanel>
              <ChargeTab user={user} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SectionContainer>
  );
}

export default withAuth(AccountPage);

function RsPassword(props) {
  const { user } = props;
  const toast = useToast();
  const [passwordPayload, setPasswordPayload] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { currentPassword, newPassword, confirmPassword } = passwordPayload;
  const onChange = (key, value) => {
    setPasswordPayload({
      ...passwordPayload,
      [key]: value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: 'Mật khẩu mới không khớp',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
      setLoading(false);
      return;
    }
    try {
      const payload = {
        currentPassword,
        newPassword
      };
      await UserService.resetPassword(user.id, payload);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Cập nhật mật khẩu thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    // reset password form
    <form onSubmit={onSubmit} className='w-full'>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Mật khẩu cũ
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={currentPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('currentPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Mật khẩu mới
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={newPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('newPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Nhập lại mật khẩu mới
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={confirmPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('confirmPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <Box textAlign='right'>
        <Button colorScheme={'purple'} type='submit' isLoading={loading}>
          Đổi mật khẩu
        </Button>
      </Box>
    </form>
  );
}

function CampaignTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery(['campaigns'], () =>
    CampaignService.getByAuthor(user.id)
  );
  const { campaigns } = data || [];
  return (
    <>
      <Head>
        <title>Hoạt động của tôi</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box py={4} w='full'>
        {isLoading && <Loading />}
        {data && (
          <Table colorScheme='purple' size='sm'>
            <Thead>
              <Tr>
                <Th>Tên hoạt động</Th>
                <Th>Mục tiêu</Th>
                <Th>Đạt được</Th>
                <Th>Ngày kết thúc</Th>
                <Th>Còn lại</Th>
                <Th>Trạng thái</Th>
                <Th>Chi tiết</Th>
              </Tr>
            </Thead>
            <Tbody fontSize='sm'>
              {campaigns?.map(campaign => (
                <Tr key={campaign._id}>
                  <Td>{campaign.name}</Td>
                  <Td isNumeric>{VNDFormatter(campaign.goal)}</Td>
                  <Td isNumeric>{VNDFormatter(campaign.donated_amount)}</Td>
                  <Td>{format(new Date(campaign.finishedAt), 'dd/MM/yyyy')}</Td>
                  <Td>
                    {DateUtils.calculateDaysFromNow(campaign.finishedAt)} ngày
                  </Td>
                  <Td>
                    <Tag
                      colorScheme={
                        campaign.status === 'pending'
                          ? 'purple'
                          : campaign.status === 'active'
                          ? 'green'
                          : 'red'
                      }
                    >
                      {convertStatusToString(campaign.status)}
                    </Tag>
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<AiOutlineEye />}
                      colorScheme='pink'
                      variant='solid'
                      onClick={() => router.push(`/campaigns/${campaign.slug}`)}
                    >
                      Xem
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        )}
      </Box>
    </>
  );
}

function DonateTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery('donations', () =>
    UserService.getDonationsHistory(user.id)
  );
  const { donations } = data || {};
  console.log(donations);
  return (
    <>
      <Head>
        <title>Lịch sử quyên góp</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box py={4} w='full'>
        {isLoading && <Loading />}
        {data && (
          <Table colorScheme='purple'>
            <Thead>
              <Tr>
                <Th>Tên hoạt động</Th>
                <Th isNumeric>Số tiền đã quyên góp (VND)</Th>
                <Th>Ngày quyên góp</Th>
                <Th>Lời nhắn </Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody fontSize='sm'>
              {donations?.map(donation => (
                <Tr key={donation._id}>
                  <Td>{donation.campaignInfo.name}</Td>
                  <Td isNumeric>{VNDFormatter(donation.amount)}</Td>
                  <Td>{format(new Date(donation.createdAt), 'dd/MM/yyyy')}</Td>
                  <Td>{donation.message}</Td>
                  <Td>
                    <Stack direction='row' spacing={4}>
                      <Button
                        leftIcon={<AiOutlineEye />}
                        colorScheme='pink'
                        variant='solid'
                        onClick={() =>
                          router.push(
                            `/campaigns/${donation.campaignInfo.slug}`
                          )
                        }
                      >
                        Xem
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Tổng sô tiền</Th>
                <Th isNumeric>
                  {VNDFormatter(
                    donations?.reduce(
                      (total, currentVal) => total + currentVal.amount,
                      0
                    )
                  )}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Box>
    </>
  );
}

function ChargeTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery('transactions', () =>
    UserService.getTransactions(user.id)
  );
  const { histories } = data || {};
  return (
    <>
      <Head>
        <title>Lịch sử giao dịch</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box my='4' w='full'>
        {isLoading && <Loading />}
        {histories?.map((history, idx) => (
          <ChargeItem key={history._id} history={history} idx={idx} />
        ))}
      </Box>
    </>
  );
}
