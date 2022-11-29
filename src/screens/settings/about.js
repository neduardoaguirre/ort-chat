import { useNavigation } from '@react-navigation/native';
import { Box, Heading, VStack, Divider } from 'native-base';
import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export const AboutComponent = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <Box flex="1" safeAreaTop>
      <ScrollView style={styles.container}>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5} style={{ textAlign: 'center' }}>
            Acerca de nosotros
          </Heading>
          <Divider />
          <View>
            <Text style={styles.text}>
              Ort-chat es una aplicacion de chat para alumnos del instituto ORT.
            </Text>
            <Text style={styles.text}>
              Posee salas con las distintas materias para que los alumnos puedan hacer consultas en las mismas.
            </Text>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.goBack} >
                Volver a los ajustes
              </Text>
            </TouchableOpacity>
          </View>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20
  },
  goBack: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    color: 'blue',
  }

});

