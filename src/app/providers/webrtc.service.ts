import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
// import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
declare var AudioToggle:any;
export interface Comm {
   status:any;
}

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peer: Peer;
  userId:any;
  myStream: MediaStream;
  remoteStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  stun = 'stun.l.google.com:19302';
  mediaConnection: Peer.MediaConnection;
  options: Peer.PeerJSOption;
  stunServer: RTCIceServer = {
    urls: 'stun:' + this.stun,
  };
  incomingCall:any = "";
  outgoingCall:any = "";
  ringtone:any;
  dataConn:any;
  inited:any = "";

  comm:Comm = { status : 0 };

  constructor(private nativeAudio: NativeAudio,
    private backgroundMode: BackgroundMode) {
    this.nativeAudio.preloadComplex('231321321312', 'assets/sounds/ring.mp3', 1, 1, 0).then(resp => {
    } , err => { console.log(err); });
    this.nativeAudio.preloadComplex('231321321311', 'assets/sounds/call.mp3', 1, 1, 0).then(resp => {
    } , err => {console.log(err);});
    // this.nativeAudio.loop('uniqueId1').then(resp => {} , err => {console.log(err);});
    // this.ringtones.getRingtone().then((ringtones) => { 
    //   console.log(ringtones);

    // this.ringtones.playRingtone('android_asset/www/assets/sounds/ring.mp3')
    // .then(success => {
    //   console.log(success);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    // });

    // this.ringtones.getRingtone( ringtones => {
    //   this.ringtone = ringtones[1].Url; console.log(ringtones); 

    // },
    // err => { 

    //   alert(err);

    // }, "notification");
    this.options = {  // not used, by default it'll use peerjs server
      debug: 3,
      config: { 'iceServers': [
            { 'urls': 'stun:stun.l.google.com:19302' },
            {
              urls: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com'
            },
      ]}
    };
  }

  async init(userId:any, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    this.userId = userId;
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    console.log(this.partnerEl);
    // this.backgroundMode.on('activate', () => {
    //    this.backgroundMode.disableWebViewOptimizations(); 
    // });

    AudioToggle.setAudioMode(AudioToggle.SPEAKER);
    await this.createPeer('Favr'+userId);
  }

  getPeer(){

  }

  async createPeer(userId:any) {
      console.log('init user '+userId);
      console.log(this.peer);
      // if(this.peer == undefined){
        this.peer = new Peer(userId, this.options);
        this.peer.on('open', () => {
          this.wait();
        });
      // }
      // else{
      //   this.peer.on('open', () => {
      //     this.wait();
      //   });
      // }
  }

  call(partnerId: string) {
    console.log(partnerId);
      this.comm.status = 1;
    navigator.getUserMedia({ audio: true, video: false }, (stream) => {
      
      // alert('got media');
      this.myStream = stream;
      console.log(this.myStream);
      // this.myEl.srcObject = stream;
      // this.myEl.play();
      // Initiate call
      var call = this.peer.call('Favr'+partnerId, this.myStream);
      this.outgoingCall = call;
      AudioToggle.setAudioMode(AudioToggle.EARPIECE);
      this.nativeAudio.loop('231321321311');
      // When answered
      // this.dataConn = this.peer.connect('Favr'+partnerId);
      // this.dataConn.on('data', (data) => {
      //   console.log('Received', data);
      //   if(data == 0){
      //     this.close(1);
      //   }
      // });
      call.on('stream', (instream) => {
        this.nativeAudio.stop('231321321311');
        console.log('got caller remote stream');
        this.remoteStream = instream;
        this.partnerEl.srcObject = this.remoteStream;
        this.comm.status = 3;
      });

    }, (error) => {
      this.handleError(error);
    });
  }

  wait() {
    console.log('waiting for incoming');
    // this.peer.on('connection', (conn) => {
    //   this.dataConn = conn;
    //   this.dataConn.on('data', (data) => {
    //     console.log('Received some data', data);
    //     console.log('Received', data);
    //     if(data == 0){
    //       this.close(1);
    //     }
    //   });
    // });
    this.peer.on('call', (call) => {
      AudioToggle.setAudioMode(AudioToggle.RINGTONE);
      // Turn screen on and show app even locked
      this.backgroundMode.isScreenOff((bool) => {
        if(bool == true){
          this.backgroundMode.unlock();
          this.backgroundMode.wakeUp();
        }
        if(this.backgroundMode.isActive()){
          this.backgroundMode.moveToForeground();
        }
      });
      this.nativeAudio.loop('231321321312');
      console.log('got call');
      this.incomingCall = call;
      this.comm.status = 2;
    });
    // this.peer.on('close', () => {
    //   console.log('peer closed');
    //   this.close();
    // });
  }

  answerCall(){
    this.nativeAudio.stop('231321321312');
        navigator.getUserMedia({ audio: true, video: false }, (stream) => {
          this.comm.status = 3;
          this.myStream = stream;
          this.incomingCall.answer(this.myStream);
          let id;
          this.incomingCall.on('error', (error) => {
            console.log(error);
          });

          this.incomingCall.on('stream', (stream) => {
            AudioToggle.setAudioMode(AudioToggle.EARPIECE);
            if (id != stream.id) {
              console.log(this.partnerEl);
              id = stream.id;
              this.remoteStream = stream;
              this.partnerEl.srcObject = this.remoteStream;
            }
            
          });
        }, (error) => {
          this.handleError(error);
        });
  }

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
  }

  handleError(error: any) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      // const v = constraints.video;
     // this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      this.errorMsg(`The resolution px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  errorMsg(msg: string, error?: any) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  close(send = 0){
    this.comm.status = 0;
    AudioToggle.setAudioMode(AudioToggle.NORMAL);
    // if(send == 0){
    //   console.log('closed');
    //   // this.dataConn.send(0);
    // }
    // this.dataConn.close();
    // this.myStream.getTracks()[0].stop();
    this.peer.destroy();
    // if(!(this.outgoingCall == "")){
      // this.outgoingCall.close();
    // }
    // if(!(this.incomingCall == "")){
      // this.incomingCall.close();
    // }

    if(this.myStream)
      this.myStream.getTracks().forEach(track => track.stop())
    if(this.remoteStream && this.remoteStream.getTracks())
      this.remoteStream.getTracks().forEach(track => track.stop())
    this.init(this.userId, this.myEl, this.partnerEl);
    this.nativeAudio.stop('231321321312');
    this.nativeAudio.stop('231321321311');
  }
}