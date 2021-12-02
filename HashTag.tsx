import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContainer } from '@react-navigation/native';


export default function HashTag({ navigation }) {
  const [hashData, setHashData] = useState('?');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 40, paddingRight: 20}]}>메뉴가</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 40, paddingRight: 15}]}>생각나지 않을 때</Text>
        <Text style={[styles.font, {fontSize: 45, paddingRight: 20}]}>해시태그로</Text>
        <Text style={[styles.font, {fontSize: 45, paddingRight: 15}]}>검색하기</Text>
      </View>
      <View style={{flex: 2, flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center'}}>
        <RNPickerSelect
          placeholder= {{
            label: '키워드를 입력하세요.',
          }}
          onValueChange={(value) => setHashData(value)}
          fixAndroidTouchableBug={true}
          useNativeAndroidPickerStyle={false}
          items={[
            { label: '혼밥', value: 'solo', key: 'solo'},
            { label: '숙취', value: 'hangover', key: 'hangover'},
            { label: '면', value: 'noodle', key: 'noodle'},
            { label: '간단하게', value: 'simple', key: 'simple'},
          ]}
          style={styles}
        />
        <TouchableOpacity onPress={() => navigation.navigate('HashTagFinal', {hashData: hashData})}>
          <Image source={require('./assets/icon/magnifying_glass.png')} style={[styles.image, {backgroundColor: 'white'}]}/>
        </TouchableOpacity>
      </View>

      <View style={{flex: 8}}></View>
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
    width: 30,
    height: 30,
  },
  inputAndroid: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 16,
    height: 50, 
    width: 330, 
    color: '#0E4A84',
    borderColor: 'black', 
    textAlign: 'center',
    borderWidth: 1, 
    borderRadius: 12,
    padding: 10,
  }
})