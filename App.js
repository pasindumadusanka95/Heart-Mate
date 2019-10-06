import React from 'react';
import Navigator from './src/Navigator/Navigator.js'
import {StyleSheet, View} from "react-native";
import Frontpage from "./src/Animations/frontanimation";

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      show:false,
        pending:true
    }

  }
  loading(){
    this.setState({show:true})
  }
  componentDidMount(): void {
    setTimeout( () => {this.loading()}, 5000);
  }

  render() {
    return (
        <View style={styles.page}>
          {this.state.show ?
              <View style={styles.page} >
                  {this.state.pending ?
                      <Navigator/>
                      :
                      <View></View>
                  }
              </View>

              :
              <View style={styles.page}>
                <Frontpage></Frontpage>
              </View>
          }
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