import React, { Component } from 'react';
import {View,Image,Text} from 'react-native'

class Frontpage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Image 
            source={require('../resources/heartbeat1.gif')}
            style={{width: '100%', height: '100%' }}
            
        />
    
        
          );
    }
}
 
export default Frontpage;