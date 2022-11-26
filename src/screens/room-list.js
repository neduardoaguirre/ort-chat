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

const mockRooms = [
  {
    room: {
      id: 'xxx',
      name: 'Anime',
      members: 459
    }
  },
  {
    room: {
      id: 'xxx',
      name: 'Economia',
      members: 15
    }
  },
  {
    room: {
      id: 'xxx',
      name: 'Tecnologia',
      members: 50
    }
  }
];

const goTo = (room) => {
  console.log(room);
  /**
   * @TODO
   * Implementar para ingresar a la sala especifica
   */
};

export const RoomListComponent = () => {
  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Salas
          </Heading>
          <Divider />
          {mockRooms.map((room, i) => {
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
                      {room.room.members}
                    </Text>
                  </Flex>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                >
                  {room.room.name}
                </Text>
                <Flex direction="row" marginTop={3} alignItems="flex-end">
                  <Button width="20" fontSize={12} onPress={() => goTo(room)}>
                    Info
                  </Button>
                  <Spacer></Spacer>
                  <Ionicons name="book-outline" size={24} color="black" />
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};
