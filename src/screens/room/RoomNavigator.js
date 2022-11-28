import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RoomDetailComponent } from './RoomDetail';
import { RoomListComponent } from './RoomList';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const RoomStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoomList" component={RoomListComponent} />
        <Stack.Screen name="RoomDetail" component={RoomDetailComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
