import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
  CheckRow,
  SwitchRow, 
  SliderRow
} from 'react-native-settings-page';
const userid="Joe1234"
var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/'+userid+'.txt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: '#4f603c',
    textAlign: 'left', 
    alignSelf: 'stretch',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 3
 },
 lower: {
  color: '#4f603c',
  textAlign: 'left', 
  alignSelf: 'stretch',
  fontSize: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 3,
  marginRight: 3,
  width: "80%",
  fontSize: 25,
 },
 subText: {
  flexDirection:'row', flexWrap:'wrap'
 },
 icon: {
  margin: 5
 },
  tabIcon: {
    width: 16,
    height: 16,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5,
    width: "100%"
  },
  listItem: {
    borderColor: "green",
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection:'row', flexWrap:'wrap'
  },
  final: {
    fontSize: 40,
    width: "100%",
    margin: 5,
    textAlign: 'right', 
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class ThirdScreen extends Component{
  state = {
    names: [
       {
          id: 0,
          name: '',
       },
    ]
  }

  componentDidMount(){
    this.readData()
  }

  generateList(arr){
    objArr = []
    for(let i=0;i<arr.length;i++){
      let temp = arr[i]
      let date = temp[0]
      let time = temp[1]
      let classs = temp[2]
      let nrm = temp[3].slice(1,temp[3].length-1)
      let abnrm = temp[4].slice(1,temp[4].length-1)
      precent = classs==="Abnormal"?abnrm:nrm
      heartColor = classs==="Abnormal"?"red":"green"
      objArr.push({id: i,date: date, time: time,classs: classs, precent: precent+"%", color: heartColor})
    }
    this.setState({
      names: objArr
    })
    console.log(objArr)
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
      this.generateList(arr)
      return arr
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
  }
  alertItemName = (item) => {
    //alert(item.name)
  }

  render(){
    return (
      <ReactNativeSettingsPage>
    <SectionRow text='Records History'>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.welcome}>Last Recordings</Text> */}
        <View style={styles.top}>
          {
            this.state.names.map((item, index) => (
              <TouchableOpacity
                  style={styles.listItem}
                  key = {item.id}
                  onPress = {() => this.alertItemName((item.classs+" "+item.precent))}>
                  <View style={styles.icon}>  
                    <Icon style={[{color: item.color}]} size={50} name={'ios-heart'}/>  
                  </View>
                  <View>
                    <View style={styles.subText}>
                      <View>  
                        <Icon size={20} name={'ios-calendar'}/>  
                      </View>
                      <Text style = {styles.text}>
                        {item.date}
                      </Text>
                      <View>  
                        <Icon size={20} name={'ios-time'}/>  
                      </View>
                      <Text style = {styles.text}>
                        {item.time}
                      </Text>
                    </View>
                    
                    <Text style = {styles.lower}>
                      {item.classs}
                    </Text>
                  </View>
                  <View>
                    <Text style = {styles.final}>
                      {item.precent}
                    </Text>
                  </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
      </SectionRow>
  </ReactNativeSettingsPage>
    );
  }
}

ThirdScreen.navigationOptions = {
  tabBarLabel:'history',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-time'}/>  
      </View>),  
};

export default ThirdScreen
