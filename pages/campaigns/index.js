import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";
import { CampaignService } from "src/services/campaign";
import { MdArrowDropDown } from "react-icons/md";

export async function getServerSideProps(ctx) {
  const { res } = ctx;

  const { campaigns } = await CampaignService.fetchCampaigns();
  if (campaigns) {
    return {
      props: {
        campaigns
      }
    };
  }
  res.writeHead(301, {
    Location: "/404"
  });
  res.end();
  return {
    props: {
      data: []
    }
  };
}

export default function Campaigns({ campaigns }) {
  console.log("-=--=-", campaigns);
  return (
    <>
      <Head>
        <title>Các hoạt động</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      <Box bg={color.PRIMARY}>
        <SectionContainer hasBreadcrumbs>
          <form>
            <Heading className="text-center font-bold text-white text-4xl">
              Tìm kiếm các hoạt động thiện nguyện ngay
              <p className="mx-auto font-normal text-sm my-6 max-w-lg">
                Nhập tên hoạt động và chọn trạng thái của các hoạt động đó (đang
                diễn ra, kết thúc)
              </p>
              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden justify-between px-2 py-1">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="text"
                  placeholder="Nhập từ khóa ở đây..."
                />
                <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                  <select
                    defaultValue="active"
                    class="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                  >
                    <option value="active">Đang diễn ra</option>
                    <option value="ended">Đã kết thúc</option>
                  </select>
                  <Button type="submit" colorScheme="purple" p={4}>
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </Heading>
          </form>
        </SectionContainer>
      </Box>
    </>
  );
}
