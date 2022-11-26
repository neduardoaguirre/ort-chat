import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, NativeBaseProvider } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { TabBarComponent } from './screens/tab-bar';
import { auth } from './config/firebase';
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
  loadUser
} from './providers/user.provider';
/*

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Chat}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);

        await loadUser(authenticatedUser);

        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user authenticated go to Chat screen otherwise go to Auth page
  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
*/
const AppComponent = () => {
  return (
    <NativeBaseProvider>
      <TabBarComponent></TabBarComponent>
    </NativeBaseProvider>
  );
};

export default registerRootComponent(AppComponent);
