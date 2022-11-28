import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AboutComponent } from './about';
import { ConfigComponent } from './config';
import { ProfileComponent } from './profile';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const ConfigStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Config" component={ConfigComponent} />
        <Stack.Screen name="About" component={AboutComponent} />
        <Stack.Screen name="Profile" component={ProfileComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
