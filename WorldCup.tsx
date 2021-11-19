import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert, BackHandler, Pressable } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { PressableOpacity } from 'react-native-pressable-opacity';


export default function WorldCup({ navigation, route }) {
  let { foodList } = route.params;
  let { foodAlreadyPicked } = route.params;
  let { foodNotPicked } = route.params;
  const { categoryList } = route.params;
  let { stage } = route.params;

  // 뒤로가기 키 이용 금지
  useEffect(() => {
    const backAction = () => {
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        // { text: "YES", onPress: () => BackHandler.exitApp() }
      ]
      Alert.alert("잠시만요!", "메뉴 선택 중에는 뒤로 가기 버튼을 이용하실 수 없습니다!"); 
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  // 아마도 안쓰일듯?
  const changeSlashToHyphen = (foodName: string) => {
    // '/'가 존재하는 case
    if (foodName.indexOf('/') !== -1) {
      return foodName.replace('/', '-');
    }
    else {
      return foodName;
    }
  }
  
  // 꾹 누르기, 모달 창 구현해야 할듯, pres
  const pickFoodAsFinal = (num: number) => {



    if (num === 0) {
      foodAlreadyPicked.push(foodList[foodList.length - 1]);
      foodNotPicked.push(foodList[foodList.length - 2].name);
    } else if (num === 1) {
      foodAlreadyPicked.push(foodList[foodList.length - 2]);
      foodNotPicked.push(foodList[foodList.length - 1].name);
    }
    let finalOne = foodAlreadyPicked[0];
    console.log(`final One: ${finalOne.name}`);
    navigation.navigate('Result', {finalOne: finalOne, foodNotPicked: foodNotPicked});

    return;
  }

  const shuffle = (array: any) => {
    array.sort(() => Math.random() - 0.5);
  }

  const pickFood = (num: number) => {
    // 위쪽 아이템이 선택됨
    if (num === 0) {
      foodAlreadyPicked.push(foodList[foodList.length - 1]);
      foodNotPicked.push(foodList[foodList.length - 2].name);
    } else if (num === 1) {
      foodAlreadyPicked.push(foodList[foodList.length - 2]);
      foodNotPicked.push(foodList[foodList.length - 1].name);
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
          let finalOne = foodAlreadyPicked[0];
          console.log(`final One: ${finalOne.name}`);
          navigation.navigate('Result', {finalOne: finalOne, foodNotPicked: foodNotPicked});
          return;
        default:
          console.log('Something Wrong');
      }
    }
    console.log(foodAlreadyPicked)
    console.log(`Length of foodList: ${foodList.length} and Length of foodAlreadyPicked: ${foodAlreadyPicked.length} and foodNotPicked: ${foodNotPicked}`);
    navigation.push('WorldCup', { foodList: foodList, foodAlreadyPicked: foodAlreadyPicked, foodNotPicked: foodNotPicked, categoryList: categoryList, stage: stage})
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
        <PressableOpacity onPress={() => pickFood(0) } onLongPress={() => pickFoodAsFinal(0)}>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 1].image
              }}
              style={{width: 180, height: 180, justifyContent: 'center', opacity: 0.7}}
              imageStyle={{borderRadius: 90}}
            >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 1].name}</Text>
            </ImageBackground>
          </View>
        </PressableOpacity>
        <Text style={[styles.font, {fontSize: 40, color: '#0E4A84'}]}>vs</Text>
        <PressableOpacity onPress={() => pickFood(1) } onLongPress={() => pickFoodAsFinal(1)}>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 2].image
              }}
              style={{width: 180, height: 180, justifyContent: 'center', opacity: 0.7}}
              imageStyle={{borderRadius: 90}}
              >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 2].name}</Text>
            </ImageBackground>
          </View>
        </PressableOpacity>
      </View>

      <View style={[styles.body, {flex: 1.5, alignItems: 'flex-start', justifyContent: 'center'}]}>
        <View style= {{flexDirection: 'row', paddingHorizontal: 10}}>
          {categoryList.map((category: any, index: any) => (
            <Box categoryName={category} key={index} />
          ))}
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

function Box( {categoryName}: any ) {
  let BoxStyle = categoryName.length === 5 ? styles.textBox5 : styles.textBox;
  return (
    <View style={BoxStyle}>
      <Text style ={{fontFamily: 'MaruBuri-Regular', letterSpacing: -1}}>{`#${categoryName}`}</Text>
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
    flex: 4,
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 45,
    color: '#0E4A84',
    letterSpacing: -5,
  },
  body: {
    flex: 12,
    alignItems: 'center',
    //backgroundColor: 'grey',
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
    fontSize: 35,
    textAlign: "center",
    letterSpacing: -2,
  },
  textBox: {
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    marginLeft: 13,
  },
  textBox5: {
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    marginLeft: 13,
  },
})