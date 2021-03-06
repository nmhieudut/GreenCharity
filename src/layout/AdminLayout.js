import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { color } from 'src/constants/color';
import { adminSideBar } from 'src/constants/sidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const sidebar = useDisclosure();
  const { pathname } = router;
  const user = useSelector(state => state.auth.currentUser);
  const NavItem = props => {
    const { icon, children, path, ...rest } = props;

    return (
      <Flex
        align='center'
        px='2'
        py='3'
        cursor='pointer'
        bg={
          pathname.includes(path) && useColorModeValue('gray.100', 'gray.900')
        }
        color={
          pathname.includes(path)
            ? useColorModeValue('gray.900', 'gray.200')
            : useColorModeValue('white', 'gray.200')
        }
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200')
        }}
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
        {...rest}
      >
        {icon && <Icon mx='2' boxSize='4' as={icon} />}
        {children}
      </Flex>
    );
  };

  const SidebarContent = props => (
    <Box
      as='nav'
      minH='100vh'
      py={8}
      overflowY='auto'
      bg={color.PRIMARY}
      borderRightWidth='1px'
      minW='40'
      {...props}
    >
      <Flex flexDirection='column' align='center' py={4}>
        <Avatar src={user.picture} name={user.name} size='lg' />
        <Text mt={2} color='white'>
          {user.name}
        </Text>
        <Text fontSize='sm' color='white'>
          Admin
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        aria-label='Main Navigation'
      >
        {adminSideBar.map(item => (
          <NavItem
            key={item.title}
            onClick={() =>
              item.new
                ? window.open(`${item.path}`, '_blank')
                : router.push(item.path)
            }
            icon={item.icon}
            path={item.path}
          >
            <Text fontSize='xs'>{item.title}</Text>
          </NavItem>
        ))}
      </Flex>
    </Box>
  );

  return (
    <Box
      as='section'
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH='100vh'
      py={0}
    >
      <Head>
        <title>Qu???n l??</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <IconButton
        aria-label='Menu'
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={sidebar.onOpen}
        icon={<FiMenu />}
        size='sm'
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w='full' borderRight='none' />
        </DrawerContent>
      </Drawer>
      <Flex>
        <SidebarContent display={{ base: 'none', md: 'unset' }} />
        <Box transition='.3s ease' mt={8} w='full'>
          <Box as='main'>{children}</Box>
        </Box>
      </Flex>
    </Box>
  );
}
