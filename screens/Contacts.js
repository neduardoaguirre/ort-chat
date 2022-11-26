import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { auth, database } from '../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getUser } from '../providers/user.provider';
import { useNavigation } from '@react-navigation/native';

export default function Contacts() {
  const user = getUser();
  const navigation = useNavigation();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // const collectionRef = collection(database, 'users');
    const q = query(collection(database, 'users'), where('uid', '!=', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allUsers = querySnapshot.docs.map((doc) => doc.data());
      setUsers(allUsers);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Chats', { name: item.name, uid: item.uid })}>
              <View style={styles.card}>
                <Image style={styles.userImageST} source={{ uri: item.cloudinary.url }} />
                <View style={styles.textArea}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900'
    // fontFamily: 'Verdana'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20
  },
  email: {
    paddingTop: 5
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
});
