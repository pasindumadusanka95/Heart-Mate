import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { db, storage } from './src/config/firebase';
var RNFetchBlob = require('react-native-fetch-blob').default

//const userid = this.guidGenerator()
const userid="Joe1234"

export default class App extends Component {
    sound = null;
    state = {
        audioFile: '',
        recording: false,
        loaded: false,
        paused: true
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
        });
        //const api = this.getresult()
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
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
    };

    getSelectedImages(currentImage){
        console.log("sending...")
        const image = currentImage
     
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
     
       
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
        let audioFile = await AudioRecord.stop();
        console.log('audioFile', audioFile);
        this.setState({ audioFile, recording: false });
        let downUrl = this.getSelectedImages(audioFile)
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
        const { recording, paused, audioFile } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button onPress={this.start} title="Record" disabled={recording} />
                    <Button onPress={this.stop} title="Stop" disabled={!recording} />
                    {paused ? (
                        <Button onPress={this.play} title="Play" disabled={!audioFile} />
                    ) : (
                        <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});