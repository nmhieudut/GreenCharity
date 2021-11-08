import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { format } from "date-fns";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { FcCalendar, FcPhone } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "src/components/common/Alert";
import Button from "src/components/common/Button";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import withAuth from "src/HOCs/withAuth";
import { storage } from "src/libs/firebase";
import { UserService } from "src/services/user";
import { AuthActions } from "src/store/auth/action";

function AccountPage() {
  const user = useSelector(state => state.auth.currentUser);

  const [info, setInfo] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(user.picture);

  const dispatch = useDispatch();
  const { name, phoneNumber, dateOfBirth } = info;

  const uploadButton = (
    <div>
      {imgLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </div>
  );

  const handleChange = (field, value) => {
    setInfo({
      ...info,
      [field]: value
    });
  };

  useEffect(() => {
    if (image) handleUpload();
  }, [image]);

  const handleImageChange = e => {
    setImageUrl("");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setImgLoading(true);
    const uploadTask = storage.ref(`avatars/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("avatars")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageUrl(url);
            setImgLoading(false);
          });
      }
    );
  };

  const onUpdateInfo = async e => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    const res = await UserService.update(
      Object.assign(info, { picture: imageUrl })
    );
    if (res) {
      setSuccess(true);
      dispatch(AuthActions.setCurrentUserAction());
      await UserService.getInfo()
        .then(res => {
          dispatch(AuthActions.setCurrentUserSuccessAction(res.data));
        })
        .catch(e => dispatch(AuthActions.setCurrentUserFailedAction()))
        .finally(() => setLoading(false));
    }
  };
  return (
    <SectionContainer hasBreadcrumbs>
      <Head>
        <title>Tài khoản</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
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
          <div className="bg-white px-4 py-5 rounded-lg shadow-xl text-center w-full">
            <div className="mb-4">
              {imageUrl ? (
                <Image
                  className="w-auto mx-auto object-cover object-center border"
                  src={imageUrl}
                  alt={user.name}
                />
              ) : (
                uploadButton
              )}
            </div>
            <label className="cursor-pointer mt-6">
              <span className="mt-2 leading-normal px-4 py-2 bg-purple-500 text-sm rounded-md">
                Chọn hình ảnh
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
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
                        <InputLeftElement pointerEvents="none">
                          <FcPhone color="gray.300" />
                        </InputLeftElement>
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
                        <InputLeftElement pointerEvents="none">
                          <FcCalendar />
                        </InputLeftElement>
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
export default withAuth(AccountPage);
