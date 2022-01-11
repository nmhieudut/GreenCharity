import {
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import MemberCard from 'src/components/common/core/Card/MemberCard';
import SectionContainer from 'src/components/common/SectionContainer';
import { color } from 'src/constants/color';
import { members } from 'src/constants/members';
const About = () => {
  return (
    <div>
      <Head>
        <title>Đội ngũ phát triển</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <SectionContainer>
        <Heading
          textAlign='center'
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          color={color.PRIMARY}
        >
          Đội ngũ phát triển
        </Heading>
        {/* description text */}
        <Text
          my={8}
          textAlign='center'
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          lineHeight={'110%'}
          color='gray.500'
        >
          Đội ngũ phát triển của chúng tôi là những người đã được đào tạo chuyên
          nghiệp và có kinh nghiệm lâu dài trong lĩnh vực phát triển ứng dụng.
        </Text>
        <Tabs my={14} isFitted variant='soft-rounded' colorScheme='purple'>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'purple.500' }}>
              Những người đứng đầu
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'purple.500' }}>Thiết kế</Tab>
            <Tab _selected={{ color: 'white', bg: 'purple.500' }}>
              Phát triển
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'purple.500' }}>
              Marketing
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid
                gap={4}
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)'
                ]}
              >
                {members.founders.map((founder, index) => (
                  <MemberCard key={index} data={founder} />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid
                gap={4}
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)'
                ]}
              >
                {members.designers.map((founder, index) => (
                  <MemberCard key={index} data={founder} />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid
                gap={4}
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)'
                ]}
              >
                {members.developers.map((founder, index) => (
                  <MemberCard key={index} data={founder} />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid
                gap={4}
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)'
                ]}
              >
                {members.marketers.map((founder, index) => (
                  <MemberCard key={index} data={founder} />
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SectionContainer>
    </div>
  );
};
export default About;
