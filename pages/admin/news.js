import {
  Badge,
  Heading,
  Image,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React from 'react';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function NewRow({ newEntry }) {
  const { thumbnail, title, shortContent, url, content } = newEntry;
  console.log('=========', newEntry);
  return (
    <Tr>
      <Td>
        <Badge variantColor='green'>{newEntry._id}</Badge>
      </Td>
      <Td>
        <Image src={thumbnail} size='sm' />
      </Td>
      <Td>
        <Heading as='h3' size='sm'>
          {title}
        </Heading>
        <p>{shortContent}</p>
      </Td>
      <Td>
        <Stack isInline spacing={2}>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            <Image src='/icons/link.svg' size='sm' />
          </a>
          <a href={`/admin/news/${newEntry._id}`}>
            <Image src='/icons/edit.svg' size='sm' />
          </a>
        </Stack>
      </Td>
      <Td>
        <Stack isInline spacing={2}>
          <a href={`/admin/news/${newEntry._id}`}>
            <Image src='/icons/edit.svg' size='sm' />
          </a>
          <a href={`/admin/news/${newEntry._id}`}>
            <Image src='/icons/delete.svg' size='sm' />
          </a>
        </Stack>
      </Td>
    </Tr>
  );
}

function News() {
  const { data, isLoading, isError } = useQuery('news', () =>
    AdminService.getNews()
  );
  const { news } = data || {};

  const bg = useColorModeValue('gray.100', 'gray.800');
  return (
    <AdminLayout>
      <Stack direction={['column', 'row']} spacing={4} align='center' mb={4}>
        <Heading
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Các tin tức
        </Heading>
      </Stack>
      <Table
        variant='striped'
        colorScheme='gray'
        shadow='xl'
        rounded='md'
        overflow='hidden'
      >
        <Thead bg={bg}>
          <Tr>
            <Th>Mã giao dịch</Th>
            <Th>Tài khoản</Th>
            <Th>Phương thức</Th>
            <Th>Ngày giao dịch</Th>
            <Th>Kiểu giao dịch</Th>
            <Th>Số tiền</Th>
            <Th>Trạng thái</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={5}>
                <Spinner />
              </Td>
            </Tr>
          )}
          {news?.map(newEntry => (
            <NewRow key={newEntry._id} newEntry={newEntry} />
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
}

export default withAdmin(News);
