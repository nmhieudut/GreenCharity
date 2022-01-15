import {
  AspectRatio,
  Box,
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
  const { _id, thumbnail, title, shortContent, createdAt } = data;
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      className='rounded-sm shadow hover:shadow-xl duration-500 overflow-hidden'
      cursor={'pointer'}
      flexDir={'column'}
      _hover={{ boxShadow: 'lg' }}
      mb={4}
    >
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='col-span-0 sm:col-span-3'>
          <AspectRatio maxW='400px' ratio={16 / 9}>
            <Image
              layout='fill'
              src={thumbnail}
              alt={title}
              className='object-cover object-center w-full h-56'
            />
          </AspectRatio>
        </div>
        <div className='col-span-12 sm:col-start-4 sm:col-end-13 p-4'>
          <Flex mb={2} alignItems='center' justify='space-between'>
            <Text fontSize='sm' color={'gray.500'}>
              {format(new Date(createdAt), 'MMM dd, yyyy')}
            </Text>
          </Flex>
          <div className='mt-2'>
            <Link
              href={`tin-tuc/${_id}`}
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
