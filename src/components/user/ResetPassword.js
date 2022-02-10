import { Box, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from 'src/components/common/Button';
import { color } from 'src/constants/color';
import { UserService } from 'src/services/user';

export default function RsPassword(props) {
  const { user } = props;
  const toast = useToast();
  const [passwordPayload, setPasswordPayload] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { currentPassword, newPassword, confirmPassword } = passwordPayload;
  const onChange = (key, value) => {
    setPasswordPayload({
      ...passwordPayload,
      [key]: value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: 'Mật khẩu mới không khớp',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
      setLoading(false);
      return;
    }
    try {
      const payload = {
        currentPassword,
        newPassword
      };
      await UserService.resetPassword(user.id, payload);
      toast({
        position: 'top-right',
        title: 'Thành công',
        description: 'Cập nhật mật khẩu thành công',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Lỗi',
        description: e.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    // reset password form
    <form onSubmit={onSubmit} className='w-full'>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Mật khẩu cũ
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={currentPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('currentPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Mật khẩu mới
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={newPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('newPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <FormControl
        className='flex flex-col md:flex-row md:items-center md:justify-between'
        isRequired
      >
        <FormLabel className='w-1/2 px-4 text-right text-sm'>
          Nhập lại mật khẩu mới
        </FormLabel>
        <Input
          className='max-w-xl'
          disabled={loading}
          value={confirmPassword}
          focusBorderColor={color.PRIMARY}
          type='password'
          onChange={e => onChange('confirmPassword', e.target.value)}
        />
      </FormControl>
      <div className='my-8'></div>
      <Box textAlign='right'>
        <Button colorScheme={'purple'} type='submit' isLoading={loading}>
          Đổi mật khẩu
        </Button>
      </Box>
    </form>
  );
}
