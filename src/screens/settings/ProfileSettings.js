import { Box, VStack, Heading, Flex, Text, Divider } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'native-base';
import { appVersion } from '../../utils/version';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

export const ConfigComponent = ({ navigation }) => {
  const goTo = (path) => {
    if (path === 'Exit') {
      onSignOut();
      return;
    } else {
      navigation.push(path);
    }
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Ajustes
          </Heading>
          <Divider />
          <Flex direction="column" padding={5}>
            <Button marginBottom={2} onPress={() => goTo('UserInfo')}>
              Perfil
            </Button>
            <Button marginBottom={2} onPress={() => goTo('About')}>
              Nosotros
            </Button>
            <Button marginBottom={2} onPress={() => goTo('Exit')}>
              Cerrar Sesión
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
