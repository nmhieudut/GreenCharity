import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  Link as ChakraLink,
  Switch,
  AvatarBadge
} from '@chakra-ui/react';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsBrightnessHigh } from 'react-icons/bs';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMoon,
  FaRegUserCircle
} from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedButton from 'src/components/common/AnimatedButton';
import BreadCrumbs from 'src/components/common/BreadCrumbs';
import Button from 'src/components/common/Button';
import SocialButton from 'src/components/common/SocialButton';
import { color } from 'src/constants/color';
import { navs } from 'src/constants/navbar';
import firebase from 'src/libs/firebase';
import { AuthActions } from 'src/store/auth/action';
import removeCookie from 'src/utils/cookie';
import { VNDFormatter } from 'src/utils/number';
import { storage } from 'src/utils/storage';

export default function Header() {
  const dispatch = useDispatch();
  const bg = useColorModeValue('white', 'gray.800');
  const bg2 = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue(color.primary, color.primary);
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue(
    '1px solid rgba(229,231,235,1)',
    '1px solid rgb(31, 41, 55)'
  );
  const user = useSelector(state => state.auth.currentUser);
  const [showLinks, setShowLinks] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();
  function handleClickOutside(event) {
    if (!wrapperRef.current.contains(event.target)) {
      setShowLinks(false);
    }
  }
  useEffect(() => {
    if (showLinks) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef, showLinks]);

  const onLogout = () => {
    router.reload('/');
    storage.removeToken();
    dispatch(AuthActions.setCurrentUserSuccessAction(null));
    firebase
      .auth()
      .signOut()
      .then(() => {
        removeCookie();
      })
      .catch(error => {
        // An error happened.
      });
  };

  const onCreate = () => {
    if (user) {
      router.push('/new-campaign');
    } else {
      router.push('/auth');
    }
  };

  const Logo = () => {
    return (
      <a href='/#'>
        <img src='/images/GreenCharity.png' width={120} alt='logo' />
      </a>
    );
  };

  const MenuToggle = () => {
    return (
      <Box
        ref={wrapperRef}
        display={{ base: 'block', md: 'none' }}
        onClick={() => setShowLinks(!showLinks)}
      >
        <Hamburger toggled={showLinks} direction='left' />
      </Box>
    );
  };

  const NavMenuItem = ({ href, label }) => {
    const router = useRouter();
    return (
      <Link href={href}>
        <a
          className={
            'menu-item font-bold ' +
            (router.pathname == href && 'menu-item__active')
          }
        >
          {label}
        </a>
      </Link>
    );
  };

  const NavMenuItemMobile = ({ href, label }) => {
    return (
      <Link href={href}>
        <a className='font-bold'>{label}</a>
      </Link>
    );
  };

  return (
    <Box
      className='fixed top-0 left-0 z-50 w-full text-sm'
      color={textColor}
      bg={bg}
      borderBottom={borderColor}
      boxShadow='0 .5rem 4.5rem rgba(0,0,0,.1)'
    >
      <Box w='full' bg={bg2}>
        <Container
          maxW='container.xl'
          display='flex'
          alignItems={'center'}
          justifyContent={'flex-end'}
        >
          <Stack direction={'row'} spacing={1} ml='auto' mr={2} align='center'>
            <SocialButton rounded='none' bg='none' label={'Twitter'} href={'#'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton rounded='none' bg='none' label={'YouTube'} href={'#'}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              rounded='none'
              bg='none'
              label={'Instagram'}
              href={'#'}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
          <Flex align='center' mr={2}>
            <BsBrightnessHigh className='mr-2' />
            <Switch
              defaultChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme='purple'
            />
            <FaMoon className='ml-2' />
          </Flex>
          {user ? (
            <Menu isLazy>
              <MenuButton
                as={'span'}
                className='flex justify-between cursor-pointer'
              >
                <Flex align='center' bg={bg} px={2} py={1} fontSize='xs'>
                  <Avatar size='xs' src={user.picture} name={user.name}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                  </Avatar>
                  <Text mx={2} color={color.PRIMARY} overflow='hidden'>
                    {user.name}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <div className='p-4'>
                  Đang đăng nhập với tên: <b className='ml-1'>{user.name}</b>
                </div>
                <div className='px-4'>
                  Số dư:{' '}
                  <b className='ml-1'>{VNDFormatter(user.balance)} VND</b>
                </div>
                <MenuDivider />
                <MenuGroup title='Cá nhân'>
                  <MenuItem>
                    <a href='/account'>Tài khoản</a>
                  </MenuItem>
                  <MenuItem>
                    <a href='/checkout'>Nạp tiền</a>
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Trợ giúp'>
                  <MenuItem>Tài liệu</MenuItem>
                  <MenuItem>Hỏi đáp</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem onClick={onLogout}>
                  <span className='mr-4'>Đăng xuất</span>
                  <RiLogoutBoxRLine />
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ChakraLink href='/auth'>
              <Flex align='center'>
                <FaRegUserCircle className='mr-2' /> Đăng nhập | Đăng ký
              </Flex>
            </ChakraLink>
          )}
        </Container>
      </Box>
      <Container
        maxW='container.xl'
        display='flex'
        py={4}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <MenuToggle />
        <HStack spacing={8} alignItems={'center'}>
          <Logo />
          <HStack spacing={8} as={'nav'} display={{ base: 'none', md: 'flex' }}>
            {navs.map((n, i) => (
              <NavMenuItem key={i} href={n.to} label={n.label} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <AnimatedButton
              ml='auto'
              variant={'solid'}
              size={'sm'}
              colorScheme='purple'
              mr={2}
              leftIcon={<MdCampaign size='1rem' />}
              onClick={onCreate}
            >
              Vận động
            </AnimatedButton>
          </Stack>
        </Flex>
      </Container>
      {showLinks ? (
        <Box pb={4} display={{ md: 'none' }} bg={bg}>
          <Stack as={'nav'} spacing={8} pt={4} px={8}>
            {navs.map((n, i) => (
              <NavMenuItemMobile key={i} href={n.to} label={n.label} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
