import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
});

const ThirdScreen = ()  => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        THIS IS THE History SCREEN! preious recorded sounds results
      </Text>
    </View>
  );
}

ThirdScreen.navigationOptions = {
  tabBarLabel:'third',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-time'}/>  
      </View>),    
};

export default ThirdScreen
