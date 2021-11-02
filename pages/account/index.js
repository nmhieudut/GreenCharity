import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import { format } from "date-fns";
import Head from "next/head";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import { BiPhoneIncoming } from "react-icons/bi";
import { FcCalendar, FcPhone } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "src/components/common/Alert";
import NeedLogin from "src/components/common/NeedLogin";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import { AuthService } from "src/services/auth";
import { UserService } from "src/services/user";
import { AuthActions } from "src/store/auth/action";

function AccountPage({ user }) {
  const [info, setInfo] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { name, phoneNumber, dateOfBirth } = info;
  const handleChange = (field, value) => {
    setInfo({
      ...info,
      [field]: value
    });
  };
  const onUpdateInfo = async e => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    const res = await UserService.update(info);
    if (res) {
      setSuccess(true);
      await UserService.getInfo()
        .then(res => {
          dispatch(AuthActions.setCurrentUserAction(res.data));
        })
        .catch(e => dispatch(AuthActions.setCurrentUserAction(null)));

      setLoading(false);
    }
  };
  return (
    <SectionContainer hasBreadcrumbs>
      <Heading
        textAlign="center"
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
        lineHeight={"110%"}
        color={color.PRIMARY}
      >
        Cài đặt tài khoản
      </Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          justifyContent="center"
          alignItems="center"
          mt={12}
        >
          <Box
            width={{ base: "50%", md: "85%" }}
            zIndex="2"
            marginBottom="5%"
            marginLeft={{ base: "0", md: "5%" }}
          >
            <Image
              className="h-56 w-full object-cover object-center"
              layout={"fill"}
              width="100%"
              height={"auto"}
              src={user.picture}
              alt={user.name}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="3"
          flexDirection="column"
          justifyContent="start"
          marginTop={{ base: "3", md: "0" }}
          marginLeft={{ base: 0, md: "9" }}
        >
          <Tabs>
            <TabList>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Thông tin cá nhân
              </Tab>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Tài khoản ví
              </Tab>
              <Tab _selected={{ borderBottomColor: color.PRIMARY }}>
                Các hoạt động
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack direction="column" spacing={8} maxW="3xl">
                  <form onSubmit={onUpdateInfo}>
                    <div className="my-8"></div>
                    <FormControl className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <FormLabel className="w-36">EMAIL</FormLabel>
                      <Input
                        className="max-w-xl"
                        value={user.email}
                        focusBorderColor={color.PRIMARY}
                        isReadOnly
                      />
                    </FormControl>
                    <div className="my-8"></div>
                    <FormControl
                      className="flex flex-col md:flex-row md:items-center md:justify-between"
                      isRequired
                    >
                      <FormLabel className="w-36">TÊN</FormLabel>
                      <Input
                        isDisabled={loading}
                        className="max-w-xl"
                        focusBorderColor={color.PRIMARY}
                        value={name}
                        onChange={e => handleChange("name", e.target.value)}
                      />
                    </FormControl>
                    <div className="my-8"></div>
                    <FormControl
                      className="flex flex-col md:flex-row md:items-center md:justify-between"
                      isRequired
                    >
                      <FormLabel className="w-36">SỐ ĐIỆN THOẠI</FormLabel>

                      <InputGroup className="max-w-xl">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FcPhone color="gray.300" />}
                        />
                        <Input
                          isDisabled={loading}
                          value={phoneNumber}
                          placeholder="Nhập số điện thoại"
                          focusBorderColor={color.PRIMARY}
                          onChange={e =>
                            handleChange("phoneNumber", e.target.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>
                    <div className="my-8"></div>
                    <FormControl
                      className="flex flex-col md:flex-row md:items-center md:justify-between"
                      isRequired
                    >
                      <FormLabel className="w-36">Sinh nhật</FormLabel>
                      <InputGroup className="max-w-xl">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FcCalendar />}
                        />
                        <Flatpickr
                          options={{ dateFormat: "Y/m/d" }}
                          value={dateOfBirth}
                          onChange={([date]) =>
                            handleChange(
                              "dateOfBirth",
                              format(date, "yyyy/MM/dd")
                            )
                          }
                          render={({ value, ...props }, ref) => {
                            return (
                              <Input
                                isDisabled={loading}
                                placeholder="Chọn ngày"
                                focusBorderColor={color.PRIMARY}
                                pl={10}
                                value={value}
                                ref={ref}
                              />
                            );
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <div className="mt-4"></div>
                    {success && (
                      <Box py={2}>
                        <CustomAlert
                          label="Cập nhật tài khoản thành công"
                          status="success"
                        />
                      </Box>
                    )}
                    <div
                      className="mt
                    isDisable={loading}-8"
                    ></div>
                    <Box textAlign="right">
                      <Button
                        colorScheme={"purple"}
                        type="submit"
                        isLoading={loading}
                      >
                        Cập nhật
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </TabPanel>
              <TabPanel>
                <p>Ví!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </SectionContainer>
  );
}

export default function Account() {
  const user = useSelector(state => state.auth.currentUser);
  return (
    <>
      <Head>
        <title>Tài khoản</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      {user ? (
        <AccountPage user={user} />
      ) : (
        <Box h={"100vh"}>
          <NeedLogin />
        </Box>
      )}
    </>
  );
}
