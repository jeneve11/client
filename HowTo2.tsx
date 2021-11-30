import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


export default function HowTo2({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={[styles.header, {flexDirection: 'row'}]}>
        <Text style={styles.font}>해시태그검색</Text>
        <Text style={[styles.font, {color: '#898C8E'}]}>사용 방법</Text>
      </View>

      <View style={[styles.body, {alignItems: 'center'}]}>

        <View style={{flex: 1}}>
          <View style={{flex: 0.2, flexDirection: 'row'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>1.</Text>
            </View>
            <View style={{justifyContent: 'center', paddingHorizontal: 60}}>
              <Text style={{fontFamily: 'MaruBuri-Regular'}}>음식 카테고리 선택하기</Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
            <View style={{flex: 1}}>
              <Image style={[styles.image]} source={require('./assets/howto/hashtag_1.jpg')}/>
            </View>
            <View style={{flex: 1}}>
              <Image style={[styles.image]} source={require('./assets/howto/hashtag_2.jpg')}/>
            </View>
          </View>
        </View>
        
        <View style={{flex: 0.1}}></View>
        
        <View style={{flex: 1}}>
          <View style={{flex: 0.2, flexDirection: 'row'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>2.</Text>
            </View>
            <View style={{justifyContent: 'center', paddingHorizontal: 60}}>
              <Text style={{fontFamily: 'MaruBuri-Regular'}}>오늘의 가게를 확인하기</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Image style={[styles.image, {flex: 5}]} source={require('./assets/howto/hashtag_3.jpg')}/>
          </View>
        </View>

      </View>
      <View style={styles.tail}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/icon/home.png')} style={[styles.imagetail, {width: 40, height: 40}]}/>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 40,
    color: '#0E4A84',
    letterSpacing: -5,
  },
  body: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tail: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imagetail: {
    width: 30,
    height: 30,
  },
  imageCategory: {
    width: 150,
    height: 105,
    justifyContent: 'center',
    marginBottom: 10,    
  },
  textOnPicture: {
    fontFamily: 'MaruBuri-Regular',
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
  item: {
    padding: 20,
    marginHorizontal: 16,
    justifyContent: 'space-between'
  },
});