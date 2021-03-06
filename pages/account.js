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
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { FcCalendar, FcPhone } from 'react-icons/fc';
import { FiEdit3 } from 'react-icons/fi';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import CampaignTab from 'src/components/user/CampaignTab';
import ChargeTab from 'src/components/user/ChargeTab';
import DonateTab from 'src/components/user/DonationsTab';
import RsPassword from 'src/components/user/ResetPassword';
import { color } from 'src/constants/color';
import { meSideBar } from 'src/constants/sidebar';
import withAuth from 'src/HOCs/withAuth';
import { useStorage } from 'src/hooks/useStorage';
import { UserService } from 'src/services/user';
import { toVND } from 'src/utils/number';

function AccountPage(props) {
  const { user } = props;
  const router = useRouter();
  const imageRef = useRef();
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const [info, setInfo] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber
  });
  const { name, phoneNumber } = info;
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
    try {
      setLoading(true);
      await UserService.update(user.id, Object.assign(info, { picture: url }));
      toast({
        position: 'top-right',
        title: 'Th??nh c??ng',
        description: 'C???p nh???t t??i kho???n th??nh c??ng',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'L???i',
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
        <title>T??i kho???n</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box w={'full'} mx={'auto'} bg={bg} border='1px solid #d9d9d9'>
        <Tabs isLazy colorScheme='purple' orientation='vertical'>
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
                    S??? d??: <b> {toVND(user.balance)} VND</b>
                  </Text>
                  <Button
                    mt={2}
                    colorScheme={'purple'}
                    type='submit'
                    onClick={() => router.push('/checkout')}
                  >
                    N???p ti???n
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
                    T??n
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
                    ??i???n tho???i
                  </FormLabel>
                  <InputGroup className='max-w-xl'>
                    <InputLeftElement pointerEvents='none'>
                      <FcPhone color='gray.300' />
                    </InputLeftElement>
                    <Input
                      isDisabled={loading}
                      value={phoneNumber}
                      placeholder='Nh???p s??? ??i???n tho???i'
                      focusBorderColor={color.PRIMARY}
                      onChange={e =>
                        handleChange('phoneNumber', e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>
                <div className='mt-4'></div>
                <div className='mt-8' isDisable={loading}></div>
                <button aria-hidden={true} type='submit'></button>
                <Box textAlign='right'>
                  <Button
                    colorScheme={'purple'}
                    type='button'
                    isLoading={loading}
                    onClick={onUpdateInfo}
                  >
                    C???p nh???t
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
