import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart, BarChart, Grid } from 'react-native-svg-charts'
import Svg, {
  Text,
  Line,
} from 'react-native-svg';
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
    height: 350,
    width: 350,
    marginBottom: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 36
  },
  chartContainer: {
    justifyContent: 'center', 
    flex: 1
  }
});

const  pieDats = []

export default class SecondScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
        precentageArr: [27,63]
      },
      labelWidth: 0
    }
  }

  popInfo(index){
    Alert.alert(
      'Prediction info',
      index+'% Abnormal',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  }

  handleJSON(data2){
    console.log("In handle JSON")
    let classOfAudio = data2['class']
    let precentage = data2['precentage']

    let precentageArr = JSON.parse(precentage)
    
    console.log(precentageArr)
    return [classOfAudio, precentageArr]
  }

  render(){
    const { navigation } = this.props; 
    const dataJson = navigation.getParam('data', {class: "None",precentage: "[10,90]"});
    pieDatas = this.handleJSON((dataJson))

    const data = [
      {
          key: 1,
          amount: pieDatas[1][0],
          svg: { fill: '#5aa27c',onPress: () => this.popInfo(pieDatas[1][0]) },
      },
      {
          key: 2,
          amount: pieDatas[1][1],
          svg: { fill: '#ca0b00', onPress: () => this.popInfo(pieDatas[1][1]) }
      },
  ]

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
          const { labelCentroid, pieCentroid, data } = slice;
          return (
              <Text
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'white'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={24}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.amount}
              </Text>
          )
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.bottom}>
          <PieChart
            style={styles.chart}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
          >
            <Labels/>
          </PieChart>
        </View>
        <View>
          <BarChart style={styles.chart} data={[23,45,67,2,5,67]} svg={{ fill: '#9900cc' }} contentInset={{ top: 30, bottom: 30 }}>
          </BarChart>
        </View>
      </View>
    );
  }
  
}

SecondScreen.navigationOptions = {
  tabBarLabel:'Result',  
  title: 'Result',
  headerTitle: "hello",
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'}/>  
      </View>),    
};
