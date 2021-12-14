import {
  Box,
  Divider,
  Grid,
  Image,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import React from 'react';
import { useQuery } from 'react-query';
import DividerWithText from 'src/components/common/DividerWithText';
import SectionContainer from 'src/components/common/SectionContainer';
import { newsService } from 'src/services/news';

export async function getServerSideProps(ctx) {
  try {
    const { news } = await newsService.fetchById(ctx.query.id);
    return {
      props: {
        newsDataEntry: news
      }
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true
    };
  }
}

export default function NewsDetail({ newsDataEntry }) {
  const { data, isLoading, isError, error } = useQuery('news', () =>
    newsService.fetchAll()
  );
  const { news } = data || [];
  const { title, thumbnail, content, url, createdAt } = newsDataEntry || {};
  const filteredNews = news?.filter(item => item._id !== newsDataEntry._id);
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <SectionContainer>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Text as={'h1'} fontSize={'3xl'} fontWeight={600} mb={7}>
        {title}
      </Text>
      <Text as={'p'} fontSize='sm'>
        {format(new Date(createdAt), 'dd/MM/yyyy | HH:mm')}
      </Text>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', '70% 30%']}
        gap={4}
      >
        <Box pr={8}>
          {thumbnail && (
            <Image
              className='object-cover object-center'
              w={'full'}
              py={4}
              src={thumbnail}
              alt={title}
            />
          )}
          <Box py={8}>
            <div
              className='wrapper-main-content'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Box mt='6'>
              <Text>
                Nguồn:
                <Link className='ml-2 italic' target='_blank' href={url}>
                  {url}
                </Link>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <DividerWithText>
            <Text as={'h1'} fontSize={'xl'} fontWeight={600}>
              Tin tức khác
            </Text>
          </DividerWithText>
          {filteredNews?.map((item, index) => (
            <Box
              key={index}
              bg={bg}
              borderWidth='1px'
              borderColor='gray.200'
              rounded='lg'
              my={4}
              overflow='hidden'
            >
              <Image
                src={item.thumbnail}
                className='object-cover object-center w-full'
                alt={item.title}
              />
              <Box p={4}>
                <Link href={`/news/${item._id}`}>
                  <a>
                    <Text as={'h3'} fontSize={'xl'} fontWeight={600}>
                      {item.title}
                    </Text>
                  </a>
                </Link>
                <Text as={'p'} fontSize='sm'>
                  {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </SectionContainer>
  );
}
