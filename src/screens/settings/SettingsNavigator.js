import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { About } from './about';
import { ConfigComponent } from './ProfileSettings';
import { UserInfo } from './UserInfo';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const ConfigStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Config" component={ConfigComponent} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
