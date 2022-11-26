import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ChatDetailComponent } from './chat-detail';
import { ChatListComponent } from './chat-list';

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
