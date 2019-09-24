import React, { Component } from 'react';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { db, storage } from '../../config/firebase';
import { LineChart, Grid } from 'react-native-svg-charts'
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
        plotData: [1,2,3,10,12,9,0,23,102,1],
    };

    
  async componentDidMount() {
    await this.checkPermission();

    const options = {
        sampleRate: 44100,
        channels: 2,
        bitsPerSample: 16,
        wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
      console.log(chunk.byteLength)
      //console.log(chunk)
      // var array = [].slice.call(chunk)
      // console.log(array)
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
      this.setState({ audioFile, recording: false});
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
    const valueSlider = this.state.valueSlider;
    const plotData = this.state.plotData
    return (
      <View style={styles.container}>
        <View>
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
          
          <Slider
            step={1}
            maximumValue={100}
            onValueChange={this.change.bind(this)}
            value={valueSlider}
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
          <View>
            {/* <LineChart
              style={{height:'30%',width:'100%' }}
              data={plotData}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 5, bottom: 5 }}
            >
              <Grid />
            </LineChart> */}
            
          </View>
        </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch'
  },
  recBtn: {
    marginBottom: 5,
  },
  playImage: {
    width: 50,
    height: 50,
    resizeMode: 'stretch'
  }
});

HomeScreen.navigationOptions = {
  tabBarLabel:'Record',  
  tabBarIcon: ({ tintColor })=> (  
    <View>  
        <Icon style={[{color: tintColor}]} size={25} name={'ios-mic'}/>  
    </View>),  
};