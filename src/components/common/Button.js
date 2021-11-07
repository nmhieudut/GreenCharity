import { Button as ChakraButton } from "@chakra-ui/react";
import React from "react";

export default function Button({ nolinear, children, ...rest }) {
  return (
    <ChakraButton
      {...rest}
      bgGradient={
        !nolinear && "linear(to-r, purple.400, purple.500, purple.600)"
      }
    >
      {children}
    </ChakraButton>
  );
}
