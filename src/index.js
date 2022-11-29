import { registerRootComponent } from 'expo';
import { onAuthStateChanged } from 'firebase/auth';
import { NativeBaseProvider } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from './config/firebase';
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
  loadUser
} from './context/userContext';
import { AuthNavigator } from './screens/auth/AuthNavigator';
import { TabBarComponent } from './layout/TabBar';
import theme from './theme/theme';

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [ isLoading, setIsLoading ] = useState(true);

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

    return unsubscribeAuth;
  }, [ user ]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user authenticated go to Chat screen otherwise go to Auth page
  return (
    <NativeBaseProvider theme={theme}>
      {user ? <TabBarComponent /> : <AuthNavigator />}
    </NativeBaseProvider>
  );
};

const AppComponent = () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};

export default registerRootComponent(AppComponent);
