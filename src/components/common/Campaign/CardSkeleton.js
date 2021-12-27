import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';

export default function CardSkeleton() {
  return (
    <Box
      m={2}
      bg={useColorModeValue('white', 'gray.900')}
      w={['100%', '45%', '31%']}
      className='rounded-lg shadow-sm hover:shadow-lg duration-500 overflow-hidden'
    >
      <div className='flex flex-col w-full'>
        <div className='h-48'>
          <Skeleton height='full'>
            <div></div>
            <div></div>
          </Skeleton>
        </div>
        <div className='col-span-12 sm:col-start-4 sm:col-end-13 p-4 sm:p-8'>
          <SkeletonText mt='4' noOfLines={6} spacing='4' />
        </div>
      </div>
    </Box>
  );
}
