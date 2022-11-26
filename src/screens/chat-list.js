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
import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

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

const goTo = (chat) => {
  console.log(chat);
  /**
   * @TODO
   * Implementar para ingresar al chat especifico
   */
};

export const ChatListComponent = () => {
  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Chats
          </Heading>
          <Divider />
          {mockChats.map((chat, i) => {
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
                    {chat.room.name}
                  </Badge>
                  <Spacer></Spacer>
                  <Flex marginTop={3}>
                    <Text fontSize={10} color="coolGray.800" fontWeight="bold">
                      Ultima actvidad
                    </Text>
                    <Text fontSize={10} color="coolGray.800">
                      {chat.chat.lastMessage.toDateString()}
                    </Text>
                  </Flex>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                >
                  Chat - {i + 1}
                </Text>
                <Flex direction="row" marginTop={3} alignItems="flex-end">
                  <Button width="20" fontSize={12} onPress={() => goTo(chat)}>
                    Ir
                  </Button>
                  <Spacer></Spacer>
                  <Ionicons name="people-outline" size={24} color="black" />
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};
