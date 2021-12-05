import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert, BackHandler } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { PressableOpacity } from 'react-native-pressable-opacity';



export default function WorldCup({ navigation, route }) {
  let { foodList } = route.params;
  let { foodAlreadyPicked } = route.params;
  let { foodNotPicked } = route.params;
  let { categoryList } = route.params;
  let { stage } = route.params;
  const { arrC } = route.params;
  const { arrF } = route.params;

    
  // 꾹 누르기, 모달 창 구현해야 할 듯
  const pickFoodAsFinal = (num: number) => {
    let finalOne;
    if (num === 0) {
      foodAlreadyPicked.push(foodList[foodList.length - 1]);
      foodNotPicked.push(foodList[foodList.length - 2].name);
      finalOne = foodList[foodList.length - 1];
    } else if (num === 1) {
      foodAlreadyPicked.push(foodList[foodList.length - 2]);
      foodNotPicked.push(foodList[foodList.length - 1].name);
      finalOne = foodList[foodList.length - 2];
    }
    
    //console.log(`arrC : ${arrC} arrF: ${arrF}`)
    //console.log(`final One: ${finalOne.name}`);
    navigation.replace('Result', {finalOne: finalOne, foodNotPicked: foodNotPicked, categoryList: categoryList, arrC: arrC, arrF: arrF});
    // navigation.reset({routes: [{name: 'Result', params: {finalOne: finalOne, foodNotPicked: foodNotPicked, categoryList: categoryList, arrC: arrC, arrF: arrF}}]})
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
    } // 아래쪽 아이템이 선택됨
      else if (num === 1) {
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
          navigation.replace('Result', {finalOne: finalOne, foodNotPicked: foodNotPicked, categoryList: categoryList, arrC: arrC, arrF: arrF});
          return;
        default:
          console.log('Something Wrong');
      }
    }
    console.log(`arrC : ${arrC} arrF: ${arrF}`)
    console.log(foodAlreadyPicked)
    console.log(`Length of foodList: ${foodList.length} and Length of foodAlreadyPicked: ${foodAlreadyPicked.length} and foodNotPicked: ${foodNotPicked}`);
    navigation.replace('WorldCup', { foodList: foodList, foodAlreadyPicked: foodAlreadyPicked, foodNotPicked: foodNotPicked, categoryList: categoryList, stage: stage, arrC: arrC, arrF: arrF})
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {textAlign: 'right', fontSize: 40, paddingRight: 20}]}>메뉴월드컵</Text>
        <Text style={[styles.font, {textAlign: 'right', color: '#898C8E', fontSize: 45, paddingRight: 15}]}>오늘은 뭘 먹지?</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.font, {fontSize: 40, color: 'black'}]}>{stage}</Text>
        <PressableOpacity onPress={() => pickFood(0) } onLongPress={() => pickFoodAsFinal(0)}>
          <View>
            <ImageBackground
              source={{
                uri: foodList[foodList.length - 1].image
              }}
              style={{width: 200, height: 200, justifyContent: 'center', opacity: 0.7}}
              imageStyle={{borderRadius: 100}}
              key={foodList}
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
              style={{width: 200, height: 200, justifyContent: 'center', opacity: 0.7}}
              imageStyle={{borderRadius: 100}}
              >
              <Text style={styles.textOnPicture}>{foodList[foodList.length - 2].name}</Text>
            </ImageBackground>
          </View>
        </PressableOpacity>
      </View>

      <View style={[styles.body, {flex: 1, alignItems: 'flex-start', justifyContent: 'center'}]}>
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
    flex: 3,
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