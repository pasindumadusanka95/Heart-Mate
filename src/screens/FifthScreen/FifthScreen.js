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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
});

const FifthScreen = ()  => {
  state = {
		check: false,
		switch: false,
		value: 40
	}
	
  return (
    <ReactNativeSettingsPage>
    <SectionRow text='Settings'>
      <NavigateRow
        text='Default state'
        iconName='cogs'
        onPressCallback={this._navigateToScreen} />
      <SwitchRow 
        text='Max Record' 
        iconName='cogs'
        _value={this.state.switch}
        _onValueChange={() => { this.setState({ switch: !this.state.switch }) }} />
      <CheckRow 
        text='Reset Records'
        iconName='cogs'
        _color='#000'
        _value={this.state.check}
        _onValueChange={() => { this.setState({ check: !this.state.check }) }} />
      {/* <SliderRow 
        text='Slider Row'
        iconName='your-icon-name'
        _color='#000'
        _min={0}
        _max={100}
        _value={this.state.value}
        _onValueChange={value => { this.setState({ value }) }} /> */}
    </SectionRow>
  </ReactNativeSettingsPage>

  );
}

FifthScreen.navigationOptions = {
  tabBarLabel:'settings',  
  tabBarIcon: ({ tintColor }) => (  
      <View>  
          <Icon style={[{color: tintColor}]} size={25} name={'ios-settings'}/>  
      </View>),    
};

export default FifthScreen
