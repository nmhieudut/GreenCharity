import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  useDisclosure
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import Button from './Button';

export default function CustomAlertModal({
  modalHeader,
  modalBody,
  handleOk,
  children,
  ...rest
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const cancelRef = React.useRef();
  const onOk = async () => {
    setLoading(true);
    await handleOk();
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        {...rest}
        scrollBehavior='inside'
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{modalHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{modalBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              noLinear
              colorScheme='blue'
              isDisabled={loading}
              isLoading={loading}
              ref={cancelRef}
              onClick={onClose}
            >
              Hủy
            </Button>
            {handleOk && (
              <Button
                isDisabled={loading}
                isLoading={loading}
                colorScheme='purple'
                onClick={onOk}
                ml={3}
              >
                Chấp nhận
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
