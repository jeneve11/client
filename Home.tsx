import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { getStatusBarHeight } from "react-native-status-bar-height"; 


// Home page
export default class Home extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='white' />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HowTo')
          }>
            <View>
              <Image source={require('./assets/icon/help.png')} style={styles.imageHowTo}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 4}}>
          <View style={styles.body}>
            <Image source={require('./assets/icon/place.png')} style={[styles.imageHowTo, {width: 50, height: 50}]}/>
            <Text style={styles.title}>왕십리</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PickCategory')
          }>
            <View style={styles.body}>
              <Image source={require('./assets/icon/cup.png')} style={[styles.image, {backgroundColor: '#f5f5f5', borderRadius: 20}]}/>
              <Text style={styles.content}> 메뉴월드컵</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HashTag')
          }>
            <View style={[styles.body, {flexWrap: 'wrap'}]}>
              <Image source={require('./assets/icon/hashtag.png')} style={[styles.image, {backgroundColor: '#f5f5f5', borderRadius: 20}]}/>
              <Text style={styles.content}> 해시태그로</Text>
              <Text style={styles.content}>           검색하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 1.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 80,
    color: '#0E4A84',
    letterSpacing: -10,
    paddingHorizontal: 5,
  },
  content: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 50,
    color: '#0E4A84',
    letterSpacing: -6,
  },
  imageHowTo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    width: 40,
    height: 40,
  },
});