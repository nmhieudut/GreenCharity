import { chakra, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { color } from 'src/constants/color';

const SocialButton = ({ children, label, href, ...rest }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: color.PRIMARY,
        color: 'white'
      }}
      {...rest}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
export default SocialButton;
