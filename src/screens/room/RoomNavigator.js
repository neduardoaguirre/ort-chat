import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RoomListComponent } from './RoomList';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const RoomStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoomList" component={RoomListComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
