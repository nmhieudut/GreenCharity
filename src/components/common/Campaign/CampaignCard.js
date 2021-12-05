import {
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
import { VNDFormatter } from 'src/utils/number';
import { convertStatusToString } from 'src/utils/status';
import ProgressBar from '../Progress/ProgressBar';

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
  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;
  return (
    <Link
      href={`/campaigns/${slug}`}
      cursor={'pointer'}
      flexDir={'column'}
      className='transition duration-300 md:mx-2 mb-8'
      _hover={{ boxShadow: 'lg' }}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <Box className='w-full md:mb-0'>
        <Box className='rounded-sm shadow' overflow='hidden'>
          <Box pos='relative'>
            <Image
              className='h-56 w-full object-cover object-center'
              src={images[0]}
              layout={'fill'}
              alt=''
            />
          </Box>

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
                {convertStatusToString(status)}
              </Badge>
              <Flex color={'gray.500'} align='center' justify='end'>
                <BsClock className='mr-2' size='.75rem' />
                <Text fontSize='sm'>
                  {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
                </Text>
              </Flex>
            </Flex>

            <Stack>
              <Heading
                _hover={{
                  color: color.PRIMARY
                }}
                fontSize={'lg'}
                fontFamily={'bold'}
              >
                {name}
              </Heading>
              <Box className='text-gray-600 leading-relaxed block'>
                <div
                  className='text-sm line-clamp'
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
              <Text>
                <b>{VNDFormatter(donated_amount)}đ</b> quyên góp
              </Text>
              <Text as='b'>{percent}</Text>
            </Flex>

            <Stack my={2} w={'full'}>
              <ProgressBar color={color.PRIMARY} percent={percent} />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
