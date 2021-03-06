import {
  Avatar,
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineComment,
  AiOutlineDelete
} from 'react-icons/ai';
import { BsFilePdfFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaFileExport } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { GiFinishLine } from 'react-icons/gi';
import { GrView } from 'react-icons/gr';
import { MdOutlineAutorenew } from 'react-icons/md';
import { useQuery } from 'react-query';
import Pdf from 'react-to-pdf';
import { color } from 'src/constants/color';
import { AdminService } from 'src/services/admin';
import { CampaignService } from 'src/services/campaign';
import { CommentService } from 'src/services/comment';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';
import CustomAlertModal from '../common/Alert';
import Button from '../common/Button';
import CustomDrawer from '../common/CustomDrawer';
import CommentItem from '../core/Campaign/CommentItem';
import DonatorItem from '../core/Card/DonatorItem';
import { CampaignForm } from '../core/Form/CampaignForm';

function CampaignRow({ campaign, onRenewal, onActive, onEnd, onDelete }) {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const {
    _id,
    author,
    name,
    slug,
    donated_amount,
    goal,
    status,
    finishedAt,
    createdAt
  } = campaign;

  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;

  return (
    <Tr cursor='pointer' _hover={{ bg }}>
      <Td>{name}</Td>
      <Td py={0}>
        <Stack direction='row' align='center'>
          <Avatar name={author.name} size='sm' src={author.picture} />
          <Heading as='h3' size='sm'>
            {author.name}
          </Heading>
        </Stack>
      </Td>

      <Td>{format(new Date(createdAt), 'dd/MM/yyyy')}</Td>
      <Td>{format(new Date(finishedAt), 'dd/MM/yyyy')}</Td>
      <Td>{toVND(goal)}</Td>
      <Td>
        {toVND(donated_amount)} ({percent})
      </Td>
      <Td>
        <Badge
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
      </Td>
      <Td>
        <Menu ml='auto'>
          <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
          <MenuList>
            <MenuItem
              icon={<GrView />}
              onClick={() => window.open(`/hoat-dong/${slug}`, '_blank')}
            >
              Xem
            </MenuItem>
            {status !== 'pending' && (
              <CustomDrawer
                size='lg'
                showModalButtonText={
                  <MenuItem icon={<FaFileExport />}>Xu???t sao k??</MenuItem>
                }
                drawerHeader={'B??o c??o t??i ch??nh'}
                drawerBody={<ER campaign={campaign} />}
              />
            )}
            {status === 'pending' && (
              <CustomAlertModal
                modalHeader={'Ph?? duy???t'}
                modalBody='B???n ch???c ch???n mu???n duy???t ho???t ?????ng n??y?'
                handleOk={() => onActive(_id)}
              >
                <MenuItem icon={<AiOutlineCheckCircle />}>Ph?? duy???t</MenuItem>
              </CustomAlertModal>
            )}
            {status === 'active' && (
              <>
                <CustomDrawer
                  size='lg'
                  showModalButtonText={
                    <MenuItem icon={<FiEdit />}>S???a</MenuItem>
                  }
                  drawerHeader={name}
                  drawerBody={
                    <Tabs>
                      <TabList>
                        <Tab>Ch???nh s???a</Tab>
                        <Tab>L?????t quy??n g??p</Tab>
                        <Tab>B??nh lu???n</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <CampaignForm isEdited initialValues={campaign} />
                        </TabPanel>
                        <TabPanel>
                          <Donator campaignId={_id} />
                        </TabPanel>
                        <TabPanel>
                          <Comment campaignId={_id} />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  }
                />

                <CustomAlertModal
                  modalHeader={'K???t th??c'}
                  modalBody='B???n ch???c ch???n mu???n k???t th??c ho???t ?????ng n??y?'
                  handleOk={() => onEnd(_id)}
                >
                  <MenuItem icon={<GiFinishLine />}>K???t th??c</MenuItem>
                </CustomAlertModal>
              </>
            )}
            {status === 'ended' && (
              <Renewal campaignId={_id} onRenewal={onRenewal} />
            )}
            <CustomAlertModal
              modalHeader={'K???t th??c'}
              modalBody='B???n ch???c ch???n mu???n k???t th??c ho???t ?????ng n??y?'
              handleOk={() => onDelete(_id)}
            >
              <MenuItem icon={<AiOutlineDelete />}>X??a</MenuItem>
            </CustomAlertModal>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default CampaignRow;

function Renewal({ campaignId, onRenewal }) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    setDays(0);
  }, []);

  return (
    <CustomAlertModal
      modalHeader={'Th??m th???i h???n'}
      modalBody={
        <>
          <Text lineHeight={'110%'} mb={10}>
            Nh???p s??? ng??y mu???n gia h???n (t???i ??a 30 ng??y):
          </Text>

          <InputGroup size='sm'>
            <NumberInput
              size='sm'
              defaultValue={0}
              min={0}
              max={30}
              value={days}
              onChange={e => setDays(e)}
            >
              <NumberInputField focusBorderColor='red.200' />
              <NumberInputStepper>
                <NumberIncrementStepper
                  bg='green.200'
                  _active={{ bg: 'green.300' }}
                >
                  +
                </NumberIncrementStepper>
                <NumberDecrementStepper
                  bg='pink.200'
                  _active={{ bg: 'pink.300' }}
                >
                  -
                </NumberDecrementStepper>
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>Ng??y</InputRightAddon>
          </InputGroup>
        </>
      }
      handleOk={() => onRenewal(campaignId, days)}
    >
      <MenuItem icon={<MdOutlineAutorenew />}>Gia h???n th??m</MenuItem>
    </CustomAlertModal>
  );
}

function Donator({ campaignId }) {
  const { data, isLoading, error, isError } = useQuery('donators', () =>
    CampaignService.fetchDonations(campaignId)
  );
  const { donations } = data || [];

  return (
    <Box>
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
      {donations?.length === 0 && <div>Ch??a c?? ng?????i quy??n g??p n??o</div>}
    </Box>
  );
}

function Comment({ campaignId }) {
  const toast = useToast();
  const [value, setValue] = useState('');
  const [refetch, setRefetch] = useState(0);
  const { data, isLoading, isError, error } = useQuery(
    ['comments', refetch],
    () => CampaignService.fetchComments(campaignId)
  );
  const { comments } = data || [];
  const bg = useColorModeValue('gray.100', 'gray.900');

  async function handleComment(e) {
    e.preventDefault();
    try {
      await CommentService.create(campaignId, value).then(res => {
        setRefetch(r => r + 1);
        setValue('');
      });
      toast({
        title: 'Th??nh c??ng',
        description: 'B??nh lu???n ???? ???????c g???i',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: 'Th???t b???i',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  async function handleDeleteComment(id) {
    try {
      await CommentService.delete(id).then(res => {
        setRefetch(r => r + 1);
      });
      toast({
        title: 'Th??nh c??ng',
        description: 'B??nh lu???n ???? ???????c x??a',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: 'Th???t b???i',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  return (
    <Box>
      <form onSubmit={handleComment}>
        <Box bg={bg} p={4} rounded='xl' mb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Vi???t b??nh lu???n</FormLabel>
            <Input
              onChange={e => setValue(e.target.value)}
              value={value}
              id='name'
              placeholder='Ca??m nghi?? cu??a ba??n'
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
            B??nh lu???n
          </Button>
        </Box>
      </form>

      {isLoading ? (
        <Box padding='4' rounded={'xl'} bg='gray.50' my={4}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
      ) : (
        comments?.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            hasPermission={true}
            onDelete={handleDeleteComment}
          />
        ))
      )}
      {comments?.length === 0 && <div>Ch??a c?? b??nh lu???n n??o</div>}
    </Box>
  );
}

function ER({ campaign }) {
  const provinceString = campaign.province.province_name;
  const districtString =
    campaign.district && `, ${campaign.district.district_name}, `;
  const wardString = campaign.ward && `${campaign.ward.ward_name}.`;
  const addressString = `${provinceString}${districtString}${wardString}`;
  const dateRangeList = DateUtils.getDateRange(
    campaign.createdAt,
    campaign.finishedAt ? campaign.finishedAt : new Date()
  );
  const [dateRange, setDateRange] = useState('all-all');
  const ref = useRef();
  const { data, isLoading } = useQuery(['disbursements', dateRange], () =>
    AdminService.getDonationsByCampaign(campaign._id, dateRange)
  );
  const { donations } = data || [];
  const { name, author, createdAt } = campaign || {};
  const handleChange = e => {
    setDateRange(e.target.value);
  };

  return (
    <>
      <Select
        defaultValue={'all-all'}
        onChange={handleChange}
        variant='filled'
        focusBorderColor={color.PRIMARY}
      >
        <option value={'all-all'}>T???t c???</option>
        {dateRangeList
          .slice(0)
          .reverse()
          .map((dateRange, i) => {
            const spreadDateRange = dateRange.split('-');
            return (
              <option key={i} value={dateRange}>
                Th??ng {spreadDateRange[1]} / {spreadDateRange[0]}
              </option>
            );
          })}
      </Select>

      <Box mt={4}>
        {isLoading && (
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        )}
      </Box>
      <Pdf targetRef={ref} filename='sao-ke.pdf'>
        {({ toPdf }) => (
          <Button
            mt={4}
            colorScheme={'pink'}
            leftIcon={<BsFilePdfFill />}
            onClick={toPdf}
          >
            Sao k??
          </Button>
        )}
      </Pdf>
      <Box
        ref={ref}
        position='absolute'
        zIndex={100}
        width='100%'
        height='min-content'
        top={'100%'}
        backgroundColor='white'
        left={0}
        py={12}
        px={4}
      >
        <Box textAlign='center'>
          <Heading fontSize='1.2rem'>
            C???ng h??a x?? h???i ch??? ngh??a Vi???t Nam
          </Heading>
          <Heading fontSize='1.2rem' textDecoration='underline'>
            ?????c l???p - T??? do - H???nh ph??c
          </Heading>
        </Box>

        <Box textAlign='center' py={4}>
          <Heading fontSize='1.2rem'>B??o c??o t??i ch??nh</Heading>
        </Box>
        <Text fontSize='sm' mb={2}>
          Ng??y th???c hi???n: {DateUtils.toDate(new Date())}
        </Text>
        <Text fontSize='sm' mb={2}>
          T??n d??? ??n: {name}
        </Text>
        <Text fontSize='sm' mb={2}>
          Ch??? d??? ??n: {author.name}
        </Text>
        <Text fontSize='sm' mb={2}>
          S??T: {author.phoneNumber}
        </Text>
        <Text fontSize='sm' mb={2}>
          ?????a ch???: {addressString}
        </Text>
        <Text fontSize='sm' mb={2}>
          Ng??y v???n ?????ng: {DateUtils.toDate(new Date(createdAt))}{' '}
        </Text>
        <div className='pb-4' />
        <table>
          <thead>
            <tr>
              <th>Ng??y</th>
              <th>N???i dung</th>
              <th>Thu</th>
              <th>Chi</th>
              <th>T???n</th>
            </tr>
          </thead>
          <tbody>
            {donations?.map(
              ({ createdAt, message, amount, action, lastBalance, _id }) => (
                <tr key={_id} bg={action === 'expenditures' && 'lightgray'}>
                  <td>{DateUtils.toDate(createdAt)}</td>
                  <td>{message}</td>
                  <td>{action === 'receipts' ? toVND(amount) : 0}</td>
                  <td>{action === 'expenditures' ? toVND(amount) : 0}</td>
                  <td>{toVND(lastBalance)}</td>
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>T???ng</th>
              <th></th>
              <th>
                <b>
                  {toVND(
                    donations
                      ?.filter(({ action }) => action === 'receipts')
                      .reduce((sum, item) => sum + parseInt(item.amount), 0)
                  )}
                </b>
              </th>
              <th>
                <b>
                  {toVND(
                    donations
                      ?.filter(({ action }) => action === 'expenditures')
                      .reduce((sum, item) => sum + parseInt(item.amount), 0)
                  )}
                </b>
              </th>
            </tr>
          </tfoot>
        </table>
        <Flex flexDir='column' align='flex-end' my={4}>
          <Box mr={16}>
            <Heading fontSize='1.2rem'>
              ???? N???ng, {DateUtils.toDate(new Date())}
            </Heading>
            <Heading my={2} fontSize='1rem' textAlign='center'>
              Gi??m ?????c
            </Heading>
          </Box>
          <Image src='/images/signature.png' alt='signature' w='60' />
          <Text mr={20}>Nguy???n Minh Hi???u</Text>
        </Flex>
      </Box>
      <style jsx>{`
        table,
        th,
        td {
          border: 1px solid black;
          padding: 0.5rem;
          text-align: center;
        }
        table {
          width: 100%;
        }
      `}</style>
    </>
  );
}
