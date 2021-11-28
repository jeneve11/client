import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'



export default function Result({ navigation, route }) {
  let { finalOne } = route.params;
  let { foodNotPicked } = route.params;
  const { categoryList } = route.params;
  const { arrC } = route.params;
  const { arrF } = route.params;

  let ca = arrC;
  let fa = arrF;
  let finalFood = finalOne.name;


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {textAlign: 'right', paddingRight: 35}]}>메뉴월드컵</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 55}]}>오늘은 안 땡겨!</Text>
      </View>

      <TouchableOpacity style={styles.body} onPress={() => navigation.navigate('Final', {finalFood: finalOne, categoryList: categoryList, arrC: ca, arrF: fa})}>
        <View style={styles.textBox}>
          <View style={{flex: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Text style={[styles.font, {color: '#898C8E', fontSize: 20, letterSpacing: -2}]}>오늘의 메뉴는</Text>
            <Text style={[styles.font, {fontSize: 55, letterSpacing: -2}]}> {finalFood}</Text>
          </View>
          <View style={{flex: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10}}>
            <View style={{flex: 5, alignItems: 'flex-end', justifyContent: 'center'}}>
              <Text style={[styles.font, {color: '#898C8E', fontSize: 20, letterSpacing: -2}]}>그렇다면</Text>
              <Text style={[styles.font, {color: '#898C8E', fontSize: 20, letterSpacing: -2}]}>오늘 어디 가지?</Text>
            </View>
            <View style={{flex: 2}}>
              <Image source={require('./assets/icon/person.png')} style={[styles.image, {backgroundColor: '#F5F5F5', borderRadius: 20}]}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.tail}>
        <ScrollView style={styles.textBox}>
          <Text style={[styles.font, {color: '#898C8E', fontSize: 20, letterSpacing: -2, paddingTop: 11}]}>오늘 안 땡기는 순위 {'\n'}</Text>
          <View>
            {foodNotPicked.map((food: any, index: any) => (
              <Rank food={food} key={index} index={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}




function Rank( {food, index}: any) {
  // let BoxStyle = categoryName.length === 5 ? styles.textBox5 : styles.textBox;
  return (
    // <Text style ={{fontFamily: 'MaruBuri-Regular', letterSpacing: -1}}>{`#${categoryName}`}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 115}}>
      <Text style={[styles.font, {fontSize: 20, letterSpacing: -2}]}>{`${index+1}위`}</Text>
      <Text style={[styles.font, {color: 'black', fontSize: 20, letterSpacing: -2, paddingLeft: 8}]}>{food}</Text>
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
    flex: 2,
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 45,
    color: '#0E4A84',
    letterSpacing: -5,
    textAlign: 'center',
  },
  body: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    margin: 10,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#a5a5a5',
  },
  tail: {
    flex: 6,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#f5f5f5',
  },
})