import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text
} from "@chakra-ui/react";
import { format } from "date-fns";
import add from "date-fns/add";
import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Flatpickr from "react-flatpickr";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import { storage } from "src/libs/firebase";
import * as Yup from "yup";

// YUP
const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng điền tên hoạt động"),
  title: Yup.string()
    .required("Bạn nên thêm cái tiêu đề vào")
    .min(6, "Tiêu đề nên dài thêm chút!")
    .max(30, "Dài quá rồi!"),
  image: Yup.string().required("Bạn nên thêm hình minh họa vào đây"),
  content: Yup.string().required("Vui lòng nhập nội dung"),
  finished_date: Yup.date().required("Thêm ngày kết thúc vào nữa"),
  // bank_account_number: Yup.string().required(
  //   "Nhập STK ngân hàng để tiện quyên góp"
  // ),
  amount: Yup.number()
    .required("Nhập số tiền mong muốn")
    .min(100000, "Số tiền không được dưới 100.000 VND")
    .max(1000000000, "Nhiều tiền quá để ăn chặn hay gì")
});

function LoginNeeded() {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      w={"full"}
      h={"full"}
      justify="center"
      align="center"
    >
      <Text fontSize="2xl" mb={4}>
        Bạn cần đăng nhập để thực hiện hành động này
      </Text>
      <Button colorScheme="pink" onClick={() => router.push("/auth")}>
        Đăng nhập ngay
      </Button>
    </Flex>
  );
}

function NewForm() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    console.log("=========", acceptedFiles[0]);
    setImgUrl("");
    if (acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
    }
  }, []);

  useEffect(() => {
    if (image) handleUpload();
  }, [image]);

  const handleUpload = () => {
    setImgLoading(true);
    const uploadTask = storage.ref(`campaigns/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImgUrl(url);
            setImgLoading(false);
          });
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = values => {
    console.log("-------------", values);
  };

  return (
    <SectionContainer>
      <Heading
        textAlign="center"
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
        lineHeight={"110%"}
        color={color.PRIMARY}
      >
        Tạo hoạt động từ thiện mới
      </Heading>
      <Text my={8} textAlign={"center"} fontSize={"lg"} color={"gray.500"}>
        Điền vào form dưới để tạo 1 hoạt động mới
      </Text>
      <Formik
        initialValues={{
          name: "",
          title: "",
          image: "",
          content: "",
          finishedAt: add(new Date(), { days: 1 }),
          // bank_account_number: "",
          amount: 100000
        }}
        validationSchema={schema}
        onSubmit={values => handleSubmit(values)}
        onError={err => console.log(err)}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <Stack spacing={6} direction={["column", "row"]}>
            <Box flex={1}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel>Tên hoạt động</FormLabel>
                <Input
                  onChange={handleChange("name")}
                  value={values.name}
                  isRequired
                  className="my-2"
                  focusBorderColor={color.PRIMARY}
                  type="email"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <div className="my-4" />
              <FormControl isInvalid={errors.title} isRequired>
                <FormLabel>Tiêu đề ngắn (6-30 kí tự)</FormLabel>
                <Input
                  onChange={handleChange("title")}
                  value={values.title}
                  isRequired
                  className="my-2"
                  focusBorderColor={color.PRIMARY}
                  type="email"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <div className="my-4" />
              <FormControl isInvalid={errors.amount} isRequired>
                <FormLabel>
                  Số tiền muốn quyên góp (100.000 - 1.000.000.000 VND)
                </FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange("amount")}
                    value={values.amount}
                    focusBorderColor={color.PRIMARY}
                    type="number"
                  />
                  <InputRightAddon children="VND" />
                </InputGroup>
                <FormErrorMessage>{errors.amount}</FormErrorMessage>
              </FormControl>
              <div className="my-4" />
              <FormControl isInvalid={errors.finishedAt} isRequired>
                <FormLabel>Ngày hết hạn</FormLabel>
                <InputGroup>
                  <Flatpickr
                    options={{ minDate: new Date(), dateFormat: "Y/m/d" }}
                    value={values.finishedAt}
                    onChange={([date]) => {
                      setFieldValue("finishedAt", format(date, "yyyy/MM/dd"));
                    }}
                    render={({ value, ...props }, ref) => {
                      return (
                        <Input
                          value={value}
                          ref={ref}
                          focusBorderColor={color.PRIMARY}
                        />
                      );
                    }}
                  />
                  <FormErrorMessage>{errors.finished_date}</FormErrorMessage>
                </InputGroup>
              </FormControl>
              <Divider my={4} />
              <Stack spacing={6} direction={["column", "row"]}>
                <Button colorScheme="pink" type="submit" onClick={handleSubmit}>
                  Khởi động chiến dịch
                </Button>
                <Button variant="outline">Hủy</Button>
              </Stack>
            </Box>
            <Flex justify="center" flex={1}>
              <FormControl isRequired>
                <FormLabel>Hình ảnh</FormLabel>
                <Flex
                  {...getRootProps()}
                  className="border-2 cursor-pointer border-dashed"
                  w={"400"}
                  h={"auto"}
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Input {...getInputProps()} />
                  {imgUrl ? (
                    <Image src={imgUrl} alt="" w={"400"} h={"auto"} />
                  ) : (
                    <Flex
                      direction="column"
                      justify="center"
                      align="center"
                      h={"400"}
                    >
                      <BsPlusLg
                        size="3rem"
                        className="mb-4"
                        color={color.PRIMARY}
                      />
                      {isDragActive ? (
                        <p>Thả file vào đây ...</p>
                      ) : (
                        <p>Thả file hoặc click để chọn file</p>
                      )}
                    </Flex>
                  )}
                </Flex>
              </FormControl>
            </Flex>
          </Stack>
        )}
      </Formik>
    </SectionContainer>
  );
}

export default function New() {
  const user = useSelector(state => state.auth.currentUser);
  return (
    <>
      <Head>
        <title>Tạo hoạt động mới</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      {user ? (
        <NewForm />
      ) : (
        <div className="h-screen">
          <LoginNeeded />
        </div>
      )}
    </>
  );
}
