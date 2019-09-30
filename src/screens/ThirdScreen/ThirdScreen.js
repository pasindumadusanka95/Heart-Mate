import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: '#4f603c',
    justifyContent: 'flex-start'
 },
  tabIcon: {
    width: 16,
    height: 16,
  },
});

class ThirdScreen extends Component{
  state = {
    names: [
       {
          id: 0,
          name: 'Ben',
       },
       {
          id: 1,
          name: 'Susan',
       },
       {
          id: 2,
          name: 'Robert',
       },
       {
          id: 3,
          name: 'Mary',
       }
    ]
 }

  alertItemName = (item) => {
    alert(item.name)
  }

  render(){
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.names.map((item, index) => (
              <TouchableOpacity
                  key = {item.id}
                  style = {styles.container}
                  onPress = {() => this.alertItemName(item)}>
                  <Text style = {styles.text}>
                    {item.name}
                  </Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
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
