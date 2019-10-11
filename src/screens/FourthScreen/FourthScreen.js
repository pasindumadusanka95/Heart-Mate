import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


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
    flex: 1,
    backgroundColor: '#ed3247',
  },
  subText: {
    textAlign: 'justify'
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
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5,
    width: "100%",
    backgroundColor: 'white',
    padding: 10
  },
});

this.state = {
  titleText: "Bird's Nest",
  bodyText: 'This is not really a bird nest.'
};
const FourthScreen = ()  => {
  
  return (
  
      <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Information</Text>
      <View style={styles.top}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>Heart Sounds</Text>
        <Text style={styles.subText}>Heart sounds are produced from a specific cardiac event such as closure of a valve or tensing of a chordae tendineae. Many pathologic cardiac conditions can be diagnosed by auscultation of the heart sounds.</Text>

        <Text style={styles.titleText} onPress={this.onPressTitle}>{'\n'}Location</Text>
        <Text style={styles.subText}>The location of the heart sound can help determine the etiology. The standard listening posts (aortic, pulmonic, tricuspid and mitral) apply to both heart sounds and murmurs.{'\n'}</Text>
        <Image
          style={styles.image}
          source={require('../../../imgs/heartPlaces.png')}
        />
        <Text style={styles.titleText} onPress={this.onPressTitle}>{'\n'}How to use the device</Text>
        <Text style={styles.subText}>Place the stethescope microphone close to the heart (Between A and B points). Each heart sound recording must be 3 seconds or more than that. Press and hold record button to listen to your heart sound.{'\n'}</Text>
        <Image
          style={styles.image}
          source={require('../../../imgs/vector_man.png')}
        />
       </View>
       </ScrollView>
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
