import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Particle from "../uncommon/Particle";

export default function SectionContainer({
  children,
  hasBg,
  hasBreadcrumbs,
  hasParticle,
  ...rest
}) {
  return (
    <Box
      as={"section"}
      bg={hasBg && useColorModeValue("gray.100", "gray.700")}
      {...rest}
    >
      {hasBreadcrumbs && <div className="h-12"></div>}
      {hasParticle && <Particle />}
      <div className="container">{children}</div>
    </Box>
  );
}
