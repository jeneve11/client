import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


// Welcome page
export default function PickCategory() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={styles.font}>메뉴월드컵   </Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 55}]}>오늘은 안 땡겨! </Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.font, {fontSize: 48}]}>카테고리 담기</Text>
      </View>
      <View style={{flex: 14}}>
        <Text>C</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 7,
    alignItems: 'flex-end',
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 45,
    color: '#0E4A84',
    letterSpacing: -5,
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tail: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 90,
    color: '#0E4A84',
    letterSpacing: -10,
  },
})