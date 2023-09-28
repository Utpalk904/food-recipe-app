import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = (props) => {
  return (
    <View>
      <ActivityIndicator {...props} />
    </View>
  )
}

export default Loading;