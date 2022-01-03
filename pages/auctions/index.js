import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import CardSkeleton from 'src/components/common/Campaign/CardSkeleton';
import AuctionCard from 'src/components/common/Card/AuctionCard';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { AuctionService } from 'src/services/auction';
import { subscribeToAuctionChanges } from 'src/services/io';

export default function Auctions() {
  const router = useRouter();
  const user = useSelector(state => state.auth.currentUser);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuctions() {
      setLoading(true);
      try {
        const res = await AuctionService.getAuctions('active');
        setAuctions(res.auctions);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAuctions();
    subscribeToAuctionChanges(event => {
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
    <>
      <Box
        background="url('/images/auction.jpg') no-repeat"
        backgroundSize='cover'
      >
        <Center
          mx='auto'
          py={48}
          style={{ background: 'rgba(128,90,213,0.5)' }}
        >
          <Flex
            flexDirection='column'
            width='100%'
            justifyContent='center'
            alignItems='center'
          >
            <Text
              textAlign='center'
              fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
              color='white'
              fontWeight='bold'
            >
              Sàn đấu giá từ thiện
            </Text>
            <Text fontSize='lg' color='gray.100'>
              Đây là nơi đấu giá cho các hoạt động từ thiện. Mọi người ai cũng
              có thể bán hoặc mua để ủng hộ 1 phần cho các hoạt động thiện
              nguyện.
            </Text>
          </Flex>
        </Center>
      </Box>
      <SectionContainer>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
          my={2}
        >
          Phiên đấu giá đang diễn ra 🔥
        </Heading>
        <Flex justifyContent='flex-end'>
          <Button
            colorScheme='purple'
            p={4}
            my={4}
            boxShadow='lg'
            onClick={redirectToCreateAuction}
            leftIcon={<RiAuctionFill />}
          >
            Mở phiên đấu giá ngay
          </Button>
        </Flex>
        <Flex className='flex-wrap mt-14 mb-10' width='100%'>
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          {!loading &&
            auctions?.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
        </Flex>
      </SectionContainer>
    </>
  );
}
