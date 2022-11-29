import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AboutComponent } from './About';
import { ConfigComponent } from './ProfileSettings';
import { UserInfo } from './UserInfo';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const ConfigStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Config" component={ConfigComponent} />
        <Stack.Screen name="About" component={AboutComponent} options={{ title: 'Nosotros' }}
        />
        <Stack.Screen name="UserInfo" component={UserInfo} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
