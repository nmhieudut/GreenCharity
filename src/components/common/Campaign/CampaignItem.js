import {
  Badge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import * as n from 'numeral';
import React from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { color } from 'src/constants/color';
import { DateUtils } from 'src/utils/date';
import { convertStatusToString } from 'src/utils/status';
import Button from '../Button';
import ProgressBar from '../Progress/ProgressBar';

export default function CampaignItem({
  data: {
    _id,
    slug,
    amount,
    author,
    content,
    donated_amount,
    finishedAt,
    image,
    name,
    status
  }
}) {
  const percent = `${((donated_amount / amount) * 100).toFixed(2)}%`;
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      my={8}
      className='rounded-sm shadow hover:shadow-xl duration-500 overflow-hidden'
    >
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='col-span-0 sm:col-span-3 flex items-center justify-center'>
          <Image
            className='w-full object-cover object-center h-64'
            src={image}
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
              {convertStatusToString(status)}
            </Badge>
            <Flex color={'gray.500'} align='center' justify='end'>
              <BsClock className='mr-2' size='.75rem' />
              <Text fontSize='sm'>
                {DateUtils.calculateDaysFromNow(finishedAt)} ngày còn lại
              </Text>
            </Flex>
          </Flex>
          <div className='mt-2'>
            <Link href={`/campaigns/${slug}`}>
              <a className='sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline'>
                {name}
              </a>
            </Link>
            <Box
              className='mt-2 text-sm md:text-md line-clamp'
              dangerouslySetInnerHTML={{
                __html: content.replace(/<img .*?>/g, '')
              }}
            />
          </div>
          <Text my={2} fontSize={'md'} fontWeight='bold'>
            {percent}
          </Text>
          <Stack my={2} w={'full'}>
            <ProgressBar color={color.PRIMARY} percent='23%' />
          </Stack>
          <Flex justify='end'>
            <Stack
              spacing={2}
              direction={['column', 'row']}
              align={'end'}
              fontSize={'md'}
            >
              <Text color={color.PRIMARY}>
                {n(donated_amount).format('0,0')} VND quyên góp
              </Text>
              <Text>/ {n(amount).format('0,0')} VND</Text>
            </Stack>
          </Flex>

          <div className='flex justify-between mt-4 my-auto'>
            <Link passHref href={`/campaigns/${slug}`}>
              <Button
                px={6}
                colorScheme={'purple'}
                bg={color.PRIMARY}
                rightIcon={<AiOutlineDoubleRight />}
              >
                Chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}
