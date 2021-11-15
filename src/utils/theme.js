import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Nunito'
  },
  styles: {
    global: {
      // styles for the `a`
      a: {
        _hover: {
          color: 'purple.500'
        }
      }
    }
  }
});

export default theme;
