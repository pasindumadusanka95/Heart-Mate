import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  tabIcon: {
    width: 16,
    height: 16,
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 20
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: "50%",
    resizeMode: 'stretch',
    justifyContent : 'center',
    padding: 100
  },
  titleText: {
    fontSize: 18,
    color : 'black',
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 5
  },
  closeModal: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "50%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5,
    width: "100%",
    height: 900,
    backgroundColor: 'white',
    padding: 10
  },
});

class FifthScreen extends Component {
  state = {
		check: false,
		switch: false,
    value: 40,
    modalVisible: false,
	}
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Settings</Text>
      <View style={styles.top}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>Export to CSV</Text>
        <Text style={styles.titleText} onPress={this.onPressTitle}>Clear Records</Text>
        <Text style={styles.titleText} onPress={this.onPressTitle}>Credits</Text>
       </View>
       </ScrollView>
  
    );
  }
  
}

FifthScreen.navigationOptions = {
  tabBarLabel:'settings',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-settings'}/>  
      </View>),    
};

export default FifthScreen
