import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { StatusBar } from 'expo-status-bar'


const categoryData = [
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


export default function PickCategory({ navigation }) {
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  const [touchCount, setTouchCount] = useState(0)


  const chooseRandom = (arr, num = 1) => {
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 };

  const optionStyle = (item: any) => {
    return item.isPicked ? styles.picked : styles.notPicked
  };
  
  const getFoodList = (categoryList: Array<string>) => {
    const foodArr: any = [];
    for (const category of categoryList) {
      try {
        let promise = fetch(
          `https://4h5fvtcuw1.execute-api.ap-northeast-2.amazonaws.com/prod/categories/${category}`)
            .then(res => res.json())
            //.then(funcData => console.log(funcData))
        
        promise.then((appData: any) => {
          foodArr.push(appData);
        });
        // emptyArr.push(json.result);
      } catch (error) {
        console.error(error);
      }
    }
    return foodArr;
  };

  // 우하단 화살표를 눌렀을 때 작동하는 함수 / 선택한 카테고리들에서 랜덤한 16개의 음식을 뽑아 WorldCup.tsx로 전달함
  const funcPass = () => {
    console.log('go to Worldcup.tsx');
    const categoryList: any = []

    for (const num of [0, 1, 2, 3, 4, 5, 6, 7]) {
      if (categoryData[num].isPicked === true) {
        categoryList.push(categoryData[num].id);
      }
    }
    console.log(categoryList);
    let passArr = getFoodList(categoryList);
    // setTimeout 1초 줌 - Promise 객체가 완전히 object로 전환되기를 대기
    setTimeout(function() {
      let allFoodList: any = []
      for (const i of passArr){
        for (const j of i.result){
          allFoodList.push(j);
        }
      }
      console.log(`Length of the allFoodList: ${allFoodList.length}`);

      if (allFoodList.length < 16) {
        alert('You should choose more category!');
      } else {
        let foodList: any = chooseRandom(allFoodList, 16);
        let sixteen: string = '16강';
        let emptyList: any = [];
        navigation.navigate('WorldCup', {foodList: foodList, foodAlreadyPicked: emptyList, categoryList: categoryList, stage: sixteen});
      }
      
    }, 500);
  }

  const onPressFunc = (item: any) => {
    item.isPicked = !item.isPicked;
    setTouchCount(touchCount + 1);
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
          data={categoryData}
          extraData={touchCount}
          renderItem={item => renderItem(item)}
          numColumns={2}
          //keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.tail}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/icon/home.png')} style={[styles.image, {width: 40, height: 40}]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => funcPass() }>
          <Image source={require('./assets/icon/arrow.png')} style={styles.image}/>
        </TouchableOpacity>
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
    borderColor: '#0E4A84', 
    borderWidth: 4,
    opacity: 0.7,
  },
  notPicked: {
    opacity: 0.7,
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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 30,
    height: 30,
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
    marginHorizontal: 16,
    justifyContent: 'space-between'
  },
})