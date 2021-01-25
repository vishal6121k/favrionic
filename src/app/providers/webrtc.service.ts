import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

export interface Comm {
   status:any;
}

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peer: Peer;
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
  incomingCall:any;

  comm:Comm = { status : 0 };

  constructor() {

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

  // getMedia() {
  //   navigator.getUserMedia({ audio: true, video: true }, (stream) => {
  //     alert('got media');
  //     this.handleSuccess(stream);
  //   }, (error) => {
  //     this.handleError(error);
  //   });
  // }

  async init(userId:any, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    console.log(this.partnerEl);
    await this.createPeer('Favr'+userId);
  }

  async createPeer(userId:any) {
    console.log('init user '+userId);
    this.peer = new Peer(userId, this.options);
    this.peer.on('open', () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    console.log(partnerId);
    navigator.getUserMedia({ audio: true, video: false }, (stream) => {
      
      // alert('got media');
      this.myStream = stream;
      console.log(this.myStream);
      // this.myEl.srcObject = stream;
      // this.myEl.play();
      this.comm.status = 1;
      // Initiate call
      const call = this.peer.call('Favr'+partnerId, this.myStream);
      // When answered
      call.on('stream', (instream) => {
        console.log('got caller remote stream');
        this.remoteStream = instream;
        this.partnerEl.srcObject = this.remoteStream;
      });
    }, (error) => {
      this.handleError(error);
    });
  }

  wait() {
    console.log('waiting for incoming');
    this.peer.on('call', (call) => {
      console.log('got call');
      // this.incomingCall = call;
      if(confirm('Answer this Call?')){
        navigator.getUserMedia({ audio: true, video: false }, (stream) => {
          
          this.comm.status = 3;
          // alert('got media');
          this.myStream = stream;
          // this.myEl.srcObject = this.myStream;
          //     this.myEl.play();

          call.answer(this.myStream);
          // call.peerConnection.addEventListener('addstream', (e: any) => {
          //       this.partnerEl.srcObject = e.stream;
          // });
          let id;
          call.on('error', (error) => {
            console.log(error);
          })
          call.on('stream', (stream) => {
            if (id != stream.id) {
              console.log(this.partnerEl);
              id = stream.id;
              this.remoteStream = stream;
              // console.log(stream);
              this.partnerEl.srcObject = this.remoteStream;
              // this.partnerEl.play();
            }
            // this.partnerEl.src = URL.createObjectURL(stream);
            // this.partnerEl.play();
            // setTimeout(()=>{
            //   this.partnerEl.play();
            // }, 1000);
            
          });
        }, (error) => {
          this.handleError(error);
        });
      }
      // this.comm.status = 2;
    });
  }

  answerCall(){
    navigator.getUserMedia({ audio: true, video: false }, (stream) => {
      this.myStream = stream;
      this.myEl.srcObject = stream;
      this.incomingCall.answer(this.myStream);
      this.incomingCall.on('stream', (stream) => {
        console.log('remote stream');
        this.partnerEl.srcObject = stream;
      });
      this.comm.status = 3;
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

  close(){
    // this.myStream.getTracks()[0].stop();
    this.myStream.getTracks().forEach(track => track.stop())
    // this.peer.disconnect();
    this.comm.status = 0;
  }
}