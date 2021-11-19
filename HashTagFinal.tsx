import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';

export default function HashTagFinal({ navigation, route }) {
  const [isLoaded, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { tag } = route.params;


  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const asyncFunc = () => {
    let promise = fetch(
      'https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/categories/패스트푸드/피자')
        .then(res => res.json())
    return promise;
  }

  const loadAssets = async () => {
    try {
      const result = await asyncFunc();
      console.log(result.result);
      setData(result.result);
    } catch (err) {
      console.log(err);
    }
  }

  if ( !isLoaded ) {
    return(
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setLoad(true)}
        onError={console.warn}
      />
    );
  }

  
  else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='white' />
        <View style={styles.header}>
          <Text style={[styles.font, {fontSize: 45, textAlign: 'right', paddingRight: 35}]}>메뉴월드컵</Text>
          <Text style={[styles.font, {color: '#898C8E', fontSize: 55}]}>오늘은 안 땡겨!</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            keyExtractor = {item => item.name}
            data={data}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <View style={[styles.textBox, {borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 0.5}]}>
                    <View style={{flex: 9, backgroundColor: 'white'}}>
                      <Text style={[styles.font, {alignSelf: 'flex-start', paddingLeft: 20, letterSpacing: -2}]}>{item.store}</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>음식점 주소</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>전화번호</Text>
                    </View>
                    <View style={{flex: 5}}>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>{item.name + '\n' + numberWithCommas(item.price) + '원'}</Text>
                    </View>     
                  </View>
                )
              } else if (index === (data.length -1)) {
                return (
                  <View style={[styles.textBox, {borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopWidth: 0.5}]}>
                    <View style={{flex: 9, backgroundColor: 'white'}}>
                      <Text style={[styles.font, {alignSelf: 'flex-start', paddingLeft: 20, letterSpacing: -2}]}>{item.store}</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>음식점 주소</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>전화번호</Text>
                    </View>
                    <View style={{flex: 5}}>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>{item.name + '\n' + numberWithCommas(item.price) + '원'}</Text>
                    </View>     
                  </View>
                )
              } else {
                return (
                  <View style={[styles.textBox, {borderTopWidth: 0.5, borderBottomWidth: 0.5}]}>
                    <View style={{flex: 9, backgroundColor: 'white'}}>
                      <Text style={[styles.font, {alignSelf: 'flex-start', paddingLeft: 20, letterSpacing: -2}]}>{item.store}</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>음식점 주소</Text>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>전화번호</Text>
                    </View>
                    <View style={{flex: 5}}>
                      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>{item.name + '\n' + numberWithCommas(item.price) + '원'}</Text>
                    </View>     
                  </View>
                )
              }
            }}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header: {
    flex: 6,
  },
  font: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 25,
    color: '#0E4A84',
    letterSpacing: -5,
    textAlign: 'center',
  },
  body: {
    flex: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textBox: {
    flex: 1,
    width: '83%',
    height: 140,
    backgroundColor: 'white',
    //borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  tail: {
    flex: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#f5f5f5',
  },
})