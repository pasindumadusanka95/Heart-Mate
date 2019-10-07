import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Alert,
  Platform, YellowBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart, BarChart, Grid } from 'react-native-svg-charts'
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
  CheckRow,
  SwitchRow, 
  SliderRow
} from 'react-native-settings-page';
import Svg, {
  Text,
  Line,
} from 'react-native-svg';
import {Text as MyText} from 'react-native'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu"

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
    textAlign: 'left',
    margin: 5,
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
   }
});

let  lastRec = "[50,50]"

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
                  fontSize={20}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.amount+"%"}
              </Text>
          )
      })
    }
    return (
      <ReactNativeSettingsPage>
      <SectionRow text='Result'>
      <View style={styles.container}>
        {/* <MyText style={styles.welcome}>Last Record</MyText> */}
        <View style={styles.subText}>
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
        </View>
        <View style={styles.top}>
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
        <View style={styles.dropDownRow}>
          <MyText style={styles.welcome}>Last 8 Predictions</MyText>
          <View style={styles.dropDown}>
            <MenuProvider style={{ flexDirection: "column", padding: 20 }}>
              <Menu onSelect={value => alert(`Display ${value} predictions`)}>

                <MenuTrigger  >
                <MyText style={styles.headerText}>Abnormal</MyText>
                </MenuTrigger  >

                <MenuOptions>
                  <MenuOption value={"Normal"}>
                    <MyText style={styles.menuContent}>Normal</MyText>
                  </MenuOption>
                  <MenuOption value={"normal"}>
                    <Text style={styles.menuContent}></Text>
                  </MenuOption>
                </MenuOptions>

              </Menu>
            </MenuProvider>
          </View>
        </View>
        <View style={styles.bottom}>
          <BarChart style={styles.barchart} data={barData} svg={{ fill: '#ca0b00' }} contentInset={{ top: 5, bottom: 5}}>
          </BarChart>
        </View>
      </View>
      </SectionRow>
  </ReactNativeSettingsPage>
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
