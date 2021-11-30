import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './Welcome';
import Home from './Home';
import HowTo from './HowTo';
import HowTo2 from './HowTo2';
import HashTag from './HashTag';
import PickCategory from './PickCategory';
import WorldCup from './WorldCup';
import Result from './Result';
import Final from './Final';
import HashTagFinal from './HashTagFinal';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="HowTo" component={HowTo} options={{headerShown: false}}/>
        <Stack.Screen name="HowTo2" component={HowTo2} options={{headerShown: false}}/>
        <Stack.Screen name="HashTag" component={HashTag} options={{headerShown: false}}/>
        <Stack.Screen name="PickCategory" component={PickCategory} options={{headerShown: false}}/>
        <Stack.Screen name="WorldCup" component={WorldCup} options={{headerShown: false, animation: 'slide_from_right'}}/>
        <Stack.Screen name="Result" component={Result} options={{headerShown: false}}/>
        <Stack.Screen name="Final" component={Final} options={{headerShown: false}}/>
        <Stack.Screen name="HashTagFinal" component={HashTagFinal} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
