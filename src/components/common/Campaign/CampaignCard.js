import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import * as n from 'numeral';
import { BsClock } from 'react-icons/bs';
import { color } from 'src/constants/color';
import { DateUtils } from 'src/utils/date';
import { convertStatusToString } from 'src/utils/status';
import ProgressBar from '../Progress/ProgressBar';

export default function CampaignCard(props) {
  const {
    campaign: {
      slug,
      _id,
      image,
      status,
      name,
      content,
      donated_amount,
      amount,
      finishedAt
    }
  } = props;
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  return (
    <Link
      href={`/campaigns/${slug}`}
      cursor={'pointer'}
      flexDir={'column'}
      className='transition duration-300 md:mx-2 mb-8'
      _hover={{ boxShadow: 'xl' }}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <Box className='w-full md:mb-0'>
        <Box className='rounded-sm shadow' overflow='hidden'>
          <Box pos='relative'>
            <Image
              className='h-56 w-full object-cover object-center '
              src={image}
              layout={'fill'}
              alt=''
            />
          </Box>

          <Box className='px-4 pt-4 h-auto md:h-40 lg:h-40'>
            <Tag
              mb={2}
              variant='solid'
              colorScheme={
                status === 'pending'
                  ? 'blue'
                  : status === 'active'
                  ? 'purple'
                  : 'red'
              }
            >
              {convertStatusToString(status)}
            </Tag>
            <Stack>
              <Heading
                _hover={{
                  color: color.PRIMARY
                }}
                fontSize={'md'}
                fontFamily={'body'}
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
            <Flex justifyContent='space-between' alignItems='center'>
              <Text>
                <b>{n(donated_amount).format('0,0')}đ</b> quyên góp
              </Text>
              <Text as='b' fontSize='sm'>
                {percent}
              </Text>
            </Flex>

            <Stack my={2} w={'full'}>
              <ProgressBar color={color.PRIMARY} percent={percent} />
            </Stack>
            <Flex color={'gray.500'} align='center' justify='end' mt={2}>
              <BsClock className='mr-2' size='.75rem' />
              <Text fontSize='sm'>
                {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
