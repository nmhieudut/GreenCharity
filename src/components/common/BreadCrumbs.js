import React from "react";
import {
  Box,
  Breadcrumb as CBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/router";
import { convertToBreadcrumbs } from "src/utils/locales";
import { color } from "src/constants/color";

export default function BreadCrumbs(props) {
  const router = useRouter();
  const { pathname } = router;
  const pathNames = pathname.split("/").filter(x => x);
  return (
    <>
      {pathNames.length > 0 && (
        <Box {...props}>
          <Box w={"full"} className="container">
            <CBreadcrumb
              spacing="8px"
              separator={<BiChevronRight color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  {convertToBreadcrumbs("Home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathNames.map((name, index) => {
                const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathNames.length - 1;
                return isLast ? (
                  <BreadcrumbItem
                    key={index}
                    isCurrentPage
                    color={color.PRIMARY}
                  >
                    <Text>{convertToBreadcrumbs(name)}</Text>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={routeTo}>
                      {convertToBreadcrumbs(name)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
            </CBreadcrumb>
          </Box>
        </Box>
      )}
    </>
  );
}
