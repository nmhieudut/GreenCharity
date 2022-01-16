import {
  Avatar,
  Badge,
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useRef } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import UserForm from 'src/components/core/User/UserForm';
import { toVND } from 'src/utils/number';

export default function UserRow({ user, onToggleActive, onDeleteUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const bg = useColorModeValue('gray.100', 'gray.800');

  const { _id, email, name, picture, balance, role, isActive, createdAt } =
    user;

  return (
    <Tr
      cursor='pointer'
      _hover={{
        bg: bg
      }}
    >
      <Td>
        <Flex>
          <Avatar name={name} size='sm' src={picture} />
          <Box ml='3'>
            <Text fontWeight='bold'>{name}</Text>
            <Text fontSize='sm'> {email}</Text>
          </Box>
        </Flex>
      </Td>
      <Td>
        <Badge>{role === 'user' ? 'Thành viên' : 'Khác'}</Badge>
      </Td>
      <Td>{format(new Date(createdAt), 'dd/MM/yyyy')}</Td>
      <Td isNumeric>{toVND(balance)}</Td>
      <Td>
        <Flex align='center' justify='space-between'>
          <Badge colorScheme={isActive ? 'green' : 'red'}>
            {isActive ? 'Bình thường' : 'Bị khóa'}
          </Badge>
          <Menu ml='auto'>
            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
            <MenuList>
              <MenuItem icon={<FiEdit />} onClick={onOpen}>
                Sửa
              </MenuItem>
              <MenuItem
                icon={
                  isActive ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />
                }
                onClick={() => onToggleActive(_id)}
              >
                {isActive ? 'Vô hiệu hóa' : ' Kích hoạt'}
              </MenuItem>

              <MenuDivider />
              <MenuItem
                icon={<AiOutlineDelete />}
                onClick={() => onDeleteUser(_id)}
              >
                Xóa
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Td>
      <Drawer
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
          <UserForm isEdited initialValue={user} />
        </DrawerContent>
      </Drawer>
    </Tr>
  );
}
