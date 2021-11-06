import {
  Box,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";
import CampaignItem from "src/components/common/Campaign/CampaignItem";
import CampaignItemSkeleton from "src/components/common/Campaign/CampaignItemSkeleton";
import Search from "src/components/common/Search";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import { options } from "src/constants/filter";
import { CampaignService } from "src/services/campaign";

export default function Campaigns({ total, campaigns }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("");
  const handleSearch = async (query, status) => {
    setQuery(query);
    setStatus(status);
  };
  return (
    <>
      <Head>
        <title>Các hoạt động</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      <Box bg={color.PRIMARY}>
        <SectionContainer hasBreadcrumbs>
          <Heading className="text-center font-bold text-white text-4xl">
            Tìm kiếm các hoạt động thiện nguyện ngay
            <p className="mx-auto font-normal text-sm my-6 max-w-lg">
              Nhập tên hoạt động và chọn trạng thái của các hoạt động đó (đang
              diễn ra, kết thúc)
            </p>
            <Search hasOptions options={options} onSearch={handleSearch} />
          </Heading>
        </SectionContainer>
      </Box>
      <SectionContainer>
        <CampaignsList query={query} status={status} />
      </SectionContainer>
    </>
  );
}

const CampaignsList = ({ query, status }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["campaigns", query, status],
    () => CampaignService.fetchCampaigns(query, status)
  );
  const { total, campaigns } = data || {};
  console.log("----", data, isLoading, error, query, status);

  return (
    <div>
      {isError && <div>Có gì đó không ổn, thử lại ngay</div>}
      {isLoading &&
        Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton />)}
      {campaigns && (
        <Box>
          <Text as={"h6"}>Hiển thị {total} kết quả</Text>
          <Box py={12}>
            {campaigns.map(campaign => (
              <CampaignItem key={campaign._id} data={campaign} />
            ))}
          </Box>
        </Box>
      )}
      {campaigns?.length === 0 && (
        <Flex justify="center" align="center">
          Không có hoạt động tương ứng
        </Flex>
      )}
    </div>
  );
};
