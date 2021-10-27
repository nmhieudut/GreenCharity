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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import add from "date-fns/add";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Flatpickr from "react-flatpickr";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import { storage } from "src/libs/firebase";
import * as Yup from "yup";
import ImgLoading from "src/components/common/Spinner/ImgLoading";
import NeedLogin from "src/components/common/NeedLogin";
import Editor from "src/components/uncommon/Editor";
import { AuthService } from "src/services/auth";
import { CampaignService } from "src/services/campaign";

// YUP
const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng điền tên hoạt động"),
  image: Yup.string().required("Bạn nên thêm hình minh họa vào đây"),
  content: Yup.string().required("Vui lòng nhập nội dung"),
  finishedAt: Yup.date().required("Thêm ngày kết thúc vào nữa"),
  bank_account_number: Yup.string(),
  amount: Yup.number()
    .required("Nhập số tiền mong muốn")
    .min(100000, "Số tiền không được dưới 100.000 VND")
    .max(1000000000, "Nhiều tiền quá để ăn chặn hay gì")
});

function NewForm() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formikRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    setImgUrl("");
    setImage(null);
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
          .ref("campaigns")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImgUrl(url);
            if (formikRef.current) {
              formikRef.current.setFieldValue("image", url);
            }
            setImgLoading(false);
          });
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = values => {
    CampaignService.create(values).then(res => {
      console.log("res", res);
    });
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
        innerRef={formikRef}
        initialValues={{
          name: "",
          image: "",
          content: "",
          finishedAt: add(new Date(), { days: 1 }),
          bank_account_number: "",
          amount: 100000
        }}
        validationSchema={schema}
        onSubmit={values => handleSubmit(values)}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          isValid
        }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              console.log("isValid", isValid, errors, values);
              handleSubmit(e);
            }}
          >
            <Stack spacing={6} direction={["column", "row"]}>
              <Box flex={1}>
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel>Tên hoạt động</FormLabel>
                  <Input
                    onChange={handleChange("name")}
                    value={values.name}
                    className="my-2"
                    focusBorderColor={color.PRIMARY}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
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
                    <FormErrorMessage>{errors.finishedAt}</FormErrorMessage>
                  </InputGroup>
                </FormControl>
                <div className="my-4" />
                <FormControl isValid={errors.image} isRequired>
                  <FormLabel>Hình ảnh</FormLabel>
                  <Flex
                    {...getRootProps()}
                    className="border-2 cursor-pointer border-dashed"
                    w={"200"}
                    h={"auto"}
                    direction="column"
                    align="center"
                    justify="center"
                  >
                    <Input {...getInputProps()} />
                    {imgLoading ? (
                      <ImgLoading color={color.PRIMARY} />
                    ) : imgUrl ? (
                      <Image src={imgUrl} alt="" w={"50%"} h={"auto"} />
                    ) : (
                      <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        w={"50%"}
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
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box flex={1}>
                <FormControl
                  isInvalid={errors.content}
                  isRequired
                  className="w-full mb-12"
                >
                  <FormLabel>Nội dung câu chuyện</FormLabel>
                  <InputGroup
                    className="pb-4 h-auto w-full"
                    focusBorderColor={color.PRIMARY}
                  >
                    <Editor
                      name="description"
                      onChange={data => {
                        setFieldValue("content", data);
                      }}
                      editorLoaded={editorLoaded}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.content}</FormErrorMessage>
                </FormControl>
                <Button onClick={onOpen}>Xem trước bài đăng</Button>
              </Box>
            </Stack>
            <Divider my={4} />
            <Stack spacing={6} direction={["column", "row"]}>
              <Button colorScheme="purple" type="submit">
                Khởi động chiến dịch
              </Button>
              <Button variant="outline">Hủy</Button>
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{values.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div dangerouslySetInnerHTML={{ __html: values.content }} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={onClose}>
                    Đóng
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Form>
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
        <Box h={"100vh"}>
          <NeedLogin />
        </Box>
      )}
    </>
  );
}
