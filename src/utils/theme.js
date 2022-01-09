import { extendTheme } from '@chakra-ui/react';
import { CalendarDefaultTheme } from '@uselessdev/datepicker';

const theme = extendTheme(CalendarDefaultTheme, {
  fonts: {
    heading: 'Nunito',
    body: 'Nunito'
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
  },
  components: {
    Calendar: {
      parts: ['calendar'],

      baseStyle: {
        calendar: {
          borderWidth: '6px',
          borderColor: 'pink.400',
          rounded: 'none',
          shadow: 'none',
          boxShadow: '32px 16px 0 6px #3B4DCC'
        }
      }
    },

    CalendarControl: {
      parts: ['button'],

      baseStyle: {
        button: {
          h: 6,
          px: 2,
          rounded: 'none',
          fontSize: 'sm',
          color: 'white',
          bgColor: 'purple.500',

          _hover: {
            bgColor: 'purple.200'
          },

          _focus: {
            outline: 'none'
          }
        }
      }
    }
  }
});

export default theme;
