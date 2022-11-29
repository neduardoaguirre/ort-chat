import { signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Image, View, Text, StatusBar, Icon, Input, VStack, Button } from 'native-base';
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import backImage from '../../assets/backImage.jpg'

export const LoginComponent = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ show, setShow ] = useState(false)

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <View flex={1}>
      <Image source={backImage} alt='bgImage' h={'50%'} />
      <VStack
        space={2}
        p={2}
        px={5}
        bgColor={'#fff'}
        height={'100%'}
        justifyContent={'flex-start'}
      >
        <Text
          bgColor={'white'}
          alignSelf='center'
          fontWeight={'bold'}
          fontSize={'3xl'}
          color='blue.700'
        >
          ORT Chat
        </Text>
        <Input
          placeholder="correo@correo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          size={'lg'}
          bgColor='#F6F7FB'
          fontSize={'lg'}
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Contraseña"
          autoCapitalize="none"
          size={'lg'}
          bgColor='#F6F7FB'
          fontSize={'lg'}
          autoCorrect={false}
          textContentType="password"
          value={password}
          type={show ? 'text' : "password"}
          onChangeText={(text) => setPassword(text)}
          InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<Ionicons name={show ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
        />
        <Button
          onPress={onHandleLogin}
          width='full'
          bgColor={'blue.700'}
        >
          Iniciar Sesion
        </Button>
        <VStack space={2} >
          <Text color='gray' fontWeight='600' fontSize={14} textAlign='center'>
            ¿No tenes cuenta?
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text
              color={'blue.700'}
              fontWeight={'extrabold'}
              fontSize={13}
              textAlign='center'
            >
              Registrarse
            </Text>
          </Pressable>
        </VStack>
      </VStack >

      <StatusBar barStyle="light-content" />
    </View >
  );
};
