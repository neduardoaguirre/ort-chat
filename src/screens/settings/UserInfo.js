import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Heading } from 'native-base';
import { pickImage } from '../../utils/imagePicker';
import { getUser, updateUser } from '../../context/userContext';
import { cloudinaryUpload } from '../../utils/cloudinary';

export const UserInfo = () => {
  const navigation = useNavigation();

  const user = getUser();

  const [ image, setImage ] = useState(user?.cloudinary?.url ?? null);
  const [ userName, setUserName ] = useState(user.userName ?? null);

  async function handleProfilePicture() {
    const imagePickedBase64 = await pickImage();

    if (imagePickedBase64) {
      setImage(imagePickedBase64);
    }
  }

  async function handleSave() {
    if (image) {
      const cloudinary = await cloudinaryUpload(image, user.uid, false);

      if (cloudinary) {
        user.cloudinary = {
          url: cloudinary.url,
          assetId: cloudinary.asset_id
        };
      }
    }

    if (userName) {
      user.userName = userName;
    }

    await updateUser(user);
    navigation.goBack();
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Heading size="md" margin={5} >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="blue"
          />
        </TouchableOpacity>
      </Heading>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>

        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}
          onPress={handleProfilePicture}
        >
          {!image ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={'#717171'}
              size={100}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: '50%', height: '50%', borderRadius: 15 }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000000',
            fontSize: 18,
            marginBottom: 20
          }}
        >
          {user.name}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          autoCapitalize="words"
          textContentType="text"
          autoFocus={true}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={!userName || !image}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
            Guardar
          </Text>
        </TouchableOpacity>
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
