import { Ionicons } from '@expo/vector-icons';
import { Box, Divider, HStack, StatusBar, Text } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ title }) => {
  const navigation = useNavigation();
  const bgColor = '#f2f2f2';
  const color = '#000000';

  return (
    <>
      <StatusBar bg={bgColor} barStyle="light-content" />
      <Box safeAreaTop bg={bgColor} />
      <HStack
        bg={bgColor}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center" width="20px">
          <Ionicons
            style={{ display: navigation.canGoBack() ? 'flex' : 'none' }}
            name="arrow-back"
            size={25}
            color="blue"
            onPress={() => navigation.goBack()}
          />
        </HStack>
        <HStack alignItems="center">
          <Text color={color} fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack alignItems="center" width="20px"></HStack>
      </HStack>
      <Divider></Divider>
    </>
  );
};
