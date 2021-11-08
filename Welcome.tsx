import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { getStatusBarHeight } from "react-native-status-bar-height"; 


// Welcome page
export default class Welcome extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate('Home') 
      }>
        <View style={styles.container}>
          <StatusBar backgroundColor='white' />
          <View style={{flex: 2}}></View>
          <View style={styles.mid}>
            <Text style={styles.title}>머먹</Text>
            <Text style={styles.content}>당신을 위한</Text>
            <Text style={styles.content}>메뉴 선정</Text>
            <Text style={styles.content}>어플리케이션</Text>
            <Image source={require('./assets/icon/symbol.png')} style={styles.image}/>
          </View>
          <View style={styles.bot}>
            <Text style={styles.ps}>한양대학교</Text>
            <Text style={styles.ps}>테크노경영 김홍도팀</Text>
            <Text style={styles.ps}>김민재 김우성 김창회 도유진 홍다영</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  mid: {
    flex: 5,
    alignItems: 'flex-end',
  },
  bot: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 100,
    color: '#0E4A84',
    letterSpacing: -10,
  },
  content: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 30,
    color: '#0E4A84',
    letterSpacing: -3,
    marginRight: 10,
  },
  ps: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 20,
    color: '#898C8E',
    marginRight: 10,
    letterSpacing: -2,
  },
  image: {
    width: 135,
    height: 110,
    resizeMode: 'contain',
    marginRight: 14,
    tintColor: 'gray',
  }
});