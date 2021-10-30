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
              <Image source={require('./assets/samplepicture.jpg')} style={styles.imageHowTo}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 4}}>
          <View style={styles.body}>
            <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
            <Text style={styles.title}> 왕십리</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PickCategory')
          }>
            <View style={styles.body}>
              <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
              <Text style={styles.content}> 메뉴월드컵</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HashTag')
          }>
            <View style={[styles.body, {flexWrap: 'wrap'}]}>
              <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
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
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  body: {
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
  content: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 50,
    color: '#0E4A84',
    letterSpacing: -6,
  },
  imageHowTo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  image: {
    width: 30,
    height: 30,
  },
});