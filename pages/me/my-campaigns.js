import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import CampaignItem from 'src/components/common/Campaign/CampaignItem';
import CampaignItemSkeleton from 'src/components/common/Campaign/CampaignItemSkeleton';
import withAuth from 'src/HOCs/withAuth';
import MeLayout from 'src/layout/MeLayout';
import { CampaignService } from 'src/services/campaign';

function MyCampaigns(props) {
  const { user } = props;
  const { data, isLoading, isError, error } = useQuery(['campaigns'], () =>
    CampaignService.getByAuthor(user.id)
  );
  const { campaigns } = data || [];
  console.log('data', data);
  return (
    <MeLayout>
      <Flex flexDir='column' w='full' pl={8} h='full' align='center'>
        {isError && <div>Có gì đó không ổn, thử lại sau</div>}
        {isLoading &&
          Array.from({ length: 3 }, (_, i) => <CampaignItemSkeleton />)}
        {campaigns && (
          <Box>
            <Text as={'h6'}>Hiển thị {campaigns.length} kết quả</Text>
            <Box py={6}>
              {campaigns.map(campaign => (
                <CampaignItem key={campaign._id} data={campaign} />
              ))}
            </Box>
          </Box>
        )}
        {campaigns?.length === 0 && (
          <Flex justify='center' align='center'>
            Không có hoạt động tương ứng
          </Flex>
        )}
      </Flex>
    </MeLayout>
  );
}

export default withAuth(MyCampaigns);
