import { Box, Heading, VStack } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';

export const AboutComponent = () => {
  return (
    <Box flex="1" safeAreaTop>
      <ScrollView>
        <VStack marginBottom={2}>
          <Heading size="md" margin={5}>
            Acerca de nosotros
          </Heading>
        </VStack>
      </ScrollView>
    </Box>
  )
};
