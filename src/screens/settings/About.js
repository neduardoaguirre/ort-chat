import { useNavigation } from '@react-navigation/native';
import { Box, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import { Header } from '../../layout/Header';

export const About = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Box flex="1">
      <Header title="Acerca de nosotros"></Header>
      <ScrollView>
        <VStack marginBottom={2}>
          <View pl={5} pt={2}>
            <Text>
              Ort-chat es una aplicacion de chat para alumnos del instituto ORT.
            </Text>
            <Text>
              Posee salas con las distintas materias para que los alumnos puedan
              hacer consultas en las mismas.
            </Text>
          </View>
        </VStack>
      </ScrollView>
    </Box>
  );
};
