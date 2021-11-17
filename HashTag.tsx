import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HashTag({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 40, paddingRight: 15}]}>메뉴가</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 40, paddingRight: 10}]}>생각나지 않을 때</Text>
        <Text style={[styles.font, {fontSize: 45, paddingRight: 15}]}>해시태그로</Text>
        <Text style={[styles.font, {fontSize: 45, paddingRight: 10}]}>검색하기</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {tag: "혼밥"})}>
          <Text>혼밥</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 6,
    backgroundColor: 'grey'
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 25,
    color: '#0E4A84',
    letterSpacing: -5,
    textAlign: 'right',
  },
  body: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  textBox: {
    flex: 1,
    width: '83%',
    height: 140,
    backgroundColor: 'white',
    //borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  tail: {
    flex: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#f5f5f5',
  },
})