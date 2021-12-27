import {
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
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';
import Button from '../Button';

const AuctionCard = ({ auction }) => {
  const {
    _id,
    title,
    description,
    images,
    startPrice,
    currentBid,
    finishedAt,
    status
  } = auction;

  const { days, hours, minutes, seconds } = useCountdown(finishedAt);
  return (
    <Link
      href={`/auctions/${_id}`}
      cursor={'pointer'}
      flexDir={'column'}
      className='transition duration-300 md:mx-2 mb-8 rounded-lg'
      _hover={{ boxShadow: 'lg' }}
      bg={useColorModeValue('white', 'gray.900')}
      w={['100%', '45%', '30%']}
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
          <Box
            backgroundImage={images[0]}
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundPosition='center'
            h={'12rem'}
            position='relative'
          >
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
                {convertStatusToString(status)}
              </Badge>
            </Flex>

            <Stack>
              <Heading
                _hover={{
                  color: color.PRIMARY
                }}
                fontSize={'lg'}
                fontFamily={'bold'}
              >
                {title}
              </Heading>
              <Box className='text-gray-600 leading-relaxed block'>
                <div className='text-sm line-clamp'>{description} </div>
              </Box>
            </Stack>
            <Flex fontSize='sm' className='mt-4' justify='space-between'>
              <Text fontFamily={'bold'}>Khởi điểm:</Text>
              <Text>{VNDFormatter(startPrice)} đ</Text>
            </Flex>
            {currentBid && (
              <Flex
                fontSize='sm'
                className='mt-4'
                justify='space-between'
                color={color.PRIMARY}
              >
                <Text fontFamily={'bold'}>Hiện tại:</Text>
                <Text>{VNDFormatter(currentBid.amount)} đ</Text>
              </Flex>
            )}

            <Button colorScheme='purple' mt={4}>
              Tham gia ngay
            </Button>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
export default AuctionCard;
