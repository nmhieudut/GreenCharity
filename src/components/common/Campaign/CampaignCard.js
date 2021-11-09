import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import * as n from "numeral";
import { BsClock } from "react-icons/bs";
import { color } from "src/constants/color";
import { DateUtils } from "src/utils/date";
import { convertStatusToString } from "src/utils/status";
import ProgressBar from "../Progress/ProgressBar";

export default function CampaignCard(props) {
  const {
    campaign: {
      slug,
      _id,
      image,
      status,
      name,
      content,
      donated_amount,
      amount,
      finishedAt
    }
  } = props;
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  return (
    <Link
      href={`/campaigns/${slug}`}
      cursor={"pointer"}
      flexDir={"column"}
      className="transition duration-300 md:mx-2 mb-8"
      _hover={{ boxShadow: "xl" }}
      bg={useColorModeValue("white", "gray.900")}
    >
      <Box className="w-full mb-4 md:mb-0">
        <Box className="rounded-lg overflow-hidden shadow">
          <Image
            className="h-56 w-full object-cover object-center"
            src={image}
            layout={"fill"}
            width={600}
          />
          <Box className="p-4 h-auto md:h-40 lg:h-40">
            <Tag
              mb={2}
              variant="solid"
              colorScheme={
                status === "pending"
                  ? "blue"
                  : status === "active"
                  ? "purple"
                  : "red"
              }
            >
              {convertStatusToString(status)}
            </Tag>
            <Stack>
              <Heading
                color={color.PRIMARY}
                fontSize={"lg"}
                fontFamily={"body"}
              >
                {name}
              </Heading>
              <Box className="line-clamp text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Box>
            </Stack>
          </Box>
          <Box mt={"auto"} px={4} mb={4}>
            <Stack my={2} w={"full"}>
              <ProgressBar color={color.PRIMARY} percent={percent} />
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
              <Text>
                {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
