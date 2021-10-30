import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Welcome from './Welcome';
import Home from './Home';
import HowTo from './HowTo';
import HashTag from './HashTag';
import PickCategory from './PickCategory';

const AppNavigator = createStackNavigator(
  {
    Welcome: {screen: Welcome},
    Home: {screen: Home},
    HowTo: {screen: HowTo},
    HashTag: {screen: HashTag},
    PickCategory: {screen: PickCategory},
  },
  {
    initialRouteName: 'Welcome', headerMode: 'none',
  }
);
 
export default createAppContainer(AppNavigator);