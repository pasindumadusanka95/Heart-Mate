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



                <DotIndicator color='black' />
                    <Text style={{color: 'red',fontSize:18}}>
                        {"\n\n"} Please Wait for your result{"\n\n"}
                    </Text>
                <DotIndicator color='black' />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent: 'center'
    },
})