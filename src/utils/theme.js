import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Quicksand",
    body: "Be Vietnam"
  },
  styles: {
    global: {
      // styles for the `a`
      a: {
        _hover: {
          color: "pink.500"
        }
      }
    }
  }
});

export default theme;
