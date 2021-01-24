import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { WebrtcService } from '../../providers/webrtc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { google } from '@google/maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Peer from 'peerjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements AfterViewInit {
	cancPop:any = 0;
	cancRes:any = 0;
	itemPur:any;
	chatOpen:any = 0;
  	cancPopCont:any = 0;
  	orderId:any;
  	orderDets:any;
  	showPage:any = 0;
  	lat:any;
  	lng:any;
  	delLat:any;
  	delLng:any;
  	chatFile:any = "";
  	origin:any;
  	options:any;
  	destination:any;
  	ratePop:any = 0;
  	ratingUser:any = 1;
  	ordInt:any;
  	rateModel:any = {};
  	cancModel:any = {};
  	blockModel:any = {};
  	userId: any;
  	messages:any;
  	partnerId: any;
  	myEl: HTMLVideoElement;
  	partnerEl: HTMLVideoElement;
  	webrtc_enb:any = 0;
  	chatModel:any = {};
  	subscription:any;
  	shopperAnimation:any;
  	countTime:any;
  	callMinutes:any = '00';
	callSeconds:any = '00';
	showCallScreen:any = 0;
	totalSeconds:any = 0;
	comm:any;
	public renderOptions = {
    	suppressMarkers: true,
	}
	public markerOptions = {
	  origin: {
	      icon: 'assets/icon/pin1.png',
	      // draggable: true,
	  },
	  destination: {
	      icon: 'assets/icon/pin.png',
	      // label: 'MARKER LABEL',
	      // opacity: 0.8,
	  },
	};
  	@ViewChild('videoContainer') videoContainer;
  	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
  	private video: HTMLVideoElement;

  	constructor(private platform: Platform, private route: ActivatedRoute, public webRTC: WebrtcService,
				public elRef: ElementRef, private diagnostic: Diagnostic,
				private androidPermissions: AndroidPermissions, private geolocation: Geolocation,
				private locationAccuracy: LocationAccuracy, private api: ApiService,
				private router: Router, private firebase: FirebaseX) {

  		this.comm = this.webRTC.comm;
		this.video = document.createElement('video');
		this.video.width = 640;
		this.video.height = 480;
		this.video.setAttribute('autoplay', '');

		if (this.platform.is('cordova')) {
	  		this.platform.ready().then(() => {
				this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO]);
		
				this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
		  			result => console.log('Has permission?', result.hasPermission),
		  			err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
				);

				this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
		  			result => console.log('Has permission?', result.hasPermission),
		  			err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
				);

				this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS).then(
		  			result => console.log('Has permission?', result.hasPermission),
		  			err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS)
				);
	  		});
		}

  	}
  	ngAfterViewInit() {
		this.route.params.subscribe(params => {
			this.orderId = params['id'];
			console.log(this.orderId);
			this.getOrderDetails();
			this.getMessages();
			this.myEl = this.elRef.nativeElement.querySelector('#my-video');
			this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');
			this.firebase.onMessageReceived()
			.subscribe(data => {
				var messagebody = JSON.parse(data.message);
				console.log(messagebody);
				if(messagebody.type == 'order_update' || messagebody.type == 'location_update'){
			  		this.getOrderDetails();
				}
				if(messagebody.type == 'received_message'){
			  		this.getMessages();
				}
			});
		});
  	}

  	getOrderDetails(){
		var data = {
	  		order_id: this.orderId
		};
		this.api.getOrderById(data)
		.then(resp => {
	  		if(this.webrtc_enb == 0){
				this.partnerId = resp[0].user_id;
				this.userId = resp[0].dropper_id;
				this.init();
   				this.webrtc_enb = 1;
	  		}
	  		console.log(resp);
	  		this.orderDets = resp[0];
	  		this.showPage = 1;
	  		this.lat = parseFloat(resp[0].dropper.current_loc[0].lat);
	  		this.lng = parseFloat(resp[0].dropper.current_loc[0].lon);
	  		this.delLat = parseFloat(resp[0].delivery_lat);
	  		this.delLng = parseFloat(resp[0].delivery_lon);
	  		this.origin = { lat: this.lat, lng: this.lng };
	  		this.destination = { lat: this.delLat, lng: this.delLng };
	  		if(this.orderDets.status == 6){
				this.ratePop = 1;
				clearInterval(this.ordInt);
	  		}
	  		if(this.orderDets.status >= 6 && this.orderDets.shopper_rated == 1){
				this.router.navigate(['/dropper/home']);
	  		}
		})
		.catch(err => {

		});
  	}
  // 	ngAfterViewInit() {
		// this.init();
  // 	}

  	// initWebRTC() {
  	//   const constraints = {
  	//     video: true,
  	//     audio: false
  	//   };

  	//   const handleSuccess = (stream: MediaStream) => {
  	//     (<any>window).stream = stream; // make stream available to browser console
  	//     this.video.srcObject = stream;
  	//   };

  	//   const handleError = (error: any) => {
  	//     const p = document.createElement('p');
  	//     p.innerHTML = 'navigator.getUserMedia error: ' + error.name + ', ' + error.message;
  	//     this.videoContainer.nativeElement.appendChild(p);
  	//   };

  	//   navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  	// }

  	mapReady(){ }

  	setOrderItemStatus(id){
		var data = {
	  		order_detail_id: id
		};
		this.api.updateItemStatus(data)
		.then(resp => {
	  		console.log(resp);
	  		this.getOrderDetails();
		})
		.catch(err => {

		});
  	}

  	updateOrderStatus(status){
		var data = {
	  		order_id: this.orderDets.id
		};
		this.api.updateOrderStatus(status, data)
		.then(resp => {
	  		this.getOrderDetails();
	  		console.log(resp);
		})
		.catch(err => {

		});
  	}

  	confirmDelivery(){
		var data = {
	  		order_id: this.orderDets.id
		};
		this.api.updateOrderStatus(6, data)
		.then(resp => {
	  		this.getOrderDetails();
	  		console.log(resp);
		})
		.catch(err => {

		});
  	}
  
  	cancelOrder(rel=1){
  		if(this.cancModel.cancel_type){
			var data = this.cancModel;
			data['order_id'] = this.orderId;
			console.log(data);
			this.api.cancelOrder(data)
			.then(resp => {
		  		if(rel == 1){
					this.router.navigate(['/dropper/home']);
		  		}
			})
			.catch(err => {

			});
		}
  	}

  	blockUser(){
		this.cancModel = {
	  		cancel_type: 4,
	  		cancel_reason: "Blocked by User"
		};

		this.cancelOrder(0);

		var data = {
	  		reported_user_id: this.orderDets.user_id,
	  		reason: this.blockModel.reason
		};

		this.api.blockUser(data)
		.then(resp => {
	  		this.router.navigate(['/dropper/home']);
		})
		.catch(err => {

		});
  	}

  	saveRating(){
		var data = this.rateModel;
		data['order_id'] = this.orderId;
		console.log(data);
		this.api.saveShopperRating(data)
		.then(resp => {
	  		this.router.navigate(['/dropper/home']);
		})
		.catch(err => {

		});
  	}

  	init() {
		this.myEl = this.elRef.nativeElement.querySelector('#myVideo');
		this.partnerEl = this.elRef.nativeElement.querySelector('#partnerVideo');
		this.webRTC.init(this.userId, this.myEl, this.partnerEl);
  	}

  	call() {
  		this.showCallScreen = 1;
		this.webRTC.call(this.partnerId);
		console.log('callTo'+this.partnerId);
  	}

  	answerCall(){
  		this.webRTC.answerCall();
  	}

 //  	setTime() {
	//   ++this.totalSeconds;
	//   this.callSeconds = this.pad(this.totalSeconds % 60);
	//   this.callMinutes = this.pad(this.totalSeconds / 60);
	// }

	setTime(){
      // var count = this.countDownTime;
      this.callMinutes = Math.floor((this.totalSeconds/60));
      
      this.callSeconds = this.totalSeconds % 60;

      if(this.callMinutes < 10){
        this.callMinutes = "0"+this.callMinutes;
      }
      if(this.callSeconds < 10){
        this.callSeconds = "0"+this.callSeconds;
      }
      this.countTime = setTimeout(()=>{
        this.totalSeconds = this.totalSeconds + 1;
        this.setTime();
      }, 1000);
    }

	
  	sendMessage(){
  		if(this.chatModel.message == "" && this.chatFile == ""){
	      alert('Message cannot be empty');
	      return;
	    }
	    let fd= new FormData();
	    fd.append('to', 'shopper');
	    fd.append('order_id', this.orderId);
	    fd.append('message', this.chatModel.message);
	    if(!(this.chatFile == "")){
	      fd.append('file', this.chatFile);
	    }
	    else{
	      fd.append('file', '');
	    }
		// var data = this.chatModel;
		// data['to'] = this.partnerId;
		// data['order_id'] = this.orderId;
		this.api.sendMessage(fd)
		.then(resp =>{
			this.chatModel.message = "";
			this.chatFile = "";
			// this.messages.push({
			// 	'to': 'shopper',
			// 	'message': this.chatModel.message
			// });
			this.getMessages();
		})
		.catch(err => {

		});
  	}

  	onChange(files) {
	    this.chatFile = files[0];
  	}

  	getMessages(){
		var data = {};
		data['order_id'] = this.orderId;
		this.api.getMessages(data)
		.then(resp =>{
	  		this.messages = resp.messages;
	  		this.scrollToBottom();
		})
		.catch(err => {

		});
  	}

  	scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }


  	checkGPSPermission() {
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
	  	result => {
			if (result.hasPermission) {
		  		//If having permission show 'Turn On GPS' dialogue
		  		this.askToTurnOnGPS();
			} else {
		  		//If not having permission ask for permission
		  		this.requestGPSPermission();
			}
	  	},
	  	err => {
			alert(err);
	  	});
  	}

  
  	requestGPSPermission() {
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
	  		if (canRequest) {
				console.log("4");
	  		} else {
				//Show 'GPS Permission Request' dialogue
				this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
		  		.then( () => {
			  		// call method to turn on GPS
			  		this.askToTurnOnGPS();
				})
				.catch((error) => {
			  		//Show alert if user click on 'No Thanks'
			  		alert('requestPermission Error requesting location permissions ' + error)
				});
	  		}
		});
  	}
  	askToTurnOnGPS() {
		this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
		.then(() => {
			// When GPS Turned ON call method to get Accurate location coordinates
			this.getLocation()
	  	})
	  	.catch((error) => {
  			alert('Error requesting location permissions ' + JSON.stringify(error))
		});
  	}
  	getLocation(){
		console.log("getting location");
		this.options = {
			enableHighAccuracy : true
		};
		var lastUpdateTime, minFrequency = 10*1000;
		this.geolocation.getCurrentPosition(this.options)
		.then((resp) => {
	  		this.lat = resp.coords.latitude;
	  		this.lng = resp.coords.longitude;
	  		// this.deflat = resp.coords.latitude;
	  		// this.deflng = resp.coords.longitude;
	  		this.shopperAnimation = "BOUNCE";
	  		// this.showMap = 1;
	  		setTimeout(()=>{
				this.shopperAnimation = null;
	  		}, 2000);
	  		// console.log(resp.coords.latitude);
		})
		.catch((error) => {
	  		console.log('Error getting location', error);
		});
	
		var now;

		let watch = this.geolocation.watchPosition(this.options);
		this.subscription = watch.subscribe((data) => {
	  		console.log('getting location');
	  		if ("coords" in data) {
				// console.log(data.coords);
				this.lat = data.coords.latitude;
				this.lng = data.coords.longitude;
				var apidata = {
		  			'lat': this.lat,
		  			'lon': this.lng
				};

				now = new Date();
				if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
		  			console.log("Ignoring position update");
		  			return;
				}
				lastUpdateTime = now;
				this.api.addUserPolling(apidata)
				.then(resp => {

				})
				.catch(err => {

				});

  			} 
  			else {
				// ruh roh we have a PositionError
				console.log('error');
  			}
		});
  	}
}