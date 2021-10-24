import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import CountUp from "react-countup";
import { FcConferenceCall, FcDonate } from "react-icons/fc";
import { useSelector } from "react-redux";
import SectionContainer from "src/components/common/SectionContainer";
import CampaignCard from "src/components/uncommon/CampaignCard";
import { color } from "src/constants/color";
import { campaigns } from "src/mocks/campaigns";
import { wrapper } from "src/store";

export const getStaticProps = wrapper.getStaticProps(
  store =>
    ({ req, res, ...etc }) => {
      return {
        props: {}
      };
    }
);

export default function Home() {
  const state = useSelector(state => state.auth);
  const router = useRouter();
  const directToDetailPage = id => {
    router.push(`/campaigns/${id}`);
  };
  console.log("state", state);
  return (
    <div>
      <Head>
        <title>Green Charity - Trang chủ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      <SectionContainer>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 4, md: 8 }}
          py={{ base: 8, md: 14 }}
        >
          <Heading
            color={color.PRIMARY}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          >
            Quỹ từ thiện{" "}
            <Text as={"span"} color={"green.400"}>
              Green
            </Text>
            <Text as={"span"} color={color.PRIMARY}>
              Charity
            </Text>
          </Heading>
          <Text fontSize={"lg"}>
            GreenCharity là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền
            cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả
            nước.
          </Text>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)"
            ]}
            gap={8}
          >
            <Box>
              <Text fontSize={"2xl"} color={color.PRIMARY} fontWeight={600}>
                <CountUp end={30} duration={3} />
              </Text>
              <Text>Hoạt động thành công</Text>
            </Box>
            <Box>
              <Text fontSize={"2xl"} color={color.PRIMARY} fontWeight={600}>
                <CountUp separator="," end={40000} duration={3} />
              </Text>
              <Text>Lượt quyên góp</Text>
            </Box>
            <Box>
              <Text fontSize={"2xl"} color={color.PRIMARY} fontWeight={600}>
                <CountUp separator="," end={1435600000} duration={3} />
              </Text>
              <Text>Đồng được quyên góp</Text>
            </Box>
          </Grid>
          <Stack spacing={6} direction={["column", "row"]}>
            <a href="/#current-campaigns">
              <Button
                size="lg"
                rounded={"full"}
                px={6}
                colorScheme={"pink"}
                bg={color.PRIMARY}
              >
                Tìm hiểu
              </Button>
            </a>

            <a href="/#get-started">
              <Button
                size="lg"
                colorScheme={"pink"}
                rounded={"full"}
                px={6}
                variant="outline"
              >
                Bắt đầu ngay
              </Button>
            </a>
          </Stack>
          <Flex w={"full"} justify={"center"}>
            <img src="/images/hero.png" alt="hero" width="60%" />
          </Flex>
        </Stack>
      </SectionContainer>

      <SectionContainer id="current-campaigns">
        <Heading
          textAlign="center"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
          color={color.PRIMARY}
        >
          Các hoạt động đang diễn ra
        </Heading>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)"
          ]}
          columnGap={4}
          rowGap={8}
          my={12}
        >
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
              handleClick={directToDetailPage}
            />
          ))}
        </Grid>
        <Flex justify="center">
          <Button
            size="lg"
            px={6}
            variant="outline"
            colorScheme={"pink"}
            onClick={() => router.push("/campaigns")}
          >
            Xem thêm
          </Button>
        </Flex>
      </SectionContainer>
      <SectionContainer
        id="get-started"
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Heading
          textAlign="center"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
          color={color.PRIMARY}
        >
          Tích đức không khó, làm việc tốt thì càng dễ hơn
        </Heading>

        <Grid
          my={12}
          mx="auto"
          maxW={"4xl"}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)"
          ]}
        >
          <Flex
            direction="column"
            className="border-2"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            m={4}
          >
            <Box
              p={6}
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
              flex={1}
            >
              <FcConferenceCall size="3rem" />
              <Text py={4} fontWeight={600} fontSize={"xl"}>
                TÔI MUỐN THÔNG TIN TỚI CÁC NHÀ HẢO TÂM
              </Text>
            </Box>
            <Box px={6} pb={6} pt={"auto"}>
              <Text>
                Bạn gặp vài hoàn cảnh khó khăn mà không thể kêu gọi. Hãy thông
                tin đến chúng tôi ngay
              </Text>
              <Button
                mt={10}
                w={"full"}
                colorScheme={"pink"}
                onClick={() => router.push("/campaigns/new")}
              >
                Tạo ngay
              </Button>
            </Box>
          </Flex>
          <Flex
            direction="column"
            className="border-2"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            m={4}
          >
            <Box
              p={6}
              flex={1}
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <FcDonate size="3rem" />
              <Text py={4} fontWeight={600} fontSize={"xl"}>
                TÔI LÀ NHÀ HẢO TÂM
              </Text>
            </Box>
            <Box px={6} pb={6} mt="auto">
              <Text>
                Chỉ với vài thao tác đơn giản, bạn đã góp phần giúp đỡ 1 hoàn
                cảnh khó khăn có cuộc sống tốt đẹp hơn.
              </Text>
              <Button mt={10} w={"full"} colorScheme={"pink"}>
                Ủng hộ ngay
              </Button>
            </Box>
          </Flex>
        </Grid>
      </SectionContainer>
    </div>
  );
}
