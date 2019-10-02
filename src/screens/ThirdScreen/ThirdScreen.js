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
    textAlign: 'left', alignSelf: 'stretch',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: "90%"
 },
 icon: {
  
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
      objArr.push({id: i,name: arr[i]})
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
          arr.push(str)
          
          str = ""
        }
      }
      arr.shift()
      console.log(arr)
      this.setState({
        arr: arr
      })
      this.generateList(arr)
      return arr
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
  }
  alertItemName = (item) => {
    alert(item.name)
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>Last Recordings</Text>
        <View style={styles.top}>
          {
            this.state.names.map((item, index) => (
              <TouchableOpacity
                  style={styles.listItem}
                  key = {item.id}
                  onPress = {() => this.alertItemName(item)}>
                  <Text style = {styles.text}>
                    {item.name}
                  </Text>
                  <View style={styles.icon}>  
                    <Icon style={[{color: "red"}]} size={25} name={'ios-heart'}/>  
                  </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

ThirdScreen.navigationOptions = {
  tabBarLabel:'third',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-time'}/>  
      </View>),    
};

export default ThirdScreen
