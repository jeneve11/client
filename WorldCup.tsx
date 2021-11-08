import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


export default function WorldCup({ navigation, route }) {
  const { foodList } = route.params;
  const { foodAlreadyPicked } = route.params;
  const { categoryList } = route.params;
  // 몇강인지는 음식 list의 길이로 판단?
  let stage = ['16강', '8강', '4강', '준결승', '결승'];

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
        {/* 이 onPress함수에서 list 뒤에 2개 pop하고 navigate*/}
        <TouchableOpacity onPress={() => navigation.push('WorldCup', { foodList: foodList})}>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 1].image
              }}
              style={{width: 170, height: 170, justifyContent: 'center'}}
              imageStyle={{borderRadius: 90}}
            >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 1].name}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={[styles.font, {fontSize: 40, color: '#0E4A84'}]}>vs</Text>
        <TouchableOpacity onPress={() => navigation.push('WorldCup', { foodList: foodList})}>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 2].image
              }}
              style={{width: 170, height: 170, justifyContent: 'center'}}
              imageStyle={{borderRadius: 90}}
              >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 2].name}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>

      {/*여기에 밑부분 해시태그 작성해야함 근데 갯수가 그때그때 달라서 좀 어려울듯 - 메인기능 다 구현하고 하자*/}
      <View style={[styles.body, {flex:1.5, backgroundColor: 'pink', flexDirection: 'column'}]}>
        <View>
          <Text>{categoryList}</Text>
          <Text>{foodList[foodList.length - 1].name}</Text>
        </View>
      </View>

      <View style={styles.tail}>
        <TouchableOpacity onPress={() => navigation.navigate('PickCategory')}> 
          <Text style={[styles.textOnPicture, {color: 'black', fontSize: 15, letterSpacing: -2}]}>다시 카테고리 담기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/icon/home.png')} style={styles.image}/>
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
    flex: 12,
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
    height: 40,
  },
  textOnPicture: {
    fontFamily: 'MaruBuri-Regular',
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
})