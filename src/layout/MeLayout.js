import { Flex, IconButton } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiMenu, FiSettings } from 'react-icons/fi';
import SectionContainer from 'src/components/common/SectionContainer';
import NavItem from 'src/components/uncommon/SideBar/NavItem';
import { meSideBar } from 'src/constants/sidebar';

export default function MeLayout({ children }) {
  const [navSize, changeNavSize] = useState('large');
  const router = useRouter();
  const { pathname } = router;
  console.log('---', pathname);
  return (
    <div>
      <Head>
        <title>Tài khoản</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <SectionContainer>
        <Flex>
          <Flex
            transition='all 0.3s ease-in-out'
            pos='sticky'
            h='calc(100vh - 8.125rem)'
            zIndex={49}
            w={navSize == 'small' ? '75px' : '300px'}
            boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
            flexDir='column'
            justifyContent='space-between'
          >
            <Flex
              p='5%'
              flexDir='column'
              w='100%'
              alignItems={navSize == 'small' ? 'center' : 'flex-start'}
              as='nav'
            >
              <IconButton
                background='none'
                mt={5}
                _hover={{ background: 'none' }}
                icon={<FiMenu />}
                onClick={() => {
                  if (navSize == 'small') changeNavSize('large');
                  else changeNavSize('small');
                }}
              />
              {meSideBar.map((item, index) => (
                <NavItem
                  key={index}
                  navSize={navSize}
                  icon={item.icon}
                  routeTo={item.path}
                  active={item.path === pathname}
                  title={item.title}
                />
              ))}
            </Flex>
          </Flex>
          {children}
        </Flex>
      </SectionContainer>
    </div>
  );
}
