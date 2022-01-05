import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import Button from './Button';

export default function CustomDrawer({
  showModalButtonText,
  drawerHeader,
  drawerBody,
  handleOk,
  ...rest
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOk = async () => {
    setLoading(true);
    await onClose();
    handleOk();
    setLoading(false);
  };

  return (
    <>
      <Box onClick={onOpen}>{showModalButtonText}</Box>
      <Drawer {...rest} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{drawerHeader}</DrawerHeader>
          <DrawerBody>{drawerBody}</DrawerBody>
          <DrawerFooter>
            <Button noLinear variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {handleOk && (
              <Button colorScheme='purple' onClick={onOk}>
                Chấp nhận
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
