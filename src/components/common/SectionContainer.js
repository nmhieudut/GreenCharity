import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function SectionContainer({
  children,
  hasBg,
  hasBreadcrumbs,
  ...rest
}) {
  return (
    <Box
      as={"section"}
      bg={hasBg && useColorModeValue("gray.100", "gray.700")}
      {...rest}
    >
      {hasBreadcrumbs && <div className="h-12"></div>}
      <div className="container">{children}</div>
    </Box>
  );
}
