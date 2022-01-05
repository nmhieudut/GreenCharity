import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
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
    setLoading(true);
    await onClose();
    handleOk();
    setLoading(false);
  };

  return (
    <>
      <Button colorScheme='red' size='xs' onClick={onOpen}>
        {showModalButtonText}
      </Button>
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
