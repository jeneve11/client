import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Welcome from './Welcome';
import Home from './Home';
import HowTo from './HowTo';
import HashTag from './HashTag';
import PickCategory from './PickCategory';
import WorldCup from './WorldCup';

const AppNavigator = createStackNavigator(
  {
    Welcome: {screen: Welcome},
    Home: {screen: Home},
    HowTo: {screen: HowTo},
    PickCategory: {screen: PickCategory},
    WorldCup: {screen: WorldCup},
    HashTag: {screen: HashTag},
  },
  {
    initialRouteName: 'Welcome', headerMode: 'none',
  }
);
 
export default createAppContainer(AppNavigator);