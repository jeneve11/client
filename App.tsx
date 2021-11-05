import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './AppNavigator'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
 


type Props = {};
export default class App extends Component<Props> {
  state = {
    fontsLoaded: false,
  }
  constructor(props) {
    super(props)
    this.setState = this.setState.bind(this)
  }
  
  async loadFonts() {
    await Font.loadAsync({
      'MaruBuri-Regular': {
        uri: require('./assets/fonts/MaruBuri-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }
  
  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if ( !this.state.fontsLoaded ) {
      return <AppLoading/>
    }
    return (
      <AppNavigator/>
    );
  }
}