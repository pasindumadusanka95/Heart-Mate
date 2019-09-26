import React, { Component } from 'react';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { db, storage } from '../../config/firebase';
import {PieChart, BarChart, AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Slider
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
var RNFetchBlob = require('react-native-fetch-blob').default
//const userid = this.guidGenerator()
const userid="Joe1234"

export default class HomeScreen extends Component {

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }

  sound = null;
    state = {
        audioFile: '',
        recording: false,
        loaded: false,
        paused: true,
        started: true,
        valueSlider: 50,
        plotData: [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80],
    };

    
  async componentDidMount() {
    await this.checkPermission();

    const options = {
        sampleRate: 44100,
        channels: 2,
        bitsPerSample: 16,
        audioSource: 9,
        wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      //console.log('chunk size', chunk.byteLength);
      // do something with audio chunk

      // var array = [].slice.call(chunk)
      // array = array.slice(0,50)
      // this.setState({
      //   plotData: array
      // })
      
    });
    }

  checkPermission = async () => {
      const p = await Permissions.check('microphone');
      console.log('permission check', p);
      if (p === 'authorized') return;
      return this.requestPermission();
  };

  requestPermission = async () => {
      const p = await Permissions.request('microphone');
      console.log('permission request', p);
  };

  start = () => {
      console.log('start record');
      this.setState({ audioFile: '', recording: true, loaded: false, started: false });
      AudioRecord.start();
  };

  uploadFiles(currentImage){
      console.log("sending...")
      const image = currentImage
    
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      const Fetch = RNFetchBlob.polyfill.Fetch
      // replace built-in fetch
      window.fetch = new Fetch({
          // enable this option so that the response data conversion handled automatically
          auto : true,
          // when receiving response data, the module will match its Content-Type header
          // with strings in this array. If it contains any one of string in this array, 
          // the response body will be considered as binary data and the data will be stored
          // in file system instead of in memory.
          // By default, it only store response data to file system when Content-Type 
          // contains string `application/octet`.
          binaryContentTypes : [
              'image/',
              'video/',
              'audio/',
              'foo/',
          ]
      }).build()
      
      let uploadBlob = null
      const imageRef = storage.ref('users/'+userid).child(userid+".wav")
      let mime = 'audio/wav'
      fs.readFile(image, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          // URL of the image uploaded on Firebase storage
          console.log(url);
          this.sendAudioLinkToDb(url)
          console.log("getting result...")     
          this.getResponse()
                    
        })
        .catch((error) => {
          console.log(error);
    
        })  
    
    }

  guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  
  sendAudioLinkToDb(url){
      db.ref().child('users').child(userid).set({
        name: userid,
        audio: url
      })
  }
  
  getResponse = async () => {
    const response = await fetch('https://heart-sound-discrimination.herokuapp.com/predict?user_id='+userid)
    console.log(response)  
    console.log("Waiting for response...")
    const json = await response.json();
    // just log ‘json’
    console.log(json);
    this.setState({
      result: json
    })
    await this.props.navigation.navigate('result', { data: "result is bad" })
  }

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    this.setState({
      started:true
    })
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.uploadFiles(audioFile)
    this.setState({ audioFile, recording: false, plotData: []});
  };

  load = () => {
    return new Promise((resolve, reject) => {
        if (!this.state.audioFile) {
            return reject('file path is empty');
        }

        this.sound = new Sound(this.state.audioFile, '', error => {
            if (error) {
                console.log('failed to load the file', error);
                return reject(error);
            }
            this.setState({ loaded: true });
            return resolve();
        });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
        try {
            await this.load();
        } catch (error) {
            console.log(error);
        }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
        this.setState({ paused: true });
        // this.sound.release();
    });
  };

  pause = () => {
      this.sound.pause();
      this.setState({ paused: true });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.started ? (
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={this.start} 
            title="Record" 
            disabled={this.state.recording}
            style={styles.recBtn}>
            <Image
              source={require('../../../imgs/record.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          ):(
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={this.stop} 
            title="Stop" 
            disabled={!this.state.recording}
            style={styles.recBtn}>
            <Image
              source={require('../../../imgs/stop.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          )
          }
        <Text style={styles.welcome}>
          Plug microphone and start recording
        </Text>
        <View style={styles.chartContainer}>
          {/* <AreaChart
            style={styles.chart}
            data={plotData}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Grid /> 
          </AreaChart> */}
        </View>
        {/* <View style={styles.player}>
          <Slider
            step={1}
            maximumValue={100}
            onValueChange={this.change.bind(this)}
            value={valueSlider}
            style={styles.slider}
          />
          
          {this.state.paused ? (
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={this.play} 
              title="Play" 
              disabled={!this.state.audioFile}
            >
              <Image
                source={require('../../../imgs/play.png')}
                style={styles.playImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={this.pause} 
              title="Pause" 
              disabled={!this.state.audioFile}
            >
              <Image
                source={require('../../../imgs/pause.png')}
                style={styles.playImage}
              />
            </TouchableOpacity>
          )}
        </View>        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    marginTop: 10,
    width: 250,
    height: 250,
    resizeMode: 'stretch'
  },
  recBtn: {
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 40
  },
  playImage: {
    width: 20,
    height: 20,
    resizeMode: 'stretch'
  },
  chart: {
    marginTop: 5,
    height: 150,
    width: 200
  },
  slider: {
    marginTop: 40,
    width: 300,

  },
  player: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

HomeScreen.navigationOptions = {
  tabBarLabel:'Record',  
  tabBarIcon: ({ tintColor })=> (  
    <View>  
        <Icon style={[{color: tintColor}]} size={25} name={'ios-mic'}/>  
    </View>),  
};