import {
  Avatar,
  AvatarBadge,
  Badge,
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
  SkeletonCircle,
  Stack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useOutsideClick
} from '@chakra-ui/react';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsBrightnessHigh } from 'react-icons/bs';
import { FaCrown, FaMoon, FaRegUserCircle } from 'react-icons/fa';
import { FcManager } from 'react-icons/fc';
import { MdCampaign, MdEmail, MdOutlinePhoneInTalk } from 'react-icons/md';
import { RiAuctionFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedButton from 'src/components/common/AnimatedButton';
import { color } from 'src/constants/color';
import { navs } from 'src/constants/navbar';
import firebase from 'src/libs/firebase';
import { AuthService } from 'src/services/auth';
import { AuthActions } from 'src/store/auth/action';
import removeCookie from 'src/utils/cookie';
import { toVND } from 'src/utils/number';
import { storage } from 'src/utils/storage';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.auth.currentUser);
  const loadingUser = useSelector(state => state.auth.loading);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const bg2 = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue(color.primary, color.primary);
  const borderColor = useColorModeValue(
    '1px solid rgba(229,231,235,.5)',
    '1px solid rgb(31, 41, 55)'
  );
  const [showLinks, setShowLinks] = useState(false);
  const wrapperRef = useRef(null);
  const marqueeRef = useRef(null);
  useOutsideClick({
    ref: wrapperRef,
    handler: () => setShowLinks(false)
  });
  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  }, []);

  const onLogout = async () => {
    try {
      await AuthService.logout();
      window.open('/auth', '_self');
      storage.removeToken();
      dispatch(AuthActions.setCurrentUserSuccessAction(null));
      await firebase
        .auth()
        .signOut()
        .then(() => {
          removeCookie();
        })
        .catch(error => {
          // An error happened.
        });
    } catch (e) {}
  };

  const onCreateCampaign = () => {
    if (user) {
      router.push('/hoat-dong/tao-moi');
    } else {
      router.push('/auth');
    }
  };
  const onCreateAuction = () => {
    if (user) {
      router.push('/dau-gia/tao-moi');
    } else {
      router.push('/auth');
    }
  };

  const Logo = () => {
    return (
      <a href='/'>
        <img src='/images/thumbnail.png' width={40} alt='logo' />
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

  const NavMenuItem = ({ href, label, isNew }) => {
    const router = useRouter();
    return (
      <Link href={href}>
        <a
          className={
            'menu-item font-bold flex py-4 ' +
            (router.pathname == href && 'menu-item__active')
          }
        >
          {label}
          {isNew && (
            <Box
              // colorScheme='red'
              fontSize='xs'
              ml={2}
              px={1}
              rounded='full'
              className='blinking_item text-white'
            >
              Mới
            </Box>
          )}
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
    >
      <Box w='full' bg={bg2}>
        <Container
          maxW='container.xl'
          display='flex'
          alignItems={'center'}
          justifyContent={'flex-end'}
          py={2}
        >
          <marquee
            ref={marqueeRef}
            behavior='scroll'
            direction='left'
            onMouseOver={() => marqueeRef.current.stop()}
            onMouseOut={() => marqueeRef.current.start()}
          >
            <Flex>
              <Flex align='center'>
                <MdOutlinePhoneInTalk size='1.25rem' />
                <Text fontSize='sm' fontWeight={600} ml={2}>
                  Đường giây siêu nóng: (+84) 905245054
                </Text>
              </Flex>
              <Box className='mx-4'>|</Box>
              <Flex align='center'>
                <MdEmail size='1.25rem' />
                <Text fontSize='sm' fontWeight={600} ml={2}>
                  Email: greencharity.help@gmail.com / hieutk5@gmail.com
                </Text>
              </Flex>
            </Flex>
          </marquee>
          <Flex>
            <Flex align='center' mx={6}>
              <BsBrightnessHigh className='mr-2' />
              <Switch
                defaultChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                colorScheme='purple'
              />
              <FaMoon className='ml-2' />
            </Flex>
            {loadingUser ? (
              <SkeletonCircle size='7' />
            ) : user && !loadingUser ? (
              <Flex>
                <Menu isLazy>
                  <MenuButton
                    as={'span'}
                    className='flex justify-between cursor-pointer'
                  >
                    <Flex align='center' px={2} py={1} fontSize='xs'>
                      <Avatar size='xs' src={user.picture} name={user.name}>
                        <AvatarBadge boxSize='1.25em' bg='green.500' />
                      </Avatar>
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <div className='px-4'>
                      <Badge
                        colorScheme={user.role === 'admin' ? 'blue' : 'green'}
                      >
                        {user.role === 'admin' ? (
                          <Flex align='center' p={1}>
                            <FaCrown className='mr-2' size='1.2rem' />
                            <Text>Quản trị viên</Text>
                          </Flex>
                        ) : (
                          <Flex align='center' p={1}>
                            <FcManager className='mr-2' size='1.2rem' />{' '}
                            <Text>Thành viên</Text>
                          </Flex>
                        )}
                      </Badge>
                    </div>
                    <div className='p-4'>
                      Đang đăng nhập với tên:{' '}
                      <b className='ml-1'>{user.name}</b>
                    </div>
                    <div className='px-4'>
                      Số dư: <b className='ml-1'>{toVND(user.balance)} VND</b>
                    </div>
                    <MenuDivider />
                    {user.role === 'admin' ? (
                      <MenuItem>
                        <a href='/admin/users'>Quản lí</a>
                      </MenuItem>
                    ) : (
                      <MenuGroup title='Cá nhân'>
                        <MenuItem>
                          <a href='/account'>Tài khoản</a>
                        </MenuItem>
                        <MenuItem>
                          <a href='/checkout'>Nạp tiền</a>
                        </MenuItem>
                      </MenuGroup>
                    )}

                    <MenuDivider />
                    <MenuGroup title='Trợ giúp'>
                      <MenuItem>Tài liệu</MenuItem>
                      <MenuItem>
                        <a href='/#qanda'>Hỏi đáp</a>
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuItem onClick={onLogout}>
                      <span className='mr-4'>Đăng xuất</span>
                      <RiLogoutBoxRLine />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <AnimatedButton
                ml='auto'
                variant={'solid'}
                size={'sm'}
                colorScheme='purple'
                mr={2}
                leftIcon={<FaRegUserCircle />}
                onClick={() => router.push('/auth')}
              >
                Đăng nhập | Đăng ký
              </AnimatedButton>
            )}
          </Flex>
        </Container>
      </Box>
      <Container
        maxW='container.xl'
        display='flex'
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <MenuToggle />
        <HStack spacing={8} alignItems={'center'}>
          <Logo />
          <HStack spacing={6} as={'nav'} display={{ base: 'none', md: 'flex' }}>
            {navs.map((n, i) => (
              <NavMenuItem key={i} href={n.to} label={n.label} isNew={n.new} />
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
              onClick={onCreateCampaign}
            >
              Vận động
            </AnimatedButton>
            <AnimatedButton
              ml='auto'
              variant={'solid'}
              size={'sm'}
              colorScheme='purple'
              mr={2}
              leftIcon={<RiAuctionFill size='1rem' />}
              onClick={onCreateAuction}
            >
              Đấu giá
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
