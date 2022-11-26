import { Box, VStack, Heading, Flex, Text, Divider } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'native-base';
import { appVersion } from '../providers/version';

const goTo = (path) => {
  console.log(path);
  /**
   * @TODO
   * Implementar un switch para si es perfil ir a perfil, si es nosotros ir a about, si es salir ejecutar el salir
   */
};

export const ConfigComponent = () => {
  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Opciones
          </Heading>
          <Divider />
          <Flex direction="column" padding={5}>
            <Button marginBottom={2} onPress={() => goTo('profile')}>
              Perfil
            </Button>
            <Button marginBottom={2} onPress={() => goTo('exit')}>
              Nosotros
            </Button>
            <Button marginBottom={2} onPress={() => goTo('exit')}>
              Salir
            </Button>
          </Flex>
          <Divider />
          <Text marginTop={2} fontSize="sm" alignSelf={'center'}>
            Version {appVersion}
          </Text>
        </VStack>
      </ScrollView>
    </Box>
  );
};
