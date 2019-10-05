import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SecondScreen from '../screens/SecondScreen/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen/ThirdScreen';
import FourthScreen from '../screens/FourthScreen/FourthScreen';
import FifthScreen from '../screens/FifthScreen/FifthScreen';
import {createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const TabNavigator = createMaterialBottomTabNavigator(  
    {
      play: { screen: FourthScreen },
      History: { screen: ThirdScreen },
      record: { screen: HomeScreen },
      result: { screen: SecondScreen },
      settings: { screen: FifthScreen },
    },
    {
      initialRouteName: 'record',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#694fad' },
    }
  );
  export default createAppContainer(TabNavigator);  