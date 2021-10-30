import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import * as n from "numeral";
import { BsClock } from "react-icons/bs";
import { color } from "src/constants/color";
import Progress from "../common/Progress";
import { DateUtils } from "src/utils/date";
import { convertStatusToString } from "src/utils/status";

export default function CampaignCard(props) {
  const {
    campaign: {
      _id,
      image,
      status,
      name,
      content,
      donated_amount,
      amount,
      finishedAt
    },
    handleClick
  } = props;
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  return (
    <Flex
      cursor={"pointer"}
      flexDir={"column"}
      pt={6}
      pb={4}
      className="transition duration-300"
      _hover={{ transform: "scale(1.05)" }}
      onClick={() => handleClick(_id)}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image src={image} layout={"fill"} width="100%" height={300} />
      </Box>
      <Flex flexDirection={"column"} flex={1} px={4}>
        <Box>
          <Tag mb={2} variant="solid" colorScheme="purple">
            {convertStatusToString(status)}
          </Tag>
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"lg"}
            fontFamily={"body"}
            _hover={{ color: color.PRIMARY }}
          >
            {name}
          </Heading>
          <Text fontSize={"sm"} color={"gray.500"} className="line-clamp">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Text>
        </Stack>
      </Flex>

      <Box mt={"auto"} px={4}>
        <Stack my={2} w={"full"}>
          <Progress color={color.PRIMARY} percent={percent} />
        </Stack>
        <Flex justify="end">
          <Stack spacing={2} direction={["column", "row"]} align={"end"}>
            <Text color={color.PRIMARY} fontSize={"xl"}>
              {n(donated_amount).format("0,0")}
            </Text>
            <Text>/ {n(amount).format("0,0")} VND</Text>
          </Stack>
        </Flex>
        <Flex color={"gray.500"} align="center" justify="end" mt={2}>
          <BsClock className="mr-2" />
          <Text>{DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
