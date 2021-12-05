import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings
} from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import NavItem from './NavItem';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex
      pos='sticky'
      h='full'
      boxShadow='0 0 12px 0 rgba(0, 0, 0, 0.05)'
      w={navSize == 'small' ? '75px' : '200px'}
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
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title='Dashboard'
          description='This is the description for the dashboard.'
        />
        <NavItem navSize={navSize} icon={FiCalendar} title='Calendar' active />
        <NavItem navSize={navSize} icon={FiUser} title='Clients' />
        <NavItem navSize={navSize} icon={IoPawOutline} title='Animals' />
        <NavItem navSize={navSize} icon={FiDollarSign} title='Stocks' />
        <NavItem navSize={navSize} icon={FiBriefcase} title='Reports' />
        <NavItem navSize={navSize} icon={FiSettings} title='Settings' />
      </Flex>
    </Flex>
  );
}
