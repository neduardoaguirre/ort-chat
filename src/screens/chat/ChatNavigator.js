import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ChatDetailComponent } from './ChatDetail';
import { ChatListComponent } from './ChatList';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChatList" component={ChatListComponent} />
        <Stack.Screen name="ChatDetail" component={ChatDetailComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
