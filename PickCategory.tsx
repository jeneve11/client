import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'

const data = [
  {
    id: '한식',
    uri: 'http://drive.google.com/uc?export=view&id=1Bu3NnZEtQXG-bhg10fv9ifeKGjHSZpyn',
  },
  {
    id: '중식',
    uri: 'http://drive.google.com/uc?export=view&id=1keGwjb3R1f_1lV7uNwmRUrXiZG1ZETW9',
  },
  {
    id: '일식',
    uri: 'http://drive.google.com/uc?export=view&id=1tCJ8FF9AMNywNfpR8qjFB6vrSL-vs7tE',
  },
  {
    id: '양식',
    uri: 'http://drive.google.com/uc?export=view&id=1htXXeeEZbnr7JVJpnQE_zhk1SJOXEkSO',
  },
  {
    id: '분식',
    uri: 'http://drive.google.com/uc?export=view&id=1mCJHN8PPZMB0kJN0SeH1cyU7fuPX9jaa',
  },
  {
    id: '패스트푸드',
    uri: 'http://drive.google.com/uc?export=view&id=169I3GCnuXfmBSJQIJgqAhQNga33k8kVP',
  },
  {
    id: '아시안',
    uri: 'http://drive.google.com/uc?export=view&id=1S-PIF9WJeD0A_CUNeO5OXNCq4t-41ACt',
  },
  {
    id: '기타',
    uri: 'http://drive.google.com/uc?export=view&id=1Bim6zKP2y8PcnN_oo9BGUVDlcrxfKEXt',
  },
];



export default function PickCategory() {
  // const [selectedId, setSelectedId] = useState([])
  /*
  const renderItem = ({ item }) => {
    
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(selectedId.push(item.id))}
        // backgroundColor={{ backgroundColor }}
        // textColor={{ color }}
      />

    );
  };*/
  const Item = ({ id }) => (
    <View style={styles.item}>
      <Text style={styles.font}>{id}</Text>
    </View>
  );
  
  const renderItem = ({ item }) => (
    <View style={{
      flexDirection: 'row',
      // alignContent: "center",
      justifyContent: "center",
      marginHorizontal: 13,
      marginVertical: 3,
    }}>
      <ImageBackground style={styles.imageCategory} source={{ uri: item.uri }}>
        <Text style={styles.textOnPicture}>{item.id}</Text>
      </ImageBackground>
    </View>
  )

  // {require('./assets/samplepicture.jpg')}
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
          renderItem={renderItem}
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
    // borderRadius: 10,
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