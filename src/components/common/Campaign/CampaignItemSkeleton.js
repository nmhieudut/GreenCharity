import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";

export default function CampaignItemSkeleton() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      my={8}
      className="rounded-lg shadow-sm hover:shadow-lg duration-500 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-0 sm:col-span-3 text-center">
          <Skeleton height="full">
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
        </div>
        <div className="col-span-12 sm:col-start-4 sm:col-end-13 p-4 sm:p-8">
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </div>
      </div>
    </Box>
  );
}
