import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Alert,
  Platform, YellowBox, ScrollView
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
    backgroundColor: '#ed3247',
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'flex-start',
    color: 'white'
    
  },
  BarChartText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'flex-start',
    textAlign: 'center'
  },
  headerText: {
    fontSize: 15,
    margin: 5,
    fontWeight: "bold",
    color: "grey"
  },
  menuContent: {
    color: "#000",
    padding: 2,
    fontSize: 15
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  piechart: {
    marginTop: 5,
    height: 300,
    width: "100%",
    marginBottom: 2
  },
  barchart: {
    marginLeft: 5,
    marginRight: 5,
    height: 300,
    width: "100%",
    padding: 20
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5
  },
  chartContainer: {
    
  },
  bottom: {
    justifyContent: 'flex-end',
    marginTop: 5
  },
  subText: {
    flexDirection:'row', flexWrap:'wrap',
    padding: 2
   },
   text: {
     marginLeft: 5
   },
   icon: {
     marginLeft: 2
   },
   dropDown: {
    textAlign: 'left', 
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
   },
   dropDownRow: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
   },
   top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5,
    width: "100%",
    backgroundColor: 'white',
  },
});

let  lastRec = "[51.3,48.7]"
let classs = "Normal"
let colorOfClass = "#ca0b00"
let displayClass = "Abnormal"

export default class SecondScreen extends Component{
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
        precentageArr: [27,63],
      },
      labelWidth: 0
    }
  }

  popInfo(index, classs){
    Alert.alert(
      'Prediction info',
      'At the moment your heart has '+index+'% '+classs+ ' sound pattern.',
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
    //barData.shift()
    let n = bardata.length
    let start = n-9
    let end = n-1
    bardata = bardata.slice(start,end)
    console.log(start, end)
    if(start<0){
      console.log("Invalid")
      bardata = bardata.slice(0,n-1)
      console.log(bardata)
    }
    let temp = []
    barData = []
    for(let i=0;i<bardata.length;i++){
      let abnorml = parseFloat(bardata[i][4].slice(1,6))
      let normal = parseFloat(bardata[i][3].slice(1,6))
      if(i==bardata.length-1){
        
        lastRec = JSON.stringify([normal, abnorml])
        console.log(lastRec)
      }
      if(displayClass==="Abnormal"){
        barData.push(abnorml)
      }else{
        barData.push(normal)
      }
      
      console.log(abnorml)
    }
    if(this.state.barData!==undefined){
      this.setState({
      barData: barData
    })
    }
    
  }

  handleJSON(data2){
    console.log("In handle JSON")
    let classOfAudio = data2['class']
    classs = classOfAudio
    colorOfClass = classOfAudio=="Abnormal"?"#ca0b00":"#5aa27c"
    let precentage = data2['precentage']

    let precentageArr = JSON.parse(precentage)
    let arr = this.readData()
    
    console.log(precentageArr)
    return [classOfAudio, precentageArr]
  }

  render(){
    const { navigation } = this.props; 
    const dataJson = navigation.getParam('data', {class: classs,precentage: lastRec});
    pieDatas = this.handleJSON(dataJson)

    const datas = [
      {
          key: 1,
          amount: pieDatas[1][0],
          svg: { fill: '#5aa27c',onPress: () => this.popInfo(pieDatas[1][0], "Normal") },
      },
      {
          key: 2,
          amount: pieDatas[1][1],
          svg: { fill: '#ca0b00', onPress: () => this.popInfo(pieDatas[1][1], "Abnormal") }
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
                  fontSize={20}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.amount+"%"}
              </Text>
          )
      })
    }
    const CUT_OFF = 5
    const LabelsBar = ({ x, y, bandwidth, data}) => (
      data.map((value, index) => (
          <Text
              key={ index }
              x={ x(index) + (bandwidth / 2) }
              y={ value < CUT_OFF ? y(value)-10 : y(value)+20 }
              fontSize={ 14 }
              fill={ value >= CUT_OFF ? 'white' : 'black' }
              alignmentBaseline={ 'middle' }
              textAnchor={ 'middle' }
          >
              {value+'%'}
          </Text>
      ))
    )

    return (
      <ScrollView style={styles.container}>
      <MyText style={styles.welcome}>Result</MyText>
        {/* <MyText style={styles.welcome}>Last Record</MyText> */}
        <View style={styles.top}>
        {/* <View style={styles.subText}>
          <View style={styles.icon}>  
            <Icon style={[{color: "red"}]} size={20} name={'ios-radio-button-on'}/>  
          </View>
          <MyText style = {styles.text}>
            Abnormal
          </MyText>
        </View>
        <View style={styles.subText}>
          <View style={styles.icon}>  
            <Icon style={[{color: "green"}]} size={20} name={'ios-radio-button-on'}/>  
          </View>
          <MyText style = {styles.text}>
            Normal
          </MyText>
        </View> */}
        <View style={styles.top}>
        <MyText style={styles.BarChartText}>Last Record</MyText>
          <PieChart
            style={styles.piechart}
            valueAccessor={({ item }) => item.amount}
            data={datas}
            spacing={0}
            outerRadius={'95%'}
          >
            <Labels/>
            <Text
              key={3}
              fill={colorOfClass}
              textAnchor={'middle'}
              alignmentBaseline={'middle'}
              fontSize={30}
              stroke={'black'}
              strokeWidth={0.2}
              fontFamily={'roboto'}
            >
              {classs}
            </Text>
          </PieChart>
        </View>
        <View style={styles.dropDownRow}>
          <MyText style={styles.BarChartText}>Last 8  Abnormal Predictions</MyText>
          {/* <View style={styles.dropDown}>
            <MenuProvider style={{ flexDirection: "column", padding: 20 }}>
              <Menu onSelect={value => ()=>{
                alert(`Display ${value} predictions`);
                displayClass = value
              }}>

                <MenuTrigger  >
                <MyText style={styles.headerText}>Abnormal</MyText>
                </MenuTrigger  >

                <MenuOptions>
                  <MenuOption value={"Normal"}>
                    <MyText style={styles.menuContent}>Normal</MyText>
                  </MenuOption>
                  <MenuOption value={"normal"}>
                    <Text style={styles.menuContent}>Normal</Text>
                  </MenuOption>
                </MenuOptions>

              </Menu>
            </MenuProvider>
          </View> */}
        </View>
        <View style={styles.bottom}>
          <BarChart 
            style={styles.barchart} 
            data={barData} 
            svg={{ fill: '#ca0b00' }} 
            contentInset={{ top: 5, bottom: 5}} 
            spacing={0.2}
            gridMin={0}>
            <Grid/>
            <LabelsBar/>
          </BarChart>
        </View>
      </View>
      </ScrollView>
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
