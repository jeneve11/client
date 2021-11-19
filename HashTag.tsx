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
      <View style={{flex: 3}}>

      </View>

      <View style={[styles.body, {alignItems: 'flex-end', justifyContent: 'flex-start', paddingRight: 15}]}>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {tag: '혼밥'})}>
            <Box tagName={'혼밥'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {tag: '숙취'})}>
            <Box tagName={'숙취'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {tag: '면'})}>
            <Box tagName={'면'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {tag: '간단'})}>
            <Box tagName={'간단'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

function Box( {tagName}: any ) {
  // let BoxStyle = categoryName.length === 5 ? styles.textBox5 : styles.textBox;
  return (
    <View style={styles.textBox}>
      <Text style ={{fontFamily: 'MaruBuri-Regular', letterSpacing: -1, fontSize: 17}}>{`#${tagName}`}</Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 6,
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 25,
    color: '#0E4A84',
    letterSpacing: -5,
    textAlign: 'right',
  },
  body: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  textBox: {
    height: 35,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    marginLeft: 13,
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