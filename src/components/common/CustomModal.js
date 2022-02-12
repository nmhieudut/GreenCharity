import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import Button from './Button';

const CustomModal = ({
  showModalButtonText,
  modalHeader,
  modalBody,
  handleOk
}) => {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button
              noLinear
              isDisabled={loading}
              isLoading={loading}
              variant='ghost'
              mr={3}
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
              >
                Chấp nhận
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
