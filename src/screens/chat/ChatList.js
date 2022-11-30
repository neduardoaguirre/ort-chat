import { Ionicons } from '@expo/vector-icons';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
  VStack
} from 'native-base';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { database } from '../../config/firebase';
import { AuthenticatedUserContext } from '../../context/userContext';
import { wait } from '../../utils/Helper';

export const ChatListComponent = ({ navigation }) => {
  const [ refreshing, setRefreshing ] = useState(false);
  const [ chats, setChats ] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);

  const chatBelongs = useMemo(
    () => chats.filter((chat) => chat.users.includes(user.email)),
    [ chats ]
  );

  const onRefresh = useCallback(async () => {
    setChats([]);

    setRefreshing(true);

    await wait(2000); // Add fake timeout

    const collectionRef = collection(database, 'rooms');
    const q = query(collectionRef, orderBy('name', 'desc'));
    const r = await getDocs(q);

    setChats(
      r.docs.map((d) => ({
        id: d.id,
        name: d.data().name,
        info: d.data().info,
        users: d.data().users
      }))
    );

    setRefreshing(false);
  }, []);

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
    navigation.push('ChatDetail', chat);
  };

  return (
    <Box flex="1" safeAreaTop>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          ) : refreshing ? (
            <HStack
              margin={5}
              space={2}
              justifyContent="center"
              alignItems="center"
            >
              <Spinner
                display={refreshing ? 'none' : 'flex'}
                color="coolGray.800"
                size="lg"
              />
              <Heading color="coolGray.800" fontSize="md">
                Cargando Chats...
              </Heading>
            </HStack>
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
