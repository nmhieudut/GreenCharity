import {
  Avatar,
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineComment,
  AiOutlineDelete
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GiFinishLine } from 'react-icons/gi';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';
import CustomAlertModal from '../common/Alert';
import { CampaignForm } from '../core/Form/CampaignForm';
import CustomDrawer from '../common/CustomDrawer';
import DonatorItem from '../core/Card/DonatorItem';
import Button from '../common/Button';
import NeedLogin from '../common/NeedLogin';
import CommentItem from '../core/Campaign/CommentItem';
import { useQuery } from 'react-query';
import { CommentService } from 'src/services/comment';
import { CampaignService } from 'src/services/campaign';
import { color } from 'src/constants/color';

function CampaignRow({ campaign, onRenewal, onActive, onEnd, onDelete }) {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const [image, setImage] = useState(null);
  const {
    _id,
    author,
    content,
    name,
    images,
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
        <Flex align='center' justify='space-between'>
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
          <Menu ml='auto'>
            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
            <MenuList>
              {status === 'pending' && (
                <CustomAlertModal
                  modalHeader={'Phê duyệt'}
                  modalBody='Bạn chắc chắn muốn duyệt hoạt động này?'
                  handleOk={() => onActive(_id)}
                >
                  <MenuItem icon={<AiOutlineCheckCircle />}>Phê duyệt</MenuItem>
                </CustomAlertModal>
              )}
              {status === 'active' && (
                <>
                  <CustomDrawer
                    size='lg'
                    showModalButtonText={
                      <MenuItem icon={<FiEdit />}>Sửa</MenuItem>
                    }
                    drawerHeader={name}
                    drawerBody={
                      <Tabs>
                        <TabList>
                          <Tab>Chỉnh sửa</Tab>
                          <Tab>Lượt quyên góp</Tab>
                          <Tab>Bình luận</Tab>
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
                    modalHeader={'Kết thúc'}
                    modalBody='Bạn chắc chắn muốn kết thúc hoạt động này?'
                    handleOk={() => onEnd(_id)}
                  >
                    <MenuItem icon={<GiFinishLine />}>Kết thúc</MenuItem>
                  </CustomAlertModal>
                </>
              )}
              {status === 'ended' && (
                <Renewal campaignId={_id} onRenewal={onRenewal} />
              )}
              <CustomAlertModal
                modalHeader={'Kết thúc'}
                modalBody='Bạn chắc chắn muốn kết thúc hoạt động này?'
                handleOk={() => onDelete(_id)}
              >
                <MenuItem icon={<AiOutlineDelete />}>Xóa</MenuItem>
              </CustomAlertModal>
            </MenuList>
          </Menu>
        </Flex>
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
      modalHeader={'Thêm thời hạn'}
      modalBody={
        <>
          <Text lineHeight={'110%'} mb={10}>
            Nhập số ngày muốn gia hạn (tối đa 30 ngày):
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
            <InputRightAddon>Ngày</InputRightAddon>
          </InputGroup>
        </>
      }
      handleOk={() => onRenewal(campaignId, days)}
    >
      <MenuItem icon={<AiOutlineDelete />}>Gia hạn thêm</MenuItem>
    </CustomAlertModal>
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
        title: 'Thành công',
        description: 'Bình luận đã được gửi',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: 'Thất bại',
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
        title: 'Thành công',
        description: 'Bình luận đã được xóa',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: 'Thất bại',
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
      {comments?.length === 0 && <div>Chưa có bình luận nào</div>}
    </Box>
  );
}
