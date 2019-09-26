import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-svg-charts'
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
  chart: {
    marginTop: 5,
    height: 300,
    width: 300
  },
});


export default class SecondScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0
      },
      labelWidth: 0
    }
  }
  render(){
    const { navigation } = this.props; 
    const data = [ 50, 20, 30]
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    })) 
    const data2 = navigation.getParam('data', 'NO-data'); 
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>
            Your recorded heart sound is a type {data2} pattern.
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <PieChart style={styles.chart} data={pieData} />
        </View>
      </View>
    );
  }
  
}

SecondScreen.navigationOptions = {
  tabBarLabel:'Result',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'}/>  
      </View>),    
};
