import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';

const backImage = require('../assets/backImage.jpg');

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>ORT Chat</Text>
        <TextInput
          style={styles.input}
          placeholder='correo@correo.com'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Registrarse</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>¿Ya tenes cuenta?</Text>
          <TouchableOpacity>
            <Text style={{ marginLeft: 10, color: 'blue', fontWeight: '600', fontSize: 14 }}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle='light-content' />
    </View>
  );
}

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
    padding: 24
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
