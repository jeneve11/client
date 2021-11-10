import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert, BackHandler } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


export default function WorldCup({ navigation, route }) {
  let { foodList } = route.params;
  let { foodAlreadyPicked } = route.params;
  const { categoryList } = route.params;
  let { stage } = route.params;

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        // { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  const shuffle = (array: any) => {
    array.sort(() => Math.random() - 0.5);
  }

  const pickFood = (num: number) => {
    // 위쪽 아이템이 선택됨
    if (num == 0) {
      foodAlreadyPicked.push(foodList[foodList.length - 1]);
    } else if (num == 1) {
      foodAlreadyPicked.push(foodList[foodList.length - 2]);
    }
    foodList.pop();
    foodList.pop();

    if (foodList.length === 0) {
      switch (foodAlreadyPicked.length) {
        case 8:
          foodList = foodAlreadyPicked;
          shuffle(foodList);
          foodAlreadyPicked = [];
          stage = '8강';
          break;
        case 4:
          foodList = foodAlreadyPicked;
          shuffle(foodList);
          foodAlreadyPicked = [];
          stage = '4강';
          break;
        case 2:
          foodList = foodAlreadyPicked;
          shuffle(foodList);
          foodAlreadyPicked = [];
          stage = '결승';
          break;
        case 1:
          console.log(`final one: ${foodAlreadyPicked[0].name}`)
          navigation.navigate('Home');
          return;
        default:
          console.log('Something Wrong');
      }
    }
    console.log(foodAlreadyPicked)
    console.log(`Length of foodList: ${foodList.length} and Length of foodAlreadyPicked: ${foodAlreadyPicked.length}`);
    navigation.push('WorldCup', { foodList: foodList, foodAlreadyPicked: foodAlreadyPicked, categoryList: categoryList, stage: stage})
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {textAlign: 'right', paddingRight: 35}]}>메뉴월드컵</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 55, textAlign: 'center'}]}>오늘은 안 땡겨!</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.font, {fontSize: 40, color: 'black'}]}>{stage}</Text>
        {/* 이 onPress함수에서 list 뒤에 2개 pop하고 navigate*/}
        <TouchableOpacity onPress={() => pickFood(0) }>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 1].image
              }}
              style={{width: 170, height: 170, justifyContent: 'center'}}
              imageStyle={{borderRadius: 85}}
            >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 1].name}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={[styles.font, {fontSize: 40, color: '#0E4A84'}]}>vs</Text>
        <TouchableOpacity onPress={() => pickFood(1) }>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 2].image
              }}
              style={{width: 170, height: 170, justifyContent: 'center'}}
              imageStyle={{borderRadius: 85}}
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