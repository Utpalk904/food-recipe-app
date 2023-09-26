import { View, Text, StatusBar } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View className='flex-1 justify-center items-center' >
      <Text className='text-4xl'>HomeScreen</Text>
      <StatusBar
        hidden={false}
        barStyle="light-content"
        // translucent={true}
        animated={true}
      />
    </View>
  )
}

export default HomeScreen;