import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Final({ navigation, route }) {
  const { finalOne } = route.params


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Final.tsx</Text>
      <Text>{finalOne}</Text>
    </View>
  )
}