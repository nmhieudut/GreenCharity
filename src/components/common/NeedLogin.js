import { Flex, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "src/components/common/Button";

export default function NeedLogin() {
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
      <Button colorScheme="purple" onClick={() => router.push("/auth")}>
        Đăng nhập ngay
      </Button>
    </Flex>
  );
}
