import {
  Avatar,
  Badge,
  Flex,
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
  Stack,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GiFinishLine } from 'react-icons/gi';
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';
import CustomAlertModal from '../common/Alert';
import { CampaignForm } from '../common/core/Campaign/CampaignForm';
import CustomDrawer from '../common/CustomDrawer';

function CampaignRow({ campaign, onRenewal, onActive, onEnd, onDelete }) {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const [campaignData, setCampaignData] = useState(campaign);
  console.log('====', campaignData);
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
  } = campaignData;

  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;

  console.log('----', campaignData);
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
      <Td>{VNDFormatter(goal)}</Td>
      <Td>
        {VNDFormatter(donated_amount)} ({percent})
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
            {convertStatusToString(status)}
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
                      <CampaignForm isEdited initialValues={campaignData} />
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
