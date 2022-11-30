import { Ionicons } from '@expo/vector-icons';
import { Box, Pressable, Text } from 'native-base';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { ChatStack } from '../screens/chat/ChatNavigator';
import { RoomStack } from '../screens/room/RoomNavigator';
import { ConfigStack } from '../screens/settings/SettingsNavigator';

const RoomRoute = () => <RoomStack></RoomStack>;

const ChatRoute = () => <ChatStack></ChatStack>;

const SettingRoute = () => <ConfigStack></ConfigStack>;

const initialLayout = {
  width: Dimensions.get('window').width
};

const renderScene = SceneMap({
  room: RoomRoute,
  chat: ChatRoute,
  setting: SettingRoute
});

export const TabBarComponent = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'room',
      name: 'Salas',
      icon: (color, active) => {
        return (
          <Ionicons
            name="albums-outline"
            size={active ? 25 : 20}
            color={color}
          />
        );
      }
    },
    {
      key: 'chat',
      name: 'Mis Chats',
      icon: (color, active) => {
        return (
          <Ionicons
            name="chatbubbles-outline"
            size={active ? 25 : 20}
            color={color}
          />
        );
      }
    },
    {
      key: 'setting',
      name: 'Ajustes',
      icon: (color, active) => {
        return (
          <Ionicons
            name="settings-outline"
            size={active ? 25 : 20}
            color={color}
          />
        );
      }
    }
  ]);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row" height="70px" maxHeight="70px">
        {props.navigationState.routes.map((route, i) => {
          const active = index === i;
          const color = active ? '#053df5' : '#3261fa';
          const borderColor = active ? '#3261fa' : 'blue.200';
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={route.key}
              bgColor="blue.400"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
                alignItems="center"
              >
                {route.icon(color, active)}
                <Text color={color} fontWeight={active ? 'bold' : 'normal'}>
                  {route.name}
                </Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      tabBarPosition="bottom"
    />
  );
};
