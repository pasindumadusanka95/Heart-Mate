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
import {Text as MyText} from 'react-native'
const userid="Joe1234"
var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/'+userid+'.txt';

let barData = [0]

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  piechart: {
    marginTop: 5,
    height: 350,
    width: "100%",
    marginBottom: 15
  },
  barchart: {
    margin: 10,
    height: 300,
    width: "90%",
  },
  bottom: {
    justifyContent: 'flex-start',
    marginTop: 5
  },
  chartContainer: {
    
  }
});

let  lastRec = "[50,50]"

export default class SecondScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
        precentageArr: [27,63],
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

  readData= async () =>{
    RNFS.readFile(path, 'ascii').then(res => {
      console.log(res)
      let arr = []
      let str = ""
      for(let i=0;i<res.length;i++){
        if(res[i]!='\n'){
          str = str.concat(res[i])
        }else if(res[i]=='\n'){ 
          arr.push(str.split(','))
          
          str = ""
        }
      }
      arr.shift()
      console.log(arr)
      this.getPrecentages(arr)
      console.log(barData)
      return arr
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
  }

  getPrecentages(bardata){
    console.log(bardata)
    barData.shift()
    let n = bardata.length-1
    bardata = bardata.slice(n-8,n+3)
    let temp = []
    for(let i=0;i<bardata.length;i++){
      let abnorml = parseFloat(bardata[i][4].slice(1,6))
      if(i==bardata.length-1){
        let normal = parseFloat(bardata[i][3].slice(1,6))
        lastRec = JSON.stringify([normal, abnorml])
        console.log(lastRec)
      }
      barData.push(abnorml)
      console.log(abnorml)
    }
    if(barData.length>7){
      barData.shift()
    }
  }

  handleJSON(data2){
    console.log("In handle JSON")
    let classOfAudio = data2['class']
    let precentage = data2['precentage']

    let precentageArr = JSON.parse(precentage)
    let arr = this.readData()
    
    console.log(precentageArr)
    return [classOfAudio, precentageArr]
  }

  getHistory(data){
    //let hist = data.split(',')
    console.log(data)
    let n=0
    // console.log(data.length)
    // console.log(data)
    // for(let i=0;i<data.length;i++){
    //   // while(data.charAt(i)!='\n'){
    //   //   console.log(data[i])
    //   // }
    //   console.log("End line")
    // }
    //console.log(hist)
  }

  render(){
    const { navigation } = this.props; 
    const dataJson = navigation.getParam('data', {class: "None",precentage: lastRec});
    pieDatas = this.handleJSON(dataJson)

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
        <MyText style={styles.welcome}>Last Record</MyText>
        <View style={styles.bottom}>
          <PieChart
            style={styles.piechart}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
          >
            <Labels/>
          </PieChart>
        </View>
        <MyText style={styles.welcome}>Last 7 Predictions</MyText>
        <View>
          <BarChart style={styles.barchart} data={barData} svg={{ fill: '#9900cc' }} contentInset={{ top: 30, bottom: 30 }}>
          </BarChart>
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
