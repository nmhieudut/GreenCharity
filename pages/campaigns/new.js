import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsPlusLg } from "react-icons/bs";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";

export default function New() {
  const [img, setImg] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://picsum.photos/400/300");
  const onDrop = useCallback(acceptedFiles => {
    console.log("=========", acceptedFiles[0]);
    if (acceptedFiles[0]) {
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section>
      <Head>
        <title>Tạo hoạt động mới</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
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
          Điền vào form dưới đẻ tạo 1 hoạt động mới
        </Text>
        <form className="my-12" onSubmit={() => {}}>
          <Stack spacing={6} direction={["column", "row"]}>
            <Box flex={1}>
              <FormControl id="email" isRequired>
                <FormLabel>Tên hoạt động</FormLabel>
                <Input
                  // onChange={handleChange}
                  isRequired
                  className="my-2"
                  focusBorderColor={color.PRIMARY}
                  type="email"
                />
              </FormControl>
              <div className="my-4" />
              <FormControl id="email" isRequired>
                <FormLabel>Tiêu đề ngắn</FormLabel>
                <Input
                  // onChange={handleChange}
                  isRequired
                  className="my-2"
                  focusBorderColor={color.PRIMARY}
                  type="email"
                />
              </FormControl>
              <div className="my-4" />
              <FormControl id="email" isRequired>
                <FormLabel>Số tiền muốn quyên góp</FormLabel>
                <InputGroup>
                  <Input
                    // onChange={handleChange}
                    isRequired
                    focusBorderColor={color.PRIMARY}
                    type="number"
                  />
                  <InputRightAddon children="VND" />
                </InputGroup>
              </FormControl>
              <Divider my={4} />
              <Stack spacing={6} direction={["column", "row"]}>
                <Button colorScheme="pink" type="submit">
                  Khởi động chiến dịch
                </Button>
                <Button variant="outline">Hủy</Button>
              </Stack>
            </Box>
            <Flex justify="center" {...getRootProps()} flex={1}>
              <FormControl id="photo" isRequired>
                <FormLabel>Hình ảnh</FormLabel>
                <Flex
                  className="border-2"
                  w={"400"}
                  h={"auto"}
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Input {...getInputProps()} />
                  {photoUrl ? (
                    <Image src={photoUrl} alt="" w={"400"} h={"auto"} />
                  ) : (
                    <>
                      <BsPlusLg size="3rem" color={color.PRIMARY} />
                      {isDragActive ? (
                        <p>Thả file vào đây ...</p>
                      ) : (
                        <p>Thả file hoặc click để chọn file</p>
                      )}
                    </>
                  )}
                </Flex>
              </FormControl>
            </Flex>
          </Stack>
        </form>
      </SectionContainer>
    </section>
  );
}
