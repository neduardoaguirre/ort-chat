import { HStack, Modal, Text } from 'native-base';
import React from 'react';

export const RoomDetailModal = ({ selectedRoom, isOpen, onClose }) => {
  return (
    selectedRoom && (
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <Modal.Content maxH={212}>
          <Modal.CloseButton />
          <Modal.Header textAlign={'justify'}>
            <HStack space={1}>
              <Text>Sala:</Text>
              <Text fontWeight={'bold'}>{selectedRoom.name}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>
            <Text>{selectedRoom?.info}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    )
  );
};
