import { Box } from "@chakra-ui/react";
import React from "react";

export default function SectionContainer({ children, ...rest }) {
  return (
    <Box as={"section"} {...rest}>
      <div className="container">{children}</div>
    </Box>
  );
}
