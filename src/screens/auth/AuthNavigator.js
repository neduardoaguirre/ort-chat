import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Signup" component={SignupComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
