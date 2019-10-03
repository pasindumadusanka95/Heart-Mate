import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
  CheckRow,
  SwitchRow, 
  SliderRow
} from 'react-native-settings-page';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },image: {
    marginTop: 10,
    width: 250,
    height: 250,
    resizeMode: 'stretch'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

this.state = {
  titleText: "Bird's Nest",
  bodyText: 'This is not really a bird nest.'
};
const FourthScreen = ()  => {
  
  return (
    
    <ReactNativeSettingsPage>
    <SectionRow text='Information'>
    <View style={styles.container}>
    <Image
          style={styles.image}
          source={require('../../../imgs/img.jpg')}
        />
    <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          Record Duration{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          One recording must be at least 3 seconds.
        </Text>
      </Text>
    </View>
    </SectionRow>
  </ReactNativeSettingsPage>
  );
}

FourthScreen.navigationOptions = {
  tabBarLabel:'info',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-information-circle'}/>  
      </View>),    
};

export default FourthScreen
