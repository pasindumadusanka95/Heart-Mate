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
    fontSize: 20
  },image: {
    marginTop: 10,
    width: '100%',
    height: 400,
    resizeMode: 'stretch',
    justifyContent : 'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color : 'gray'
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
          source={require('../../../imgs/vector_man.png')}
        />
    <Text style={styles.baseText}>
    <Text style={styles.titleText} onPress={this.onPressTitle}>
          Device Placement{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
        {'\t'}  Close to the heart.
        </Text>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
        {'\n'}{'\n'}
          Record Duration{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
        {'\t'}  One recording must be at least 3 seconds.{'\n'}{'\n'}
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
