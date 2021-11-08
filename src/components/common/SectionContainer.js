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
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box as={"section"} bg={hasBg && bg} {...rest}>
      {hasBreadcrumbs && <div className="h-12"></div>}
      {hasParticle && <Particle />}
      <div className="container">{children}</div>
    </Box>
  );
}
