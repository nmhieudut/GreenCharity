import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
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
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import add from 'date-fns/add';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Flatpickr from 'react-flatpickr';
import { BsFillImageFill } from 'react-icons/bs';
import { CgRemove } from 'react-icons/cg';
import Button from 'src/components/common/Button';
import SectionContainer from 'src/components/common/SectionContainer';
import ImgLoading from 'src/components/common/Spinner/ImgLoading';
import Editor from 'src/components/uncommon/Editor';
import { color } from 'src/constants/color';
import { storage } from 'src/libs/firebase';
import { CampaignService } from 'src/services/campaign';
import * as Yup from 'yup';
import Checkmark from '../Checkmark';
// YUP
const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng điền tên hoạt động'),
  images: Yup.array().required('Bạn nên thêm hình minh họa vào đây'),
  content: Yup.string().required('Vui lòng nhập nội dung'),
  finishedAt: Yup.date().required('Thêm ngày kết thúc vào nữa'),
  bank_account_number: Yup.string(),
  goal: Yup.number()
    .required('Nhập số tiền mong muốn')
    .min(100000, 'Số tiền không được dưới 100.000 VND')
});

export function CampaignForm({ isEdited, initialValues }) {
  const [images, setImages] = useState([]);
  const [imgUrls, setImgUrls] = useState(isEdited ? initialValues.images : []);
  const [imgLoading, setImgLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [event, setEvent] = useState('');
  const [status, setStatus] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

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

  //TODO: fix handle set fields

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
    if (!isEdited) {
      return CampaignService.create(values)
        .then(res => {
          console.log('res', res);
          setStatus('success');
        })
        .catch(err => {
          console.log(err);
          setStatus('error');
        })
        .finally(() => {
          setEvent('create');
          setIsOpenModal(true);
        });
    }
    return CampaignService.update(initialValues._id, values)
      .then(res => {
        setStatus('success');
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
      })
      .finally(() => {
        setEvent('update');
        setIsOpenModal(true);
      });
  };
  return (
    <SectionContainer>
      <Heading
        textAlign='center'
        fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
        lineHeight={'110%'}
        color={color.PRIMARY}
      >
        {isEdited ? 'Chỉnh sửa hoạt động' : 'Tạo hoạt động từ thiện mới'}
      </Heading>
      <Text my={8} textAlign={'center'} fontSize={'lg'} color={'gray.500'}>
        Điền vào form dưới để tạo 1 hoạt động mới
      </Text>
      <Formik
        innerRef={formikRef}
        initialValues={{
          name: isEdited ? initialValues.name : '',
          images: isEdited ? initialValues.images : [],
          content: isEdited ? initialValues.content : '',
          finishedAt: isEdited
            ? format(new Date(initialValues.finishedAt), 'yyyy/MM/dd')
            : add(new Date(), { days: 1 }),
          bank_account_number: isEdited
            ? initialValues.bank_account_number
            : '',
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
              console.log('isValid', isValid, errors, values);
              handleSubmit(e);
            }}
          >
            <Stack spacing={6} direction={['column', 'row']}>
              <Box w={['100%', '50%']}>
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
                    Số tiền muốn quyên góp (ít nhất là 100.000 VND)
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
                <FormControl isValid={errors.image} isRequired>
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
                      <ImgLoading color={color.PRIMARY} />
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
                  <Grid
                    templateColumns={[
                      'repeat(1, 1fr)',
                      'repeat(2, 1fr)',
                      'repeat(3, 1fr)'
                    ]}
                    gap={4}
                    p={4}
                  >
                    {imgUrls?.map((img, idx) => (
                      <Flex key={idx} justifyContent='center' pos='relative'>
                        <Image
                          src={img}
                          alt=''
                          className='h-32 object-cover object-center transition duration-300 px-2 cursor-pointer'
                        />
                        <button
                          className='absolute top-0 right-0'
                          onClick={() => onRemove(img)}
                        >
                          <CgRemove />
                        </button>
                      </Flex>
                    ))}
                  </Grid>
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box w={['100%', '50%']}>
                <FormControl
                  isInvalid={errors.content}
                  isRequired
                  className='w-full mb-12'
                >
                  <FormLabel>Nội dung câu chuyện</FormLabel>
                  <InputGroup
                    className='pb-4 h-auto w-full'
                    focusBorderColor={color.PRIMARY}
                  >
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
                <Button colorScheme='purple' onClick={onOpen}>
                  Xem trước bài đăng
                </Button>
              </Box>
            </Stack>
            <Divider my={4} />
            <Button colorScheme='purple' type='submit'>
              {isEdited ? 'Cập nhật hoạt động' : 'Vận động'}
            </Button>
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

      <ResultModal
        event={event}
        status={status}
        openModal={isOpenModal}
        onPrimaryClick={() => {
          router.push(`/me/my-campaigns`);
        }}
        onSecondaryClick={() => {
          router.push('/');
          setIsOpenModal(false);
        }}
      />
    </SectionContainer>
  );
}

function ResultModal({
  event,
  status,
  openModal,
  onPrimaryClick,
  onSecondaryClick
}) {
  const action = event === 'create' ? 'Yêu cầu tạo' : 'Cập nhật';
  const statusMess = status === 'success' ? 'thành công' : 'thất bại';
  return (
    <Modal blockScrollOnMount={true} isOpen={openModal} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box textAlign='center' py={10} px={6}>
            <Checkmark status={status === 'success' ? 'success' : 'error'} />
            <Heading as='h2' size='xl' mt={6} mb={2}>
              {action} hoạt động {statusMess}
            </Heading>
            {status === 'success' &&
              (event === 'create' ? (
                <Text color={'gray.500'}>
                  Hoạt động của bạn đã được gửi tới đội ngũ quản lí xem xét và
                  sẽ xét duyệt trong vòng trễ nhất 24h tới. Xin chân thành cảm
                  ơn.
                </Text>
              ) : (
                <Text color={'gray.500'}>
                  Hoạt động này đã được cập nhật thành công
                </Text>
              ))}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='purple' mr={3} onClick={onPrimaryClick}>
            Kiểm tra hoạt động này
          </Button>
          <Button colorScheme='gray' nolinear onClick={onSecondaryClick}>
            Về trang chính
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
