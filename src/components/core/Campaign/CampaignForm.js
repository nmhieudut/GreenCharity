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
  Select,
  Text,
  Textarea,
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
import { PlaceService } from 'src/services/place';
import * as Yup from 'yup';
import Loading from '../../common/Spinner/Loading';
// YUP
const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng điền tên hoạt động'),
  images: Yup.array().required('Bạn nên thêm hình minh họa vào đây'),
  content: Yup.string().required('Vui lòng nhập nội dung'),
  finishedAt: Yup.date().required('Thêm ngày kết thúc vào nữa'),
  goal: Yup.number()
    .required('Nhập số tiền mong muốn')
    .min(10000000, 'Số tiền không được dưới 10.000.000 VND'),
  province: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  district: Yup.string().required('Vui lòng chọn quận/huyện'),
  ward: Yup.string().required('Vui lòng chọn xã/phủ')
});

export function CampaignForm({ isEdited, initialValues, returnUrl }) {
  const toast = useToast();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [imgUrls, setImgUrls] = useState(isEdited ? initialValues.images : []);
  const [imgLoading, setImgLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [address, setAddress] = useState({
    province: '',
    district: '',
    ward: ''
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const formikRef = useRef();

  function resetWard() {
    setWards([]);
  }

  function resetDistrict() {
    setDistricts([]);
    resetWard();
  }

  async function fetchProvince() {
    const data = await PlaceService.fetchProvinces();
    setProvinces(data.results);
  }
  async function fetchDistrict(provinceId) {
    if (provinceId) {
      const data = await PlaceService.fetchDistricts(provinceId);
      return setDistricts(data.results);
    }
    resetDistrict();
  }
  async function fetchWard(districtId) {
    if (districtId) {
      const data = await PlaceService.fetchWards(districtId);
      return setWards(data.results);
    }
    resetWard();
  }

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    fetchProvince();
    if (initialValues) {
      fetchDistrict(initialValues.province);
      fetchWard(initialValues.district);
    }
  }, []);

  useEffect(() => {
    formikRef.current.setFieldValue(
      'address',
      address.province + ', ' + address.district + ', ' + address.ward
    );
  }, [address]);

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
    if (imgUrls) formikRef.current.setFieldValue('images', imgUrls);
  }, [imgUrls]);

  const handleSubmit = async values => {
    // return console.log('=++++++', values);
    setSubmitting(true);
    try {
      if (!isEdited) {
        await CampaignService.create(values);
        toast({
          title: 'Yêu cầu tạo thành công',
          description: 'Yêu cầu vận động đã được gửi đi thành công',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
        returnUrl && router.push(returnUrl);
        return;
      }
      await CampaignService.update(initialValues._id, values);
      toast({
        title: 'Cập nhật thành công',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      returnUrl && router.push(returnUrl);
      return;
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
        goal: isEdited ? initialValues.goal : 10000000,
        province: isEdited ? initialValues.province : '',
        district: isEdited ? initialValues.district : '',
        ward: isEdited ? initialValues.ward : '',
        address: isEdited ? initialValues.address : '',
        moreInfo: isEdited ? initialValues.moreInfo : ''
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

                {imgUrls.length > 0 && (
                  <>
                    <div className='my-4' />
                    <Text>Xem trước hình ảnh</Text>
                  </>
                )}
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
                <FormLabel>Nội dung câu chuyện</FormLabel>
                <InputGroup focusBorderColor={color.PRIMARY}>
                  <Editor
                    name='5'
                    value={values.content}
                    onChange={data => setFieldValue('content', data)}
                    editorLoaded={editorLoaded}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.content}</FormErrorMessage>
              </FormControl>
              <Button my={4} colorScheme='purple' onClick={onOpen}>
                Xem trước bài đăng
              </Button>
              <div className='my-4' />
              <Grid
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)'
                ]}
                gap={2}
              >
                <FormControl isInvalid={errors.province} isRequired>
                  <FormLabel>Tỉnh / Thành phố</FormLabel>
                  <Select
                    placeholder='Chọn tỉnh / thành phố'
                    value={values.province}
                    onChange={e => {
                      setFieldValue('province', e.target.value);
                      fetchDistrict(e.target.value);
                      setAddress({
                        ...address,
                        province:
                          e.target[e.target.selectedIndex].getAttribute('name')
                      });
                    }}
                  >
                    {provinces?.map(province => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                        name={province.province_name}
                      >
                        {province.province_name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.province}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.district} isRequired>
                  <FormLabel>Quận / huyện</FormLabel>
                  <Select
                    placeholder='Chọn quận / huyện'
                    value={values.district}
                    onChange={e => {
                      setFieldValue('district', e.target.value);
                      fetchWard(e.target.value);
                      setAddress({
                        ...address,
                        district:
                          e.target[e.target.selectedIndex].getAttribute('name')
                      });
                    }}
                  >
                    {districts?.map(district => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                        name={district.district_name}
                      >
                        {district.district_name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.district}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.ward} isRequired>
                  <FormLabel>Xã</FormLabel>
                  <Select
                    placeholder='Chọn xã'
                    value={values.ward}
                    onChange={e => {
                      setFieldValue('ward', e.target.value);
                      setAddress({
                        ...address,
                        ward: e.target[e.target.selectedIndex].getAttribute(
                          'name'
                        )
                      });
                    }}
                  >
                    {wards?.map(ward => (
                      <option
                        key={ward.ward_id}
                        value={ward.ward_id}
                        name={ward.ward_name}
                      >
                        {ward.ward_name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.ward}</FormErrorMessage>
                </FormControl>
              </Grid>

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
                <FormLabel>
                  Thông tin thêm (tài khoản ngân hàng riêng chủ hộ, lưu ý nếu
                  đến tận nơi trao quà, v.v.. Nếu không có thì có thể để trống):
                </FormLabel>
                <Textarea
                  value={values.moreInfo}
                  onChange={handleChange('moreInfo')}
                />
              </FormControl>
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
