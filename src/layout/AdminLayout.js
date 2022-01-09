import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';
import { color } from 'src/constants/color';
import { adminSideBar } from 'src/constants/sidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const sidebar = useDisclosure();
  const { pathname } = router;

  const NavItem = props => {
    const { icon, children, path, ...rest } = props;

    return (
      <Flex
        align='center'
        px='4'
        pl='4'
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
      py='10'
      overflowY='auto'
      bg={color.PRIMARY}
      borderRightWidth='1px'
      minW='48'
      {...props}
    >
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        aria-label='Main Navigation'
      >
        {adminSideBar.map(item => (
          <NavItem
            key={item.title}
            onClick={() => router.push(`${item.path}`)}
            icon={item.icon}
            path={item.path}
          >
            {item.title}
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
    >
      <Head>
        <title>Quản lí</title>
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
        <Box transition='.3s ease' w='full'>
          <Box as='main' p='4'>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
