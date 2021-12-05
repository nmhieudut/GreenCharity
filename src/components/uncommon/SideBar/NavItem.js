import React from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import NavHoverBox from './NavHoverBox';
import { color } from 'src/constants/color';

export default function NavItem({
  routeTo,
  icon,
  title,
  description,
  active,
  navSize
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      mt={4}
      flexDir='column'
      w='100%'
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement='right' isOpen={isOpen} onClose={onClose}>
        <Link
          href={routeTo}
          onMouseOver={onOpen}
          onMouseLeave={onClose}
          backgroundColor={active && color.PRIMARY}
          color={active && '#fff'}
          p={2}
          borderRadius={8}
          _hover={{
            color: '#fff',
            textDecor: 'none',
            backgroundColor: color.PRIMARY
          }}
          w={navSize == 'large' && '100%'}
        >
          <MenuButton w='100%'>
            <Flex align='center'>
              <Icon as={icon} fontSize='xl' color={active && '#fff'} />
              <Text
                ml={5}
                display={navSize === 'small' ? 'none' : 'flex'}
                fontSize={navSize === 'small' ? 'xs' : 'sm'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border='none' w={250} h={100} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
