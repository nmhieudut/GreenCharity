import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  color,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { BsClock } from 'react-icons/bs';
import useCountdown from 'src/hooks/useCountdown';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';
import Button from '../../common/Button';

const AuctionCard = ({ auction }) => {
  const {
    _id,
    title,
    description,
    images,
    startPrice,
    currentBid,
    finishedAt,
    status,
    bids
  } = auction;

  const { days, hours, minutes, seconds } = useCountdown(finishedAt);
  return (
    <Link
      href={`/dau-gia/${_id}`}
      cursor={'pointer'}
      flexDir={'column'}
      className='transition duration-300 md:mx-2 mb-8 rounded-lg'
      _hover={{ boxShadow: 'lg' }}
      bg={useColorModeValue('white', 'gray.900')}
      mx={2}
    >
      {/* sold overlay */}
      {status === 'success' && (
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.8}
        />
      )}

      <Box className='w-full md:mb-0'>
        <Box className='rounded-lg shadow' overflow='hidden'>
          <Box position='relative'>
            <AspectRatio maxW='400px' ratio={16 / 9}>
              <Image src={images[0]} alt={title} objectFit='cover' />
            </AspectRatio>
            <Flex
              color={'gray.500'}
              align='center'
              justify='end'
              position='absolute'
              bottom={0}
              right={0}
              p={2}
              bg={useColorModeValue('gray.200', 'gray.700')}
            >
              {!DateUtils.isExpired(finishedAt) ? (
                <Text as={'b'} className='tracking-wide'>
                  {days > 0 && days + 'd:'}
                  {hours > 0 && hours + 'h:'}
                  {minutes > 0 && minutes + 'm:'}
                  {seconds}s
                </Text>
              ) : (
                <Text color={'red.500'} as={'b'}>
                  Hết hạn
                </Text>
              )}
            </Flex>
          </Box>

          <Box className='p-4 h-auto'>
            <Flex mb={2} alignItems='center' justify='space-between'>
              <Badge
                variant='outline'
                colorScheme={
                  status === 'pending'
                    ? 'purple'
                    : status === 'active'
                    ? 'green'
                    : 'red'
                }
              >
                {fromStatusToString(status)}
              </Badge>
            </Flex>

            <Stack>
              <Heading
                _hover={{
                  color: color.PRIMARY
                }}
                fontSize={'lg'}
                fontWeight={'bold'}
              >
                {title}
              </Heading>
              <Box className='text-gray-600 leading-relaxed block'>
                <div className='text-sm line-clamp'>{description} </div>
              </Box>
            </Stack>
            <Flex fontSize='sm' className='mt-4' justify='space-between'>
              <Text fontWeight={'bold'}>Khởi điểm:</Text>
              <Text>{toVND(startPrice)} đ</Text>
            </Flex>
            {currentBid && (
              <Flex
                fontSize='sm'
                className='mt-4'
                justify='space-between'
                color={color.PRIMARY}
              >
                <Text fontWeight={'bold'}>Hiện tại:</Text>
                <Text>{toVND(currentBid.amount)} đ</Text>
              </Flex>
            )}
            {bids && bids.length > 0 && (
              <Flex align='center' my={2} justify='flex-end'>
                <AvatarGroup size='sm' max={3} fontSize='xs'>
                  {bids.map(bid => (
                    <Avatar
                      key={bid._id}
                      name={bid.author.name}
                      src={bid.author.picture}
                    />
                  ))}
                </AvatarGroup>
                <span className='ml-1'>đã tham gia</span>
              </Flex>
            )}
            <Flex justify='flex-end'>
              <Button colorScheme='purple' mt={2}>
                Tham gia ngay
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
export default AuctionCard;
