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
import React, { useState } from 'react';
import Button from './Button';

export default function CustomDrawer({
  showModalButtonText,
  drawerHeader,
  drawerBody,
  handleOk,
  ...rest
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const onOk = async () => {
    try {
      setLoading(true);
      await handleOk();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onClose();
    }
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
              <Button colorScheme='purple' onClick={onOk} isLoading={loading}>
                Chấp nhận
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
