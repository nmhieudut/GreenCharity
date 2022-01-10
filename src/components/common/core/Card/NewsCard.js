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

export default function NewsCard({ item, ...rest }) {
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <Box
      bg={bg}
      borderWidth='1px'
      borderColor='gray.200'
      rounded='lg'
      m={3}
      overflow='hidden'
      {...rest}
    >
      <AspectRatio maxW='400px' ratio={16 / 9}>
        <Image
          src={item.thumbnail}
          className='object-cover object-center w-full'
          alt={item.title}
        />
      </AspectRatio>

      <Flex direction='column' p={4}>
        <Box className="h-auto md:h-40 lg:h-40 mb-2">
          <Link href={`/news/${item._id}`} flex='1'>
            <Text as={'h3'} fontSize={'md'} fontWeight={600}>
              {item.title}
            </Text>
          </Link>
          <Text as={'p'} fontSize='sm' py={2}>
            {item.shortContent}
          </Text>
        </Box>

        <Text mt={'auto'} as={'p'} fontSize='sm' color='gray.500'>
          {format(new Date(item.createdAt), 'dd/MM/yyyy')}
        </Text>
      </Flex>
    </Box>
  );
}
