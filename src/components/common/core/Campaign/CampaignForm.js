import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import add from 'date-fns/add';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Flatpickr from 'react-flatpickr';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import Button from 'src/components/common/Button';
import Editor from 'src/components/uncommon/Editor';
import { color } from 'src/constants/color';
import { storage } from 'src/libs/firebase';
import { CampaignService } from 'src/services/campaign';
import * as Yup from 'yup';
import Loading from '../../Spinner/Loading';
// YUP
const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng điền tên hoạt động'),
  images: Yup.array().required('Bạn nên thêm hình minh họa vào đây'),
  content: Yup.string().required('Vui lòng nhập nội dung'),
  finishedAt: Yup.date().required('Thêm ngày kết thúc vào nữa'),
  bank_account_number: Yup.string(),
  goal: Yup.number()
    .required('Nhập số tiền mong muốn')
    .min(10000000, 'Số tiền không được dưới 10.000.000 VND')
});

export function CampaignForm({ isEdited, initialValues }) {
  const toast = useToast();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [imgUrls, setImgUrls] = useState(isEdited ? initialValues.images : []);
  const [imgLoading, setImgLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formikRef = useRef();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setImages(acceptedFiles);
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      handleUpload();
    }
  }, [images]);

  const handleUpload = () => {
    setImgLoading(true);
    const promises = [];
    images.map(image => {
      const uploadTask = storage.ref(`campaigns/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error);
        },
        async () => {
          await storage
            .ref('campaigns')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setImgUrls(prevState => [...prevState, url]);
              setImgLoading(false);
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
    setImgUrls(prevState => prevState.filter(url => url !== item));
  };

  useEffect(() => {
    formikRef.current.setFieldValue('images', imgUrls);
  }, [imgUrls]);

  const handleSubmit = async values => {
    setSubmitting(true);
    try {
      if (!isEdited) {
        await CampaignService.create(values);
        return toast({
          title: 'Yêu cầu tạo thành công',
          description: 'Yêu cầu vận động đã được gửi đi thành công',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      }
      await CampaignService.update(initialValues._id, values);
      toast({
        title: 'Cập nhật thành công',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      return router.replace(router.asPath);
    } catch (e) {
      return toast({
        title: 'Thất bại',
        description: e.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        name: isEdited ? initialValues.name : '',
        images: isEdited ? initialValues.images : [],
        content: isEdited ? initialValues.content : '',
        finishedAt: isEdited
          ? format(new Date(initialValues.finishedAt), 'yyyy/MM/dd')
          : add(new Date(), { days: 1 }),
        bank_account_number: isEdited ? initialValues.bank_account_number : '',
        goal: isEdited ? initialValues.goal : 100000
      }}
      validationSchema={schema}
      onSubmit={values => handleSubmit(values)}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        isValid
      }) => (
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Flex justify='center'>
            <Box maxW='3xl'>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel>Tên hoạt động</FormLabel>
                <Input
                  name='1'
                  onChange={handleChange('name')}
                  value={values.name}
                  className='my-2'
                  focusBorderColor={color.PRIMARY}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <div className='my-4' />
              <FormControl isInvalid={errors.goal} isRequired>
                <FormLabel>
                  Số tiền muốn quyên góp (ít nhất là 10.000.000 VND)
                </FormLabel>
                <InputGroup>
                  <Input
                    name='2'
                    onChange={handleChange('goal')}
                    value={values.goal}
                    focusBorderColor={color.PRIMARY}
                    type='number'
                  />
                  <InputRightAddon>VND</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.goal}</FormErrorMessage>
              </FormControl>
              <div className='my-4' />
              <FormControl isInvalid={errors.finishedAt} isRequired>
                <FormLabel>Ngày hết hạn</FormLabel>
                <InputGroup>
                  <Flatpickr
                    options={{ minDate: new Date(), dateFormat: 'Y/m/d' }}
                    value={values.finishedAt}
                    onChange={([date]) => {
                      setFieldValue('finishedAt', format(date, 'yyyy/MM/dd'));
                    }}
                    render={({ value, ...props }, ref) => {
                      return (
                        <Input
                          name='3'
                          value={value}
                          ref={ref}
                          focusBorderColor={color.PRIMARY}
                        />
                      );
                    }}
                  />
                  <FormErrorMessage>{errors.finishedAt}</FormErrorMessage>
                </InputGroup>
              </FormControl>
              <div className='my-4' />
              <FormControl>
                <FormLabel>Hình ảnh</FormLabel>
                <Flex
                  {...getRootProps()}
                  className='border-2 cursor-pointer border-dashed'
                  w={'200'}
                  h={'auto'}
                  direction='column'
                  align='center'
                  justify='center'
                >
                  <Input {...getInputProps()} name='4' />
                  {imgLoading ? (
                    <Box p={12}>
                      <Loading />
                    </Box>
                  ) : (
                    <Flex
                      direction='column'
                      justify='center'
                      align='center'
                      w={'50%'}
                      py={12}
                    >
                      <BsFillImageFill
                        size='2rem'
                        className='mb-4'
                        color={color.PRIMARY}
                      />
                      {isDragActive ? (
                        <p>Thả file vào đây ...</p>
                      ) : (
                        <p>Thả file hoặc click để chọn file</p>
                      )}
                    </Flex>
                  )}
                </Flex>
                <div className='my-4' />
                <Text>Xem trước hình ảnh</Text>
                <Grid
                  templateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(4, 1fr)'
                  ]}
                  gap={2}
                  py={4}
                >
                  {imgUrls?.map((img, idx) => (
                    <Flex
                      key={idx}
                      justifyContent='center'
                      pos='relative'
                      border='1px dashed black'
                    >
                      <Image
                        src={img}
                        alt=''
                        className='h-24 object-cover object-center transition duration-300 px-2'
                      />
                      <IconButton
                        position='absolute'
                        cursor='pointer'
                        colorScheme='purple'
                        size='xs'
                        top={0}
                        right={0}
                        onClick={() => onRemove(img)}
                        rounded='none'
                        icon={<AiOutlineMinus className='text-white' />}
                      />
                    </Flex>
                  ))}
                </Grid>
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
              <div className='my-4' />
              <FormControl
                isInvalid={errors.content}
                isRequired
                className='w-full'
              >
                <FormLabel>Nội dung câu chuyện </FormLabel>
                <InputGroup focusBorderColor={color.PRIMARY}>
                  <Editor
                    name='5'
                    value={values.content}
                    onChange={data => {
                      setFieldValue('content', data);
                    }}
                    editorLoaded={editorLoaded}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.content}</FormErrorMessage>
              </FormControl>
              <Button my={4} colorScheme='purple' onClick={onOpen}>
                Xem trước bài đăng
              </Button>
              <Alert status='info'>
                <AlertIcon />
                Khi gửi yêu cầu này, bạn đã đồng ý với điều khoản sử dụng của
                GreenCharity. Yêu cầu của bạn sẽ được duyệt trong vòng 24 tiếng.
                Các yêu cầu điền đúng đầy đủ thông tin sẽ được duyệt nhanh hơn.
              </Alert>

              <Divider my={4} />
              <Button colorScheme='purple' type='submit' isLoading={submitting}>
                {isEdited ? 'Cập nhật hoạt động' : 'Yêu cầu vận động'}
              </Button>
            </Box>
          </Flex>

          {/* Preview modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{values.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div dangerouslySetInnerHTML={{ __html: values.content }} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='purple' onClick={onClose}>
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
