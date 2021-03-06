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
  Tr,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useQuery } from 'react-query';
import CustomAlertModal from 'src/components/common/Alert';
import Button from 'src/components/common/Button';
import { color } from 'src/constants/color';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { newsService } from 'src/services/news';
import { DateUtils } from 'src/utils/date';

function NewRow({ newEntry }) {
  const { thumbnail, title, shortContent, createdAt, content } = newEntry;
  return (
    <Tr>
      <Td>
        <Badge variantColor='green'>{newEntry._id}</Badge>
      </Td>
      <Td>
        <Image src={thumbnail} w={16} alt={title} />
      </Td>
      <Td>
        <Heading as='h3' size='sm'>
          {title}
        </Heading>
      </Td>
      <Td>{shortContent}</Td>
      <Td>{DateUtils.toDate(createdAt)}</Td>
      <Td>
        <CustomAlertModal
          size='xl'
          modalHeader={title}
          modalBody={
            <div
              className='wrapper-main-content'
              dangerouslySetInnerHTML={{ __html: content }}
            />
          }
        >
          <Button
            leftIcon={<AiOutlineEye />}
            colorScheme='purple'
            variant='solid'
            noLinear
          >
            Xem
          </Button>{' '}
        </CustomAlertModal>
      </Td>
    </Tr>
  );
}

function News() {
  const { data, isLoading, isError } = useQuery('news', () =>
    newsService.fetchAll()
  );
  const { news } = data || {};

  const bg = useColorModeValue('gray.100', 'gray.800');
  return (
    <AdminLayout>
      <Stack
        direction={['column', 'row']}
        spacing={4}
        align='center'
        mb={4}
        p={8}
        bg={bg}
      >
        <Heading
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          C??c tin t???c
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
            <Th>M?? tin t???c</Th>
            <Th>H??nh ???nh</Th>
            <Th>Ti??u ?????</Th>
            <Th>N???i dung t??m t???t</Th>
            <Th>Ng??y t???o</Th>
            <Th>Xem</Th>
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
