import { Flex, Heading, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import AuctionCard from 'src/components/common/Card/AuctionCard';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { AuctionService } from 'src/services/auction';
import { subscribeToAuctionChanges } from 'src/services/io';

export default function Auctions() {
  const router = useRouter();
  const user = useSelector(state => state.auth.currentUser);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const res = await AuctionService.getAuctions('active');
        setAuctions(res.auctions);
      } catch (e) {
        console.log(e);
      }
    }
    fetchAuctions();
    subscribeToAuctionChanges(event => {
      console.log('====update');
      const { auction, type } = event;
      if (type === 'update') {
        return setAuctions(a => [
          ...a.map(item => (item._id === event._id ? auction : item))
        ]);
      }
      if (type === 'insert') {
        // add auction to front of list
        return setAuctions(a => [auction, ...a]);
      }
    });
  }, []);

  const redirectToCreateAuction = () => {
    if (user) router.push('/auctions/create');
    else router.push('/auth');
  };
  return (
    <SectionContainer>
      <Flex justifyContent='flex-end'>
        <Button
          colorScheme='purple'
          p={4}
          boxShadow='lg'
          onClick={redirectToCreateAuction}
          leftIcon={<RiAuctionFill />}
        >
          Mở phiên đấu giá ngay
        </Button>{' '}
      </Flex>

      <Heading
        textAlign='center'
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
        mb={14}
      >
        Phiên đấu giá đang diễn ra 🔥
      </Heading>
      <Flex className='flex-wrap mt-14 mb-10' width='100%'>
        {auctions?.map(auction => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </Flex>
    </SectionContainer>
  );
}
