import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Nunito',
    body: 'Inter'
  },
  styles: {
    global: {
      a: {
        fontFamily: 'Quicksand',
        _hover: {
          color: 'purple.500'
        }
      },
      button: {
        fontFamily: 'Open Sans',
        fontWeight: 400
      }
    }
  }
});

export default theme;
