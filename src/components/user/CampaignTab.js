import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { MdCalendarViewMonth } from 'react-icons/md';
import { useQuery } from 'react-query';
import Button from 'src/components/common/Button';
import Loading from 'src/components/common/Spinner/Loading';
import { color } from 'src/constants/color';
import { CampaignService } from 'src/services/campaign';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';
import { fromStatusToString } from 'src/utils/status';
import CustomDrawer from '../common/CustomDrawer';
import CustomModal from '../common/CustomModal';

export default function CampaignTab(props) {
  const { user } = props;
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery(['campaigns'], () =>
    CampaignService.getByAuthor(user.id)
  );
  const { campaigns } = data || [];

  return (
    <>
      <Head>
        <title>Hoạt động của tôi</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <Box py={4} w='full'>
        {isLoading && <Loading />}
        {data && (
          <Table colorScheme='purple' size='sm'>
            <Thead>
              <Tr>
                <Th>Tên hoạt động</Th>
                <Th>Mục tiêu</Th>
                <Th>Đạt được</Th>
                <Th>Ngày kết thúc</Th>
                <Th>Còn lại</Th>
                <Th>Trạng thái</Th>
                <Th>Chi tiết</Th>
              </Tr>
            </Thead>
            <Tbody fontSize='sm'>
              {campaigns?.map(campaign => (
                <Tr key={campaign._id}>
                  <Td>{campaign.name}</Td>
                  <Td isNumeric>{toVND(campaign.goal)}</Td>
                  <Td isNumeric>{toVND(campaign.donated_amount)}</Td>
                  <Td>{DateUtils.toDate(campaign.finishedAt)}</Td>
                  <Td>
                    {campaign.status === 'active'
                      ? DateUtils.calculateDaysFromNow(campaign.finishedAt)
                      : 0}{' '}
                    ngày
                  </Td>
                  <Td>
                    <Tag
                      colorScheme={
                        campaign.status === 'pending'
                          ? 'purple'
                          : campaign.status === 'active'
                          ? 'green'
                          : 'red'
                      }
                    >
                      {fromStatusToString(campaign.status)}
                    </Tag>
                  </Td>
                  <Td>
                    <Stack direction='row' spacing={2}>
                      <Button
                        leftIcon={<AiOutlineEye />}
                        colorScheme='blue'
                        variant='solid'
                        onClick={() =>
                          window.open(`/hoat-dong/${campaign.slug}`, '_blank')
                        }
                      >
                        Xem
                      </Button>
                      <ERDrawer campaignId={campaign._id} />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        )}
      </Box>
    </>
  );
}

function ERDrawer({ campaignId }) {
  const { data, isLoading } = useQuery(['disbursements'], () =>
    CampaignService.fetchRE(campaignId)
  );
  const { disbursements } = data || [];

  return (
    <>
      <CustomDrawer
        size='xl'
        showModalButtonText={
          <Button leftIcon={<MdCalendarViewMonth />} colorScheme='pink'>
            Thu chi
          </Button>
        }
        drawerHeader={'Thu chi hoạt động'}
        drawerBody={
          <Box>
            <ERModal campaignId={campaignId} />
            <ERTable disbursements={disbursements} />
          </Box>
        }
      />
    </>
  );
}

const ERTable = ({ disbursements }) => {
  return (
    <Table variant='simple' size='small'>
      <TableCaption>Quỹ tiền tài trợ</TableCaption>
      <Thead>
        <Tr>
          <Th>Ngày</Th>
          <Th>Diễn giải</Th>
          <Th isNumeric>Thu</Th>
          <Th isNumeric>Chi</Th>
          <Th isNumeric>Tồn</Th>
        </Tr>
      </Thead>
      <Tbody>
        {disbursements?.map(
          ({ createdAt, message, amount, action, lastBalance, _id }) => (
            <Tr key={_id} bg={action === 'chi' && 'lightgray'}>
              <Td>{DateUtils.toDate(createdAt)}</Td>
              <Td>{message}</Td>
              <Td isNumeric>{action === 'thu' && toVND(amount)}</Td>
              <Td isNumeric>{action === 'chi' && toVND(amount)}</Td>
              <Td isNumeric>{toVND(lastBalance)}</Td>
            </Tr>
          )
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Tổng</Th>
          <Th></Th>
          <Th isNumeric>
            {toVND(
              disbursements
                ?.filter(({ action }) => action === 'thu')
                .reduce((sum, item) => sum + parseInt(item.amount), 0)
            )}
          </Th>
          <Th isNumeric>
            {toVND(
              disbursements
                ?.filter(({ action }) => action === 'chi')
                .reduce((sum, item) => sum + parseInt(item.amount), 0)
            )}
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const ERModal = ({ campaignId }) => {
  const toast = useToast();
  const [payload, setPayload] = useState({
    message: '',
    amount: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value
    });
  };

  const onAddRE = async () => {
    try {
      setLoading(true);
      await CampaignService.addRE(campaignId, payload);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Đã thêm khoản chi',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <CustomModal
        showModalButtonText={
          <Button my={4} leftIcon={<AddIcon />} colorScheme='pink'>
            Thêm khoản chi
          </Button>
        }
        modalHeader={'Thêm khoản chi'}
        modalBody={
          <>
            <FormControl my={2} id='amount' isRequired>
              <InputGroup>
                <Input
                  onChange={handleChange}
                  type='number'
                  placeholder='Nhập số tiền đã chi tiêu tại đây'
                  focusBorderColor={color.PRIMARY}
                />
                <InputRightAddon>VND</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl my={2} id='message' isRequired>
              <Input
                onChange={handleChange}
                type='text'
                placeholder='Mô tả'
                focusBorderColor={color.PRIMARY}
              />
            </FormControl>
          </>
        }
        handleOk={onAddRE}
      />
    </Box>
  );
};
