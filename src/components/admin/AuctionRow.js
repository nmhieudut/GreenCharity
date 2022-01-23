import { EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Td,
  Text,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import { Form } from 'formik';
import useCountdown from 'src/hooks/useCountdown';
import { toVND } from 'src/utils/number';
import { fromResultToString, fromStatusToString } from 'src/utils/status';
import CustomAlertModal from '../common/Alert';
import Button from '../common/Button';
import { GrFormView } from 'react-icons/gr';

export default function AuctionRow({ auction }) {
  const {
    images,
    author,
    bids,
    campaign,
    createdAt,
    startPrice,
    currentBid,
    finishedAt,
    result,
    status,
    title
  } = auction;
  const { days, hours, minutes, seconds } = useCountdown(finishedAt);
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Tr>
      <Td>
        <Flex align='center'>
          <Avatar name={title} size='sm' src={images[0]} />
          <Text ml={3} fontWeight='bold'>
            {title}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex align='center'>
          <Avatar name={author.name} size='sm' src={author.picture} />
          <Text ml={3} fontWeight='bold'>
            {author.name}
          </Text>
        </Flex>
      </Td>
      <Td>
        {days > 0 && days + ' ngày '}
        {hours > 0 && hours + ' giờ '}
        {minutes > 0 && minutes + ' phút '}
        {seconds} giây
      </Td>
      <Td>{toVND(startPrice)}</Td>
      <Td>
        {currentBid ? (
          <CustomAlertModal
            modalHeader={`Hiện tại`}
            modalBody={`Giá hiện tại là ${toVND(currentBid.amount)}`}
          >
            <Flex align='center'>
              {toVND(currentBid.amount)}
              <IconButton icon={GrFormView} />
            </Flex>
          </CustomAlertModal>
        ) : (
          'Chưa có'
        )}
      </Td>
      <Td>
        <Badge
          colorScheme={
            status === 'pending'
              ? 'purple'
              : status === 'active'
              ? 'green'
              : 'red'
          }
        >
          {fromStatusToString(status)}
        </Badge>
      </Td>
      <Td>
        <Badge
          colorScheme={
            result === 'success'
              ? 'green'
              : result === 'failed'
              ? 'red'
              : 'blue'
          }
        >
          {fromResultToString(result)}
        </Badge>
      </Td>
    </Tr>
  );
}
