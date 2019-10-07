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
  container: {
    padding: 20
  },
  subText: {
    textAlign: 'justify'
  }
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
        <Text style={styles.titleText} onPress={this.onPressTitle}>Heart Sounds</Text>
        <Text style={styles.subText}>Heart sounds are produced from a specific cardiac event such as closure of a valve or tensing of a chordae tendineae. Many pathologic cardiac conditions can be diagnosed by auscultation of the heart sounds.</Text>

        <Text style={styles.titleText} onPress={this.onPressTitle}>{'\n'}Location</Text>
        <Text style={styles.subText}>The location of the heart sound can help determine the etiology. The standard listening posts (aortic, pulmonic, tricuspid and mitral) apply to both heart sounds and murmurs.{'\n'}</Text>
        <Image
          style={styles.image}
          source={require('../../../imgs/heartPlaces.png')}
        />
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
