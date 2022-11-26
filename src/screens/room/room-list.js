import { Ionicons } from '@expo/vector-icons';
import { database } from '../../config/firebase';
import { collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack
} from 'native-base';
import { AuthenticatedUserContext } from '../../providers/user.provider';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';

// const mockRooms = [
//   {
//     room: {
//       id: 'xxx',
//      rname: 'Anime',
//       members: 459
//     }
//   },
//   {
//     room: {
//       id: 'xxx',
//       name: 'Economia',
//       members: 15
//     }
//   },
//   {
//     room: {
//       id: 'xxx',
//       name: 'Tecnologia',
//       members: 50
//     }
//   }
// ];

export const RoomListComponent = ({ navigation }) => {


  const [ rooms, setRooms ] = useState([])
  const { user } = useContext(AuthenticatedUserContext)

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'rooms');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRooms(querySnapshot.docs.map(d => (
        {
          id: d.id,
          name: d.data().name,
          info: d.data().info,
          users: d.data().users
        }
      )))
    });
    return unsubscribe;
  }, []);

  const handlePress = async (room) => {
    let { users } = rooms.find(r => r.id === room.id)
    if (room.users.includes(user.email)) {
      try {
        users = users.filter(us => us !== user.email)
        await updateDoc(doc(database, "rooms", room.id), {
          users
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        users.push(user.email)
        await updateDoc(doc(database, "rooms", room.id), { users: users })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const goTo = (room) => {
    console.log('goTo Room: ', room);
    navigation.push('RoomDetail');
  };


  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Salas
          </Heading>
          <Divider />
          {rooms.map((r, i) => {
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
                  <Flex marginTop={3}>
                    <Text fontSize={10} color="coolGray.800" fontWeight="bold">
                      Miembros
                    </Text>
                    <Text fontSize={10} color="coolGray.800">
                      {r.users.length}
                    </Text>
                  </Flex>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                >
                  {r.name}
                </Text>
                <Flex direction="row" marginTop={3} alignItems="flex-end">
                  <Button width="20" fontSize={12} onPress={() => goTo(r)}>
                    Info
                  </Button>
                  <Spacer></Spacer>
                  <Button
                    onPress={() => handlePress(r)}
                  >
                    {r.users.includes(user.email) ? 'Dar de baja' : 'Subscribirse'}
                  </Button>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};
