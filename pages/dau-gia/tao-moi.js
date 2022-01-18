import {
  Box,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VisuallyHidden
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Flatpickr from 'react-flatpickr';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import Loading from 'src/components/common/Spinner/Loading';
import AuctionForm from 'src/components/core/Form/AuctionForm';
import { color } from 'src/constants/color';
import withAuth from 'src/HOCs/withAuth';
import { storage } from 'src/libs/firebase';
import { AuctionService } from 'src/services/auction';
import { CampaignService } from 'src/services/campaign';
import { ModalActions } from 'src/store/modal/action';
import { DateUtils } from 'src/utils/date';
import { toVND } from 'src/utils/number';

function Create() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(state => state.auth.currentUser);
  const { data, isLoading, error } = useQuery('own campaigns', () =>
    CampaignService.getByAuthor(user?.id)
  );
  const { campaigns } = data || [];
  const activeCampaigns = campaigns?.filter(cam => cam.status === 'active');
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auctionPayload, setPayloadAuction] = useState({
    title: '',
    description: '',
    startPrice: 0,
    images: [],
    campaign: '',
    finishedAt: null
  });
  const { title, description, startPrice, images, finishedAt } = auctionPayload;
  console.log('jdjasdijasdfjoiasdjio', auctionPayload);

  useEffect(() => {
    if (imageFiles.length > 0) {
      handleUpload();
    }
  }, [imageFiles]);

  const onChange = e => {
    setPayloadAuction({
      ...auctionPayload,
      [e.target.id]: e.target.value
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setImageFiles(acceptedFiles);
    }
  }, []);

  const handleUpload = () => {
    const promises = [];
    setLoading(true);
    imageFiles.map(image => {
      const uploadTask = storage.ref(`auctions/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error);
        },
        async () => {
          await storage
            .ref('auctions')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setLoading(false);
              setPayloadAuction({
                ...auctionPayload,
                images: [...images, url]
              });
            });
        }
      );
    });

    Promise.all(promises)
      .then(values => {
        console.log('All uploaded images was done');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onRemove = item => {
    setPayloadAuction({
      ...auctionPayload,
      images: images.filter(img => img !== item)
    });
  };

  const onCreate = async e => {
    e.preventDefault();
    dispatch(ModalActions.setModalOn());
    try {
      await AuctionService.createAuction(auctionPayload);
      setPayloadAuction({
        title: '',
        description: '',
        startPrice: 0,
        images: [],
        campaign: '',
        finishedAt: null
      });
      toast({
        title: 'Tạo đấu giá thành công',
        description: 'Yêu cầu tạo đấu giá đã được gửi đi thành công',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Yêu cầu tạo thất bại',
        description: e.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      dispatch(ModalActions.setModalOff());
    }
  };

  return (
    <SectionContainer>
      <Head>
        <title>Tạo mới đấu giá</title>
        <link rel='icon' href='/images/thumbnail.png' />
      </Head>
      <AuctionForm />
    </SectionContainer>
  );
}

export default withAuth(Create);
