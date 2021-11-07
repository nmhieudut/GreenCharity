import {
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { BsClock } from "react-icons/bs";
import { color } from "src/constants/color";
import { DateUtils } from "src/utils/date";
import { convertStatusToString } from "src/utils/status";
import * as n from "numeral";
import ProgressBar from "../Progress/ProgressBar";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function CampaignItem({
  data: {
    _id,
    amount,
    author,
    content,
    donated_amount,
    finishedAt,
    image,
    name,
    status
  }
}) {
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  console.log("---", _id);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      my={8}
      className="rounded-lg shadow-md hover:shadow-xl duration-500 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-0 sm:col-span-3 text-center flex items-center justify-center">
          <Image
            className="w-full object-cover object-center"
            src={image}
            alt={name}
            layout="fill"
          />
        </div>
        <div className="col-span-12 sm:col-start-4 sm:col-end-13 p-4 sm:p-8">
          <Tag
            mb={2}
            rounded="full"
            fontSize={"xs"}
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
          <div className="mt-2">
            <Link
              href={`/campaigns/${_id}`}
              className="sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline"
            >
              {name}
            </Link>
            <Box
              className="mt-2 text-sm md:text-md line-clamp"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <Text textAlign="right" fontSize={"md"} fontWeight="bold">
            {percent}
          </Text>
          <Stack my={2} w={"full"}>
            <ProgressBar color={color.PRIMARY} percent="23%" />
          </Stack>
          <Flex justify="end">
            <Stack
              spacing={2}
              direction={["column", "row"]}
              align={"end"}
              fontSize={"md"}
            >
              <Text color={color.PRIMARY}>
                {n(donated_amount).format("0,0")} VND quyên góp
              </Text>
              <Text>/ {n(amount).format("0,0")} VND</Text>
            </Stack>
          </Flex>

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 my-auto">
            <div className="flex justify-end sm:justify-start ">
              <Box className="flex items-center">
                <BsClock className="mr-1" />
                <Text>
                  {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
                </Text>
              </Box>
            </div>
            <Link
              className="flex items-center justify-end text-blue-700"
              href={`/campaigns/${_id}`}
            >
              <i> Xem chi tiết </i>
              <AiOutlineDoubleRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}
