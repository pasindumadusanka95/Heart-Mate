import React from 'react';
import {StyleSheet, View,Text, Image} from "react-native";
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
                    
                    <Image
                        source={require('../../../imgs/waitanim.gif')}
                        style={styles.image}
                    />
                    <SkypeIndicator color='black' />
                </View>
                
            </View>
        );
    }

}
const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff"
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'roboto'
        
      },
      row: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      image: {
        marginTop: 10,
        marginBottom: 30,
        width: 250,
        height: 250,
        resizeMode: 'stretch'
      },
})