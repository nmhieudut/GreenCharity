import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";

export default function NotFound() {
  const router = useRouter();
  return (
    <SectionContainer>
      <Flex
        flexDir="column"
        h="100vh"
        align="center"
        justify="center"
        py={10}
        px={6}
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Không tìm thấy trang bạn cần
        </Text>
        <Text color={color.PRIMARY} mb={6}>
          Trang đích có vẻ như không tồn tại nữa.
        </Text>

        <Button
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
          onClick={() => router.push("/")}
        >
          Trở về trang chủ
        </Button>
      </Flex>
    </SectionContainer>
  );
}
