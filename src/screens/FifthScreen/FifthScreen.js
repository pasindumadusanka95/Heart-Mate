import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableHighlight
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
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
    fontSize: 22,
    fontWeight: 'bold',
    color : 'gray'
  },
  closeModal: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "50%",
    justifyContent: 'center',
    alignItems: 'center',
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
      <ReactNativeSettingsPage>
      <SectionRow text='Settings'>
        <NavigateRow
          text='Export to CSV'
          iconName='cogs'/>
        <SwitchRow 
          text='Max Record' 
          iconName='cogs'
          _value={this.state.switch}/>
        <CheckRow 
          text='Reset Records'
          iconName='cogs'
          _color='#000'
          _value={this.state.check}/>
       <CheckRow 
          text='Help' 
          iconName='cogs'
          onPressCallback={() => {
            this.setModalVisible(true);
          }}
          />
        {/* <SliderRow 
          text='Slider Row'
          iconName='your-icon-name'
          _color='#000'
          _min={0}
          _max={100}
          _value={this.state.value}
          _onValueChange={value => { this.setState({ value }) }} /> */}
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <View style={{marginTop: 22}}>
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={require('../../../imgs/vector_man.png')}
                  />
                  <Text style={styles.baseText}>
                  <Text style={styles.titleText} onPress={this.onPressTitle}>Device Placement{'\n'}</Text>
                  <Text>Place the stethescope microphone close to the heart (erb's point).</Text>
                  <Text style={styles.titleText} onPress={this.onPressTitle}>{'\n'}{'\n'}Record Duration{'\n'}</Text>
                  <Text>Each heart sound recording must be 3 seconds or more than that.{'\n'}</Text>
                  </Text>
                  <TouchableHighlight
                  style={styles.closeModal}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>  
      </SectionRow>
    </ReactNativeSettingsPage>
  
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
