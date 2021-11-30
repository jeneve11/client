import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';

export default function HashTagFinal({ navigation, route }) {
  const [isLoaded, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const { hashData } = route.params;

  let arrCategory: any = [];
  let arrFood: any = [];
  let finalArr: any = []
  const categoryList: any = ['한식', '중식', '일식', '양식', '분식', '패스트푸드', '아시안', '기타']

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
        const resultresult = result.result;
        for (const rest of resultresult) {
          finalArr.push(rest);
        }
        //finalArr.push(result.result);
      } catch (err) {
        console.log(`error occured: ${menu.name}`)
        console.log(err);
      }
    }

    console.log(`finalArr: ${JSON.stringify(finalArr)}`)
    setFinalData(finalArr);
  }

  const getURL = (categoryName: string, menuName: string) => {
    console.log(`fetch: ${categoryName}, ${replaceAll(menuName, '/', '-')}`)
    let promise = fetch(
      `https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/categories/${categoryName}/${replaceAll(menuName, '/', '-')}`)
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

  function replaceAll(str: string, searchStr: string, replaceStr: string) {
    return str.split(searchStr).join(replaceStr);
  }

  const decodeHashData = (hashData: string) => {
    switch (hashData) {
      case 'solo': return '혼밥'
      case 'hangover': return '숙취'
      case 'noodle': return '면'
      case 'simple': return '간단하게'
      default: return 'ERROR'
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
          <Text style={[styles.font, {color: '#898C8E', fontSize: 35, textAlign: 'right', paddingRight: 25}]}>메뉴가</Text>
          <Text style={[styles.font, {color: '#898C8E', fontSize: 35, textAlign: 'right', paddingRight: 25}]}>생각나지 않을 때</Text>

          <Text style={[styles.font, {textAlign: 'right', fontSize: 40, paddingRight: 25}]}>해시태그로</Text>
          <Text style={[styles.font, {textAlign: 'right', fontSize: 40, paddingRight: 25}]}>검색하기</Text>

        </View>
        
        <View style={{flex: 4, flexDirection: 'row', justifyContent: 'center', 'alignItems': 'center'}}>
          <View style={[styles.textBoxA, {paddingHorizontal: 5}]}>
            <Text style={[styles.font, {color: 'black', fontSize: 20}]}>#{decodeHashData(hashData)}</Text>
          </View>
          <View style={{paddingHorizontal: 5}}>
            <Text style={[styles.font, {color: 'black', fontSize: 20}]}>로 검색한 가게</Text>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            keyExtractor = {(item, index) => index.toString() + item.toString()}
            data={finalData}
            renderItem={({item, index}) => {
              let textBoxStyle = styles.textBox;

              // 요소(음식점)가 하나뿐일때
              if (index === 0 && index === (finalData.length -1)) {
                textBoxStyle = styles.textBox0;
              } // 첫번째 요소
                else if (index === 0) {
                textBoxStyle = styles.textBox1;
              } // 중간 요소
                else if (index === (finalData.length -1)) {
                textBoxStyle = styles.textBox2;
              } // 마지막 요소
                else {
                textBoxStyle = styles.textBox3;     
              }
              return (
                <View style={textBoxStyle}>
                  <View style={{flex: 9, backgroundColor: 'white'}}>
                    <Text style={[styles.font, {alignSelf: 'flex-start', paddingLeft: 20, letterSpacing: -2, paddingBottom: 10}]}>{item.name}</Text>
                    <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2, alignSelf: 'flex-start', paddingLeft: 5}]}>{item.address}</Text>
                    <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2, alignSelf: 'flex-start', paddingLeft: 15}]}>{item.contact}</Text>
                  </View>
                  <View style={{flex: 5}}>
                    {(item.Foods).map((food: any, index: any) => (
                      <Food food={food} key={index} />
                    ))}  
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    )
  }
}


function Food( {food}: any ) {
  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <View>
      <Text style={[styles.font, {color: '#898C8E', fontSize: 15, letterSpacing: -2}]}>{`${food.name} ${numberWithCommas(food.price)}원`}</Text>
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
    flex: 11,
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
  textBoxA: {
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5A5A5',
    marginLeft: 13,
  },
  textBox: {
    flex: 1,
    width: 380,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBox0: {
    flex: 1,
    width: 380,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 0.5
  },
  textBox1: {
    flex: 1,
    width: 380,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0.5
  },
  textBox2: {
    flex: 1,
    width: 380,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 0.5
  },
  textBox3: {
    flex: 1,
    width: 380,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
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