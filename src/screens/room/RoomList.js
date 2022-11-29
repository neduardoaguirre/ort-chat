import { Ionicons } from '@expo/vector-icons';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  Spacer,
  Spinner,
  Text,
  VStack
} from 'native-base';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { database } from '../../config/firebase';
import { AuthenticatedUserContext } from '../../context/userContext';
import { useDisclosure } from '../../hooks/useDisclosure';

export const RoomListComponent = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedRoom, setSelectedRoom] = useState();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'rooms');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRooms(
        querySnapshot.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          info: d.data().info,
          users: d.data().users
        }))
      );
    });
    return unsubscribe;
  }, []);

  const handlePress = async (room) => {
    let { users } = rooms.find((r) => r.id === room.id);
    if (room.users.includes(user.email)) {
      try {
        users = users.filter((us) => us !== user.email);
        await updateDoc(doc(database, 'rooms', room.id), {
          users
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        users.push(user.email);
        await updateDoc(doc(database, 'rooms', room.id), { users: users });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpen = (room) => {
    setSelectedRoom(room);
    onOpen();
  };

  return (
    <>
      <Box flex="1" safeAreaTop>
        <ScrollView>
          <VStack marginBottom={2}>
            <Heading size="md" margin={5}>
              Salas
            </Heading>
            <Divider />
            {rooms?.length ? (
              React.Children.toArray(
                rooms.map((r, i) => {
                  return (
                    <Box
                      alignSelf="center"
                      rounded="8"
                      overflow="hidden"
                      borderWidth="1"
                      borderColor="coolGray.300"
                      width="90%"
                      shadow="3"
                      bg="coolGray.100"
                      p="5"
                      marginTop={3}
                    >
                      <HStack alignItems="center">
                        <Badge
                          colorScheme="darkBlue"
                          _text={{
                            color: 'white'
                          }}
                          variant="solid"
                          rounded="4"
                        >
                          {'Sala ' + (i + 1)}
                        </Badge>
                        <Spacer></Spacer>
                        <Flex>
                          <Text color="coolGray.800" fontWeight="bold">
                            <Ionicons
                              name="people-outline"
                              size={25}
                              color="black"
                            />{' '}
                            {r.users.length}
                          </Text>
                        </Flex>
                      </HStack>
                      <HStack alignItems={'center'}>
                        <Text
                          color="coolGray.800"
                          mt="3"
                          fontWeight="medium"
                          fontSize="xl"
                        >
                          {r.name}
                        </Text>
                      </HStack>

                      <Flex direction="row" marginTop={3} alignItems="flex-end">
                        <Button fontSize={8} onPress={() => handleOpen(r)}>
                          Info
                        </Button>
                        <Spacer />
                        <Button onPress={() => handlePress(r)}>
                          {r.users.includes(user.email)
                            ? 'Salir'
                            : 'Suscribirse'}
                        </Button>
                      </Flex>
                    </Box>
                  );
                })
              )
            ) : (
              <HStack
                margin={5}
                space={2}
                justifyContent="center"
                alignItems="center"
              >
                <Spinner color="coolGray.800" size="lg" />
                <Heading color="coolGray.800" fontSize="md">
                  Cargando Salas...
                </Heading>
              </HStack>
            )}
          </VStack>
        </ScrollView>
      </Box>

      {selectedRoom && (
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
      )}
    </>
  );
};
