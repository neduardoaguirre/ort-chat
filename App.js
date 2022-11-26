import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './config/firebase';
import { AntDesign } from '@expo/vector-icons';
import { AuthenticatedUserContext, AuthenticatedUserProvider, getUser, loadUser } from './providers/user.provider';
import Chat from './screens/Chat';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Contacts from './screens/Contacts';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title='Go to Settings' onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

function ChatStack() {
  const user = getUser();
  return (
    <Stack.Navigator defaultScreenOptions={Contacts}>
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Contacts' component={Contacts} />
      <Stack.Screen
        name='Chats'
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitleVisible: false
        })}
      >
        {(props) => <ChatScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
    // <Tab.Navigator
    //   defaultScreenOptions={Home}
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       if (route.name === 'Home') {
    //         return <AntDesign name='user' size={24} />;
    //       } else if (route.name === 'Profile') {
    //         return <AntDesign name='user' size={24} />;
    //       }
    //     },
    //     tabBarInactiveTintColor: 'gray',
    //     tabBarActiveTintColor: 'tomato'
    //   })}
    // >
    //   <Tab.Screen name='Home' component={HomeScreen} />
    //   <Tab.Screen name='Chat' component={Chat} />
    //   <Tab.Screen name='Profile' component={Profile} />
    //   <Tab.Screen name='Contacts' component={Contacts} />
    // </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);

      await loadUser(authenticatedUser);

      setIsLoading(false);
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // If user authenticated go to Chat screen otherwise go to Auth page
  return <NavigationContainer>{user ? <ChatStack /> : <AuthStack />}</NavigationContainer>;
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
