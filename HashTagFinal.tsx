import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';

export default function HashTagFinal({ navigation, route }) {
  const [isLoaded, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { hashData } = route.params;
  let arrCategory: any = [];
  let arrFood: any = [];
  let finalArr: any = []
  const categoryList: any = ['한식', '중식', '일식', '양식', '분식', '패스트푸드', '아시안', '기타']


  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const asyncFunc = () => {
    let promise = fetch(
      `https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/tag?t=${hashData}`)
        .then(res => res.json())
    return promise;
  }

  const loadAssets = async () => {
    try {
      const result = await asyncFunc();
      console.log(result);
      setData(result);
      funcPass(result);
    } catch (err) {
      console.log(err);
    }
  }


  //
  
  const getData = (category: string) => {
    let promise = fetch(
      `https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/categories/${category}`)
        .then(res => res.json())
    return promise;
  }

  const loadCategory = async (categoryList: Array<string>) => {
    const foodArr: any = [];
    for (const category of categoryList) {
      try {
        const result = await getData(category);
        arrCategory.push(result.result.length);
        foodArr.push(result.result);
      } catch (err) {
        console.log(err);
      }
    }

    return foodArr;
  }

  function range(start: number, end: number) {
    let array = [];
    for (let i = start; i < end; ++i) {
      array.push(i);
    }
    return array;
  }
  
  const funcPass = async (result: any) => {
    console.log('function funcPass start');

    console.log(`List of categories: ${categoryList}`);
    let passArr = await loadCategory(categoryList);

    let allFoodList: any = []

    console.log(arrCategory);
    for (let index of range(0, arrCategory.length)){
      if (!index) {
        arrCategory[index] -= 1
      } else if (index) {
        arrCategory[index] += arrCategory[index - 1];
      }
    }
    console.log(`arrCategory: ${arrCategory}`);

    console.log(passArr.length);
    for (let category of passArr) {
      for (let menu of category) {
        allFoodList.push(menu);
      }
    }

    for (const menu of allFoodList) {
      arrFood.push(menu.name);
    }
    console.log(`arrFood: ${arrFood}`);
    console.log(arrFood.length)

    for (const menu of result) {
      try {
        const result = await getURL(findCategory(menu.name), menu.name);
        finalArr.push(result.result);
      } catch (err) {
        console.log(err);
      }
    }

    console.log(`finalArr: ${JSON.stringify(finalArr)}`)
  }

  const getURL = (categoryName: string, menuName: string) => {
    let promise = fetch(
      `https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/categories/${categoryName}/${menuName}`)
        .then(res => res.json())
    return promise;
  }

  const findCategory = (menu: any) => {
    const index = arrFood.indexOf(menu);    
    for (const i of range(0, arrCategory.length)) {
      if (index <= arrCategory[i]) {
        return categoryList[i];
      }
    }
  }
  


  //

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
          <Text style={[styles.font, {fontSize: 40, paddingBottom: 15}]}>음식 리스트</Text>
          <FlatList
            keyExtractor = {item => item.name}
            data={data}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 5}}>
                  <Text style={styles.font}>{index}. {item.name}</Text>
                </View>
              )
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
    letterSpacing: -2,
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
});