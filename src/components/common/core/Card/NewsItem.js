import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { BsClock } from 'react-icons/bs';

export default function NewsItem({ data }) {
  const { _id, thumbnail, title, shortContent, url, createdAt } = data;
  return (
    <Box
      pb={4}
      bg={useColorModeValue('white', 'gray.900')}
      className='rounded-sm shadow hover:shadow-xl duration-500 overflow-hidden'
      cursor={'pointer'}
      flexDir={'column'}
      _hover={{ boxShadow: 'lg' }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='col-span-0 sm:col-span-3 flex items-center justify-center'>
          <Image
            className='w-full object-cover object-center h-56'
            src={thumbnail}
            alt={title}
            layout='fill'
          />
        </div>
        <div className='col-span-12 sm:col-start-4 sm:col-end-13 p-4'>
          <Flex mb={2} alignItems='center' justify='space-between'>
            <Flex color={'gray.500'} align='center' justify='end'>
              <BsClock className='mr-2' size='.75rem' />
              <Text fontSize='sm'>
                {format(new Date(createdAt), 'MMM dd, yyyy')}
              </Text>
            </Flex>
          </Flex>
          <div className='mt-2'>
            <Link
              href={`news/${_id}`}
              className='text-md sm:text-sm lg:text-lg font-bold'
            >
              {title}
            </Link>

            <Box className='mt-2 text-sm md:text-md line-clamp'>
              {shortContent}
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
}
