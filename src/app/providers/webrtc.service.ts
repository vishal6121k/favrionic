import { Injectable } from '@angular/core';
import Peer from 'peerjs';

export interface Comm {
   status:any;
}

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peer: Peer;
  myStream: MediaStream;
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
      key: 'cd1ft79ro8g833di',
      debug: 3
    };
  }

  getMedia() {
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      alert('got media');
      this.handleSuccess(stream);
    }, (error) => {
      this.handleError(error);
    });
  }

  async init(userId:any, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    console.log('init user '+userId);

    this.myEl = myEl;
    this.partnerEl = partnerEl;
    await this.createPeer(userId);
  }

  async createPeer(userId:any) {
    this.peer = new Peer(userId);
    this.peer.on('open', () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    console.log(partnerId);
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      
      alert('got media');
      this.myStream = stream;
      this.comm.status = 1;
      // Initiate call
      const call = this.peer.call(partnerId, this.myStream);
      // When answered
      call.on('stream', (stream) => {
        this.partnerEl.srcObject = stream;
      });
    }, (error) => {
      this.handleError(error);
    });
  }

  wait() {
    this.peer.on('call', (call) => {
      this.comm.status = 2;
      console.log('got call');
      this.incomingCall = call;
    });
  }

  answerCall(){
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.myStream = stream;
      this.incomingCall.answer(this.myStream);
      this.comm.status = 3;
    }, (error) => {
      this.handleError(error);
    });

    this.incomingCall.on('stream', (stream) => {
      this.partnerEl.srcObject = stream;
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
    this.myStream.getTracks()[0].stop();
    this.peer.disconnect();
    this.comm.status = 0;
  }
}