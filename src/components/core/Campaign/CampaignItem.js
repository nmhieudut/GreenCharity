import {
  Badge,
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { BsClock } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { color } from 'src/constants/color';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';
import ProgressBar from '../../common/Progress/ProgressBar';

export default function CampaignItem({
  data: {
    _id,
    slug,
    goal,
    author,
    content,
    donated_amount,
    finishedAt,
    images,
    name,
    status,
    province,
    district,
    ward
  }
}) {
  const percent = `${((donated_amount / goal) * 100).toFixed(2)}%`;
  const provinceString = province.province_name;
  const districtString = district && `, ${district.district_name}, `;
  const wardString = ward && `${ward.ward_name}.`;
  const addressString = `${provinceString}${districtString}${wardString}`;
  return (
    <Link
      href={`/hoat-dong/${slug}`}
      bg={useColorModeValue('white', 'gray.900')}
      className='rounded-sm shadow hover:shadow-xl duration-500 overflow-hidden'
      cursor={'pointer'}
      flexDir={'column'}
      _hover={{ boxShadow: 'lg' }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-12 my-4 border-2 p-1'>
        <div className='col-span-0 sm:col-span-3 flex items-center justify-center'>
          <Image
            className='w-full object-cover object-center h-56'
            src={images[0]}
            alt={name}
            layout='fill'
          />
        </div>
        <div className='col-span-12 sm:col-start-4 sm:col-end-13 p-4'>
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
            {status === 'active' && (
              <Flex color={'gray.500'} align='center' justify='end'>
                <BsClock className='mr-2' size='.75rem' />
                <Text fontSize='sm'>
                  {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
                </Text>
              </Flex>
            )}
          </Flex>
          <div className='mt-2'>
            <Text className='text-md sm:text-sm lg:text-lg font-bold'>
              {name}
            </Text>

            <Box
              className='mt-2 text-sm md:text-md line-clamp'
              dangerouslySetInnerHTML={{
                __html: content.replace(/<img .*?>/g, '')
              }}
            />
          </div>
          <Box verticalAlign='middle' my={2}>
            <span className='inline-block align-baseline'>
              <HiLocationMarker />
            </span>
            <Text as='span' fontSize='sm' color='gray.500' display='inline'>
              &nbsp;{addressString}
            </Text>
          </Box>
          <Text my={2} fontSize={'md'} fontWeight='bold' textAlign={'right'}>
            {percent}
          </Text>
          <Stack my={2} w={'full'}>
            <ProgressBar color={color.PRIMARY} percent={percent} />
          </Stack>
          <Flex justify='end'>
            <Stack
              spacing={2}
              direction={['column', 'row']}
              align={'end'}
              fontSize={'sm'}
            >
              <Text color={color.PRIMARY}>
                {toVND(donated_amount)} VND quyên góp
              </Text>
              <Text>/ {toVND(goal)} VND</Text>
            </Stack>
          </Flex>
        </div>
      </div>
    </Link>
  );
}
