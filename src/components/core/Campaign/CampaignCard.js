import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { BsClock } from 'react-icons/bs';
import { color } from 'src/constants/color';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';
import ProgressBar from '../../common/Progress/ProgressBar';

export default function CampaignCard(props) {
  const {
    campaign: {
      slug,
      _id,
      images,
      status,
      name,
      content,
      donated_amount,
      goal,
      finishedAt
    }
  } = props;
  const percent = ((donated_amount / goal) * 100).toFixed(2);

  return (
    <Link
      href={`/hoat-dong/${slug}`}
      cursor={'pointer'}
      flexDir={'column'}
      className='transition duration-300 md:mx-2 mb-8'
      _hover={{ boxShadow: 'lg' }}
      bg={useColorModeValue('white', 'gray.900')}
      w={['100%', '45%', '31%']}
      mx={2}
      rounded={'lg'}
      overflow='hidden'
      border={'.5px solid lightgray'}
    >
      <Box className='w-full md:mb-0'>
        <Box className='rounded-lg shadow' overflow='hidden'>
          <AspectRatio maxW='400px' ratio={16 / 9}>
            <Image src={images[0]} alt={name} objectFit='cover' />
          </AspectRatio>

          <Box className='px-4 pt-4 h-auto md:h-40 lg:h-40'>
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
                <Text p={1} fontSize='xs'>
                  {convertStatusToString(status)}
                </Text>
              </Badge>
              <Badge colorScheme={'purple'} rounded='full'>
                {status === 'active' && (
                  <Text fontSize='.6rem' p={1}>
                    {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
                  </Text>
                )}
              </Badge>
            </Flex>

            <Stack>
              <Heading
                _hover={{
                  color: color.PRIMARY
                }}
                fontSize={'md'}
                fontWeight={'bold'}
              >
                {name}
              </Heading>
              <Box className='text-gray-600 leading-relaxed block'>
                <div
                  className='text-xs line-clamp'
                  dangerouslySetInnerHTML={{
                    __html: content.replace(/<img .*?>/g, '')
                  }}
                />
              </Box>
            </Stack>
          </Box>
          <Box mt={'auto'} px={4} mb={4}>
            <Flex
              justifyContent='space-between'
              alignItems='center'
              fontSize='sm'
            >
              <Flex>
                <b>{toVND(donated_amount)}đ</b>&nbsp;/&nbsp;
                <Text color='gray.500'>{toVND(goal)}đ</Text>
              </Flex>
              <Text as='b'>{percent > 100 ? 100 : percent}%</Text>
            </Flex>

            <Stack my={2} w={'full'}>
              <ProgressBar color={color.PRIMARY} percent={`${percent}%`} />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
