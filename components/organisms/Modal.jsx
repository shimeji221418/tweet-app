import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import PrimaryButton from "../atoms/button/PrimaryButton";

const DetailModal = (props) => {
  const { isOpen, onClose, handleDelete } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>本当に削除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalBody>削除すると元に戻すことができません。</ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClose} color="cyan">
            Close
          </PrimaryButton>
          <PrimaryButton onClick={handleDelete} color="red">
            Delete
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
