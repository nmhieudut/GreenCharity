import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box pt={16}>{children}</Box>
      <Footer />
    </>
  );
}
