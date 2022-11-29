import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
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
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { database } from '../../config/firebase';
import { AuthenticatedUserContext } from '../../context/userContext';

export const ChatListComponent = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);

  const chatBelongs = useMemo(
    () => chats.filter((chat) => chat.users.includes(user.email)),
    [chats]
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
    console.log('goTo Chat: ', chat);
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
          {chatBelongs?.length ? (
            React.Children.toArray(
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
                      <Button
                        width="20"
                        fontSize={12}
                        onPress={() => goTo(chat)}
                      >
                        Chatear
                      </Button>
                      <Spacer></Spacer>
                      <Text color="coolGray.800" fontWeight="bold">
                        <Ionicons
                          name="people-outline"
                          size={24}
                          color="black"
                        />{' '}
                        {chat.users.length}
                      </Text>
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
              <Text color="coolGray.800" fontSize="md">
                Aun no te has subscrito a ninguna Sala, subscribete para
                comenzar a chatear!
              </Text>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
