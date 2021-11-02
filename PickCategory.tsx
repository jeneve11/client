import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'

const data = [
  {
    id: '한식',
    num: 0,
    isPicked: false,
    uri: require('./assets/category/한식.jpg'),
  },
  {
    id: '중식',
    num: 1,
    isPicked: false,
    uri: require('./assets/category/중식.jpg'),
  },
  {
    id: '일식',
    num: 2,
    isPicked: false,
    uri: require('./assets/category/일식.jpg'),
  },
  {
    id: '양식',
    num: 3,
    isPicked: false,
    uri: require('./assets/category/양식.jpg'),
  },
  {
    id: '분식',
    num: 4,
    isPicked: false,
    uri: require('./assets/category/분식.jpg'),
  },
  {
    id: '패스트푸드',
    num: 5,
    isPicked: false,
    uri: require('./assets/category/패스트푸드.jpg'),
  },
  {
    id: '아시안',
    num: 6,
    isPicked: false,
    uri: require('./assets/category/아시안.jpg'),
  },
  {
    id: '기타',
    num: 7,
    isPicked: false,
    uri: require('./assets/category/기타.jpg'),
  },
];



export default function PickCategory() {
  const [selectedData, setSelectedData] = useState(8)
  const optionStyle = (item: any) => {
    return item.isPicked ? styles.picked : styles.notPicked
  }

  const onPressFunc = (item: any) => {
    item.isPicked = !item.isPicked
    setSelectedData(item.num)
    console.log(item)
  }
  const renderItem = ( {item}: any ) => (
    <View style={styles.yes}>
      <TouchableOpacity onPress={() =>
        onPressFunc(item)
      }>
        <ImageBackground
          source={item.uri}
          style={styles.imageCategory}
          imageStyle={optionStyle(item)}
        >
          <Text style={styles.textOnPicture}>{item.id}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' />

      <View style={styles.header}>
        <Text style={[styles.font, {textAlign: 'right', paddingRight: 35}]}>메뉴월드컵</Text>
        <Text style={[styles.font, {color: '#898C8E', fontSize: 55, textAlign: 'center'}]}>오늘은 안 땡겨!</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.font, {fontSize: 48}]}>카테고리 담기</Text>
      </View>
      <View style={[styles.body, {flex: 25}]}>
        <FlatList
          data={data}
          extraData={selectedData}
          renderItem={item => renderItem(item)}
          /*style={{
            margin: 20
          }}*/
          numColumns={2}
          //keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.tail}>
        <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
        <Image source={require('./assets/samplepicture.jpg')} style={styles.image}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  yes: {
    flexDirection: 'row',
    justifyContent: "center",
    marginHorizontal: 13,
    marginVertical: 3,
  },
  picked: {
    borderColor: 'blue', 
    borderWidth: 5,
  },
  notPicked: {

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 7,
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 45,
    color: '#0E4A84',
    letterSpacing: -5,
  },
  body: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tail: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  image: {
    width: 40,
    height: 50,
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
    // marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between'
  },
})