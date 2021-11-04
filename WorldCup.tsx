import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'



export default function WorldCup({ navigation: { navigate } }) {
  let stage = ['16강', '8강', '4강', '준결승', '결승']

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {textAlign: 'right', paddingRight: 35}]}>메뉴월드컵</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 55, textAlign: 'center'}]}>오늘은 안 땡겨!</Text>
      </View>

      <View style={styles.body}>
        {/* 여기 value[0~4] 컨트롤 해야함 조건문?으로*/}
        <Text style={[styles.font, {fontSize: 40, color: 'black'}]}>{stage[0]}</Text>
        <ImageBackground
          source={require('./assets/samplepicture.jpg')}
          style={{width: 180, height: 180, justifyContent: 'center'}}
          imageStyle={{borderRadius: 90}}
        >
          {/* 여기 AAAA(음식명) 컨트롤 해야함 조건문?으로*/}
          <Text style={styles.textOnPicture}>AAAA</Text>
        </ImageBackground>

          <Text style={[styles.font, {fontSize: 40, color: '#0E4A84'}]}>vs</Text>
          <ImageBackground
          source={require('./assets/samplepicture.jpg')}
          style={{width: 180, height: 180, justifyContent: 'center'}}
          imageStyle={{borderRadius: 90}}
        >
          {/* 여기 AAAA(음식명) 컨트롤 해야함 조건문?으로*/}
          <Text style={styles.textOnPicture}>AAAA</Text>
        </ImageBackground>
      </View>

      <View style={styles.tail}>
        <TouchableOpacity onPress={() => navigate('PickCategory')}>
          <Text style={[styles.textOnPicture, {color: 'black', fontSize: 15, letterSpacing: -2}]}>다시 카테고리 담기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('WorldCup')}>
          <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
        </TouchableOpacity>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 5,
    backgroundColor: 'red'
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 45,
    color: '#0E4A84',
    letterSpacing: -5,
  },
  body: {
    flex: 15,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  tail: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 40,
    height: 50,
  },
  foodPicture: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  textOnPicture: {
    fontFamily: 'MaruBuri-Regular',
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
})