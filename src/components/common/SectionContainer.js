import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function SectionContainer({ children, hasBg, ...rest }) {
  return (
    <Box
      as={"section"}
      bg={hasBg && useColorModeValue("gray.100", "gray.700")}
      {...rest}
    >
      <div className="container">{children}</div>
    </Box>
  );
}
