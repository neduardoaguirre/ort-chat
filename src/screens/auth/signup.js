import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../config/firebase';
import { User } from '../../models/User';
import { updateUser } from '../../context/userContext';
import backImage from '../../assets/backImage.jpg'
import { Pressable, Icon, Image, View, Text, StatusBar, Input, VStack, Box, Button, Stack } from 'native-base';

export const SignupComponent = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ show, setShow ] = useState(false)

  const onHandleSignup = async () => {
    if (name !== '' && email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await createUserProfile(userCredential);
        })
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  const createUserProfile = async (userCredential) => {
    const user = new User(
      email,
      undefined,
      name,
      userCredential.user.uid,
      undefined
    );

    await updateUser(user);
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
          placeholder="Nombre"
          autoCapitalize="words"
          textContentType="text"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="correo@correo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Contraseña"
          autoCapitalize="none"
          autoCorrect={false}
          type={show ? 'text' : "password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<Ionicons name={show ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
        />
        <VStack>
          <Button bgColor={'blue.700'} onPress={onHandleSignup}>
            Registrarse
          </Button>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          >
            <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
              ¿Ya tenes cuenta?
            </Text>
            <Pressable pl={2} onPress={() => navigation.navigate('Login')}>
              <Text
                color='blue.700'
                fontWeight={'extrabold'}
                fontSize={13}
                textAlign='center'
              >
                Iniciar Sesión
              </Text>
            </Pressable>
          </View>

        </VStack>
      </VStack>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

