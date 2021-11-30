import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


export default function HowTo({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={[styles.header, {flexDirection: 'row'}]}>
        <Text style={styles.font}>메뉴월드컵</Text>
        <Text style={[styles.font, {color: '#898C8E'}]}>사용 방법</Text>
      </View>

      <View style={[styles.body, {alignItems: 'flex-end'}]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>1.</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'MaruBuri-Regular'}}>음식 카테고리 선택하기</Text>
              </View>
              <Image style={[styles.image, {flex: 5}]} source={require('./assets/howto/worldcup_1.jpg')}/>
            </View>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>2.</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'MaruBuri-Regular'}}>16강부터 차례대로 '땡기지 않는 음식'을 선택하기</Text>
              </View>
              <Image style={[styles.image, {flex: 5}]} source={require('./assets/howto/worldcup_2.jpg')}/>
            </View>
          </View>
        </View>
        <View style={{flex: 0.1}}></View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>3.</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'MaruBuri-Regular'}}>월드컵 결과를 확인하기</Text>
              </View>
              <Image style={[styles.image, {flex: 5}]} source={require('./assets/howto/worldcup_3.jpg')}/>
            </View>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
          < View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text style={[styles.font, {fontSize: 25, letterSpacing: 0}]}>4.</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'MaruBuri-Regular'}}>'그렇다면 오늘 어디가지?'를 클릭하여 오늘의 가게를 확인하기</Text>
              </View>
              <Image style={[styles.image, {flex: 5}]} source={require('./assets/howto/worldcup_4.jpg')}/>
            </View>
          </View>
        </View>

      </View>
      <View style={styles.tail}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/icon/home.png')} style={[styles.imagetail, {width: 40, height: 40}]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HowTo2')}>
          <Image source={require('./assets/icon/arrow.png')} style={styles.imagetail}/>
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