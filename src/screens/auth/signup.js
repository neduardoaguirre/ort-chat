import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth } from '../../config/firebase';
import { User } from '../../models/User';
import { updateUser } from '../../context/userContext';

const backImage = require('../../assets/backImage.jpg');

export const SignupComponent = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onHandleSignup = async () => {
    if (name !== '' && email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log('Signup success');

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
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>ORT Chat</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          autoCapitalize="words"
          textContentType="text"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="correo@correo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          // autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
            Registrarse
          </Text>
        </TouchableOpacity>
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                marginLeft: 10,
                color: 'blue',
                fontWeight: '600',
                fontSize: 14
              }}
            >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    alignSelf: 'center',
    padding: 24,
    marginTop: 50
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 48,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover'
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 100
  },
  button: {
    backgroundColor: 'blue',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
