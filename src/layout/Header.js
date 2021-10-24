import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegLightbulb } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { color } from "src/constants/color";
import { navs } from "src/constants/navbar";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AuthActions } from "src/store/auth/action";
import firebase from "src/libs/firebase";
import { LSManager } from "src/utils/localstorage";
import Cookies from "js-cookie";

export default function Header() {
  const dispatch = useDispatch();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue(color.primary, color.primary);
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue(
    "1px solid rgba(229,231,235,1)",
    "1px solid rgb(31, 41, 55)"
  );
  const user = useSelector(state => state.auth.currentUser);
  const [showLinks, setShowLinks] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapperRef.current.contains(event.target)) {
        setShowLinks(false);
      }
    }
    if (showLinks) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, showLinks]);

  const onLogout = () => {
    console.log("herere");
    LSManager.removeToken();
    dispatch(AuthActions.setCurrentUserAction(null));
    router.push("/");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("-----clearing cookie");
        Object.keys(Cookies.get()).forEach(function (cookie) {
          Cookies.remove(cookie);
        });
      })
      .catch(error => {
        // An error happened.
      });
  };

  const Logo = () => {
    return (
      <a href="/#">
        <img src="/images/GreenCharity.png" width={120} alt="logo" />
      </a>
    );
  };

  const MenuToggle = () => {
    return (
      <Box
        ref={wrapperRef}
        display={{ base: "block", md: "none" }}
        onClick={() => setShowLinks(!showLinks)}
      >
        <Hamburger toggled={showLinks} direction="left" />
      </Box>
    );
  };

  const NavMenuItem = ({ href, label }) => {
    return (
      <Link href={href}>
        <a className="menu-item font-bold">{label}</a>
      </Link>
    );
  };

  const NavMenuItemMobile = ({ href, label }) => {
    return (
      <Link href={href}>
        <a className="font-bold">{label}</a>
      </Link>
    );
  };

  return (
    <Box
      className="fixed top-0 left-0 z-50 w-full text-sm h-16"
      color={textColor}
      bg={bg}
      borderBottom={borderColor}
      boxShadow="0 .5rem 1.5rem rgba(0,0,0,.1)"
    >
      <Flex
        className="container"
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <MenuToggle />
        <HStack spacing={8} alignItems={"center"}>
          <Logo />
          <HStack spacing={8} as={"nav"} display={{ base: "none", md: "flex" }}>
            {navs.map((n, i) => (
              <NavMenuItem key={i} href={n.to} label={n.label} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2}>
            <Tooltip
              hasArrow
              placement="bottom-end"
              label={colorMode === "light" ? "Nền tối" : "Nền sáng"}
            >
              <Button color={color.primary} onClick={toggleColorMode}>
                <span>
                  {colorMode === "light" ? <FaMoon /> : <FaRegLightbulb />}
                </span>
              </Button>
            </Tooltip>
            {user ? (
              <Menu isLazy>
                <MenuButton
                  as={Button}
                  px={4}
                  py={2}
                  outline="variant"
                  className="flex justify-between"
                  rightIcon={<AiFillCaretDown />}
                >
                  <Avatar size="xs" src={user.picture} name={user.name} />
                </MenuButton>
                <MenuList>
                  <div className="p-4">
                    Đang đăng nhập với tên: <b className="ml-1">{user.name}</b>
                  </div>
                  <MenuGroup title="Hồ sơ">
                    <MenuItem>
                      <a href="/account">Tài khoản</a>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Trợ giúp">
                    <MenuItem>Tài liệu</MenuItem>
                    <MenuItem>Hỏi đáp</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={onLogout}>
                    <span className="mr-4">Đăng xuất</span>
                    <RiLogoutBoxRLine />
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button colorScheme="pink" onClick={() => router.push("/auth")}>
                Đăng nhập / Đăng ký
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
      {showLinks ? (
        <Box pb={4} display={{ md: "none" }} bg={bg}>
          <Stack as={"nav"} spacing={8} pt={4} px={8}>
            {navs.map((n, i) => (
              <NavMenuItemMobile key={i} href={n.to} label={n.label} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
