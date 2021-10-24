import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Quicksand"
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
