import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Nunito',
    body: 'Nunito Sans'
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
