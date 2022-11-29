import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, ScrollView, VStack, Pressable, Heading, Divider, View, HStack } from 'native-base';


export const About = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <Box flex="1" safeAreaTop>
      <ScrollView >
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}  >
            <HStack alignItems={'center'} justifyContent='center' space={2} >
              <Pressable onPress={handleBack}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  color="blue"
                />
              </Pressable>
              <Text textAlign={'center'} fontSize={'lg'} fontWeight='bold'>
                Acerca de nosotros
              </Text>
            </HStack>
          </Heading>
          <Divider />
          <View pl={5} pt={2}>
            <Text>
              Ort-chat es una aplicacion de chat para alumnos del instituto ORT.
            </Text>
            <Text>
              Posee salas con las distintas materias para que los alumnos puedan hacer consultas en las mismas.
            </Text>
          </View>
        </VStack>
      </ScrollView >
    </Box>
  );
};