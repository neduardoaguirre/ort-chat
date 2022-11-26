import { Ionicons } from '@expo/vector-icons';
import { Box, Center, useColorModeValue } from 'native-base';
import React from 'react';
import { Animated, Dimensions, Pressable, StatusBar } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { ConfigComponent } from './config';

const FirstRoute = () => (
  <Center flex={1} my="4">
    This is Tab 1
  </Center>
);

const SecondRoute = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
);

const ThirdRoute = () => <ConfigComponent></ConfigComponent>;

const initialLayout = {
  width: Dimensions.get('window').width
};
const renderScene = SceneMap({
  room: FirstRoute,
  chat: SecondRoute,
  setting: ThirdRoute
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
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            )
          });
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
      style={{
        marginTop: StatusBar.currentHeight
      }}
    />
  );
};
