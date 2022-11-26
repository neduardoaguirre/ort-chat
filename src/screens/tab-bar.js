import { Ionicons } from '@expo/vector-icons';
import { Box, useColorModeValue } from 'native-base';
import React from 'react';
import { Animated, Dimensions, Pressable } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { ChatStack } from './chat/chat.stack';
import { ConfigComponent } from './config';
import { RoomStack } from './room/room.stack';

const RoomRoute = () => <RoomStack></RoomStack>;

const ChatRoute = () => <ChatStack></ChatStack>;

const SettingRoute = () => <ConfigComponent></ConfigComponent>;

const initialLayout = {
  width: Dimensions.get('window').width
};

const renderScene = SceneMap({
  room: RoomRoute,
  chat: ChatRoute,
  setting: SettingRoute
});

export const TabBarComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'room',
      icon: <Ionicons name="albums-outline" size={24} color="black" />
    },
    {
      key: 'chat',
      icon: <Ionicons name="chatbubbles-outline" size={24} color="black" />
    },
    {
      key: 'setting',
      icon: <Ionicons name="settings-outline" size={24} color="black" />
    }
  ]);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color =
            index === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? 'cyan.500'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={route.key}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color
                  }}
                >
                  {route.icon}
                </Animated.Text>
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
