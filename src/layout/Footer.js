import {
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import SectionContainer from 'src/components/common/SectionContainer';
import SocialButton from 'src/components/common/SocialButton';
import { color } from 'src/constants/color';

const Logo = props => {
  return (
    <a href='/'>
      <img src='/images/logo.svg' {...props} width={120} alt='logo' />
    </a>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'600'} fontSize={'xl'} mb={2} color={color.PRIMARY}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <SectionContainer position='relative' marginTop={'auto'} zIndex='50'>
      <SimpleGrid
        templateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        spacing={8}
      >
        <Stack spacing={6}>
          <Logo color={useColorModeValue('gray.700', 'white')} />
          <Text>© 2021 Green Charity. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Company</ListHeader>
          <Link href={'/ve-chung-toi'}>Về chúng tôi</Link>
          <Link href={'/tin-tuc'}>Tin tức</Link>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Chăm sóc khách hàng</ListHeader>
          <Text>
            Hotline: <b>0905245054</b> (Anh Hiếu Hoa Hồng)
          </Text>
          <Text>
            Email: <b>greencharity.help@gmail.com / hieutk5@gmail.com</b>
          </Text>
          <Text>
            Website:{' '}
            <Link
              target='_blank'
              color={color.PRIMARY}
              href={'https://hieurose.vercel.app'}
            >
              Hiếu Hoa Hồng
            </Link>
          </Text>
        </Stack>
      </SimpleGrid>
    </SectionContainer>
  );
}
