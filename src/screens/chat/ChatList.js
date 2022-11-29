import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack
} from 'native-base';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AuthenticatedUserContext } from '../../context/userContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from '../../config/firebase';

const mockChats = [
  {
    room: {
      id: 'xxx',
      name: 'Anime'
    },
    chat: {
      id: 'xxx',
      lastMessage: new Date()
    }
  },
  {
    room: {
      id: 'xxx',
      name: 'Economia'
    },
    chat: {
      id: 'xxx',
      lastMessage: new Date()
    }
  },
  {
    room: {
      id: 'xxx',
      name: 'Tecnologia'
    },
    chat: {
      id: 'xxx',
      lastMessage: new Date()
    }
  }
];

export const ChatListComponent = ({ navigation }) => {
  const [ chats, setChats ] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);

  const chatBelongs = useMemo(
    () => chats.filter((chat) => chat.users.includes(user.email)),
    [ chats ]
  );

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'rooms');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(
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

  const goTo = (chat) => {
    navigation.push('ChatDetail', chat.id);
  };

  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Chats
          </Heading>
          <Divider />
          {React.Children.toArray(
            chatBelongs.map((chat, i) => {
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
                      {chat.name}
                    </Badge>
                    <Spacer></Spacer>
                    {/* <Flex marginTop={3}>
                      <Text
                        fontSize={10}
                        color="coolGray.800"
                        fontWeight="bold"
                      >
                        Ultima actvidad
                      </Text>
                      <Text fontSize={10} color="coolGray.800">
                        {/* {chat.chat.lastMessage.toDateString()} */}
                    {/* </Text> */}
                    {/* </Flex> */}
                  </HStack>
                  <Text
                    color="coolGray.800"
                    mt="3"
                    fontWeight="medium"
                    fontSize="xl"
                  >
                    {chat.info}
                  </Text>
                  <Flex direction="row" marginTop={3} alignItems="flex-end">
                    <Button width="20" fontSize={12} onPress={() => goTo(chat)}>
                      Chatear
                    </Button>
                    <Spacer></Spacer>
                    <Text color="coolGray.800" fontWeight="bold">
                      <Ionicons name="people-outline" size={24} color="black" />{' '}
                      {chat.users.length}
                    </Text>
                  </Flex>
                </Box>
              );
            })
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
