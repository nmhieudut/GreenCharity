import {
  Avatar,
  Badge,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Td,
  Tr,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GiFinishLine } from 'react-icons/gi';
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';
import CustomAlertModal from '../common/Alert';
import { CampaignForm } from '../common/core/Campaign/CampaignForm';
import CustomDrawer from '../common/CustomDrawer';

function CampaignRow({
  campaign,
  onActive,
  onEnd,
  onDelete,
  onUpdate,
  loading
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const imageRef = useRef();
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
    <Tr
      cursor='pointer'
      _hover={{
        bg: bg
      }}
    >
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
      {/* <Drawer
           size='sm'
           isOpen={isOpen}
           placement='right'
           initialFocusRef={firstField}
           onClose={onClose}
         >
           <DrawerOverlay />
           <DrawerContent>
             <DrawerCloseButton />
             <DrawerHeader borderBottomWidth='1px'>{name}</DrawerHeader>
   
             <DrawerBody>
               <Stack spacing='24px'>
                 <FormControl id='userName'>
                   <Stack direction={['column', 'row']} spacing={6}>
                     <Center>
                       {url ? (
                         <Avatar size='xl' src={url} />
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
                     </Center>
                     <Center w='full'>
                       <Button
                         w='full'
                         onClick={() => imageRef.current.click()}
                         colorScheme='purple'
                         color='white'
                         variant='solid'
                       >
                         Đổi hình đại diện
                       </Button>
                       <input
                         ref={imageRef}
                         type='file'
                         className='hidden'
                         onChange={handleImageChange}
                       />
                     </Center>
                   </Stack>
                 </FormControl>
                 <FormControl id='name' isRequired>
                   <FormLabel htmlFor='name'>Tên</FormLabel>
                   <Input
                     ref={firstField}
                     name='name'
                     id='name'
                     value={name}
                     onChange={e => onChange(e)}
                   />
                 </FormControl>
                 <FormControl id='email'>
                   <FormLabel htmlFor='email'>Email</FormLabel>
                   <Input value={email} readOnly id='email' />
                 </FormControl>
                 <FormControl id='password' isRequired>
                   <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
                   <Input
                     onChange={e => onChange(e)}
                     type='password'
                     name='password'
                     id='password'
                     placeholder='Nhập mật khẩu mới'
                   />
                 </FormControl>
                 <FormControl id='balance' isRequired>
                   <FormLabel htmlFor='balance'>Số dư</FormLabel>
                   <Input
                     onChange={e => onChange(e)}
                     value={balance}
                     type='number'
                     name='balance'
                     id='balance'
                   />
                 </FormControl>
                 <FormControl id='phoneNumber' isRequired>
                   <FormLabel htmlFor='phoneNumber'>Số điện thoại</FormLabel>
                   <Input
                     onChange={e => onChange(e)}
                     value={phoneNumber}
                     type='number'
                     name='phoneNumber'
                     id='phoneNumber'
                   />
                 </FormControl>
               </Stack>
             </DrawerBody>
   
             <DrawerFooter borderTopWidth='1px'>
               <Stack spacing={6} direction={['column', 'row']}>
                 <Button
                   noLinear
                   variant='solid'
                   disabled={loading}
                   isLoading={loading}
                   onClick={onClose}
                 >
                   Hủy bỏ
                 </Button>
                 <Button
                   colorScheme='purple'
                   color='white'
                   variant='solid'
                   disabled={loading}
                   isLoading={loading}
                   onClick={onUpdateInfo}
                 >
                   Cập nhật
                 </Button>
               </Stack>
             </DrawerFooter>
           </DrawerContent>
         </Drawer> */}
    </Tr>
  );
}

export default CampaignRow;
