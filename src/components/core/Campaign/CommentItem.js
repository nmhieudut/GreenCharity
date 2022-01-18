import {
  Avatar,
  Box,
  CloseButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { color } from 'src/constants/color';

export default function CommentItem({ comment, hasPermission, onDelete }) {
  const { author, text, createdAt, _id } = comment;
  const bg = useColorModeValue('gray.100', 'gray.900');

  const handleDelete = () => {
    if (hasPermission) {
      return onDelete(_id);
    }
    return;
  };

  return (
    <Box padding='4' rounded={'xl'} bg={bg} my={4}>
      <Stack
        mb={2}
        direction={'row'}
        justify='space-between'
        spacing={4}
        align={'center'}
      >
        <Stack direction={'row'} spacing={4} align={'center'}>
          <Avatar src={author.picture} alt={'Author'} size={'sm'} />
          <Stack direction={'column'} fontSize={'md'}>
            <Text fontSize='md' as={'b'} color={color.PRIMARY}>
              {author.name}
            </Text>
            <Text fontSize='xs' as={'i'} color={'gray.500'}>
              {format(new Date(createdAt), 'dd/MM/yyy hh:ss:mm')}
            </Text>
          </Stack>
        </Stack>

        <CloseButton onClick={handleDelete} ml='auto' />
      </Stack>
      <Box mt={4}>
        <Text fontSize='md'>{text}</Text>
      </Box>
    </Box>
  );
}
