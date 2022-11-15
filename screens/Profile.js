import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
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
import { askForPermission, pickImage, uploadImage } from '../utils';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const [permissionStatus, setPermissionStatus] = useState(null);
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(selectedImage, `images/${user.uid}`, 'profilePicture');
      photoURL = url;
      console.log('🚀 ~ file: Profile.js ~ line 39 ~ photoURL', photoURL);
    }
    const userData = {
      displayName,
      email: user.email
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(database, 'users', user.uid), { ...userData, uid: user.uid })
    ]);
    navigation.navigate('Chat');
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(decodeURI(result.uri));
    }
  }

  useEffect(() => {
    const user = auth.currentUser;
    setSelectedImage(user.photoURL);
    setDisplayName(user.displayName);
  }, []);

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== 'granted') {
    return <Text>You need to allow this permission</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <TouchableOpacity
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}
          onPress={handleProfilePicture}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons name='camera-plus' color={'#717171'} size={100} />
          ) : (
            <Image source={{ uri: selectedImage }} style={{ width: '50%', height: '50%', borderRadius: 15 }} />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          autoCapitalize='words'
          textContentType='text'
          autoFocus={true}
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={!displayName}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Guardar</Text>
        </TouchableOpacity>
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
  input: {
    backgroundColor: '#F6F7FB',
    height: 48,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
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
    marginHorizontal: 30
  },
  button: {
    backgroundColor: 'blue',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
