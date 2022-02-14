import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Helvetica',
    body: 'Helvetica'
  },
  styles: {
    global: {
      a: {
        _hover: {
          color: 'purple.500'
        }
      },
      button: {
        fontWeight: 400
      }
    }
  }
});

export default theme;
