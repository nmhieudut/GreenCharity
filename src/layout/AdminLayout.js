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
  const integrations = useDisclosure();
  const { pathname } = router;

  const NavItem = props => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align='center'
        px='4'
        pl='4'
        py='3'
        cursor='pointer'
        color='white'
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
      pos='fixed'
      top='110'
      left='0'
      zIndex='30'
      h='full'
      py='10'
      overflowX='hidden'
      overflowY='auto'
      bg={color.PRIMARY}
      borderRightWidth='1px'
      w='48'
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
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
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
      <Box ml={{ base: 0, md: 48 }} transition='.3s ease'>
        <Box as='main' p='4'>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
