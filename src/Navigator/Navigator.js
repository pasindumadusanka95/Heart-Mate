import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SecondScreen from '../screens/SecondScreen/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen/ThirdScreen';
import FourthScreen from '../screens/FourthScreen/FourthScreen';
import {createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const TabNavigator = createMaterialBottomTabNavigator(  
    {
      record: { screen: HomeScreen },
      result: { screen: SecondScreen },
      History: { screen: ThirdScreen },
      Cart: { screen: FourthScreen },
    },
    {
      initialRouteName: 'record',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#694fad' },
    }
  );
  export default createAppContainer(TabNavigator);  