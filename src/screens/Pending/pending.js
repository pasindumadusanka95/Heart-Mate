import React from 'react';
import {StyleSheet, View,Text} from "react-native";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

export default class Pending extends React.Component {
    constructor(){
        super();

    }


    render() {
        return (
            <View style={styles.page}>
                <View style={styles.row}>
                    <Text style={styles.welcome}>
                        Please Wait 
                    </Text>
                    <DotIndicator color='black' />
                </View>
                
            </View>
        );
    }

}
const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        
      },
      row: {
        justifyContent: 'center',
        alignItems: 'center'
      }
})