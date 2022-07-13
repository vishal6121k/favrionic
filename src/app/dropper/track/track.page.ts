import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NotifyService } from '../../services/notify.service';
import { WebrtcService } from '../../providers/webrtc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { google } from '@google/maps';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

import Peer from 'peerjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnDestroy {
	cancPop:any = 0;cancRes:any = 0;itemPur:any;chatOpen:any = 0;
	items: Observable<any[]>;
  	cancPopCont:any = 0;orderId:any;orderDets:any;showPage:any = 0;lat:any;lng:any;
  	delLat:any;delLng:any;chatFile:any = "";origin:any;options:any;
  	destination:any; ratePop:any = 0; ratingUser:any = 1; ordInt:any; rateModel:any = {}; cancModel:any = {}; blockModel:any = {};
  	userId: any; messages:any; partnerId: any; myEl: HTMLVideoElement; partnerEl: HTMLVideoElement; webrtc_enb:any = 0; chatModel:any = {}; prev_time:any = 0;
  	subscription:any; shopperAnimation:any; countTime:any; callMinutes:any = '00';callSeconds:any = '00';
	showCallScreen:any = 0; totalSeconds:any = 0; comm:any; actTime:any = 0; callTime:any; zoom:any = 16;
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
	showBtn:any = 0;
  	@ViewChild('videoContainer') videoContainer;
  	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
  	private video: HTMLVideoElement;

	loc:Observable<any>;
	itemRef: AngularFireObject<any>;

  ProdImgUrl:any = "http://admin.favr.ie/uploads/";

  	constructor(private platform: Platform, private route: ActivatedRoute, public webRTC: WebrtcService,
				public elRef: ElementRef, private diagnostic: Diagnostic,
				private androidPermissions: AndroidPermissions, private geolocation: Geolocation,
				private locationAccuracy: LocationAccuracy, private api: ApiService, private notify: NotifyService,
				private router: Router, 
				private firebase: FirebaseX,
				private db: AngularFireDatabase,
				private _ngZone: NgZone,private nativeAudio: NativeAudio) {
  		
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
				this.requestGPSPermission();
	  		});
		}

  	}
  	ionViewDidEnter() {
  		this.cancPop = 0;
  		this.ratePop = 0;
  		this.origin = { lat:0, lng:0 };
  		this.destination = { lat:0, lng:0 };
  		this.nativeAudio.preloadComplex('231321321310', 'assets/sounds/note.mp3', 1, 1, 0).then(resp => {
      } , err => {console.log(err);});
		this.route.params.subscribe(params => {
			this.orderId = params['id'];
			console.log('inited');
			this.getOrderDetails();
			this.getMessages();
			this.myEl = this.elRef.nativeElement.querySelector('#my-video');
			this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');
			this.firebase.onMessageReceived()
			.subscribe(data => {
            	console.log(data.tap);
				var messagebody = JSON.parse(data.message);
				console.log(messagebody);
				if(messagebody.type == 'order_update'){
			  		this._ngZone.run(() => {
		                this.getUpdatedOrderDetails();
	              	});
				}
				if(messagebody.type == 'received_message'){
              		this.nativeAudio.play('231321321310');
			  		this._ngZone.run(() => {
		                this.getMessages();
		                this.chatOpen = 1;
	              	});
				}
				
	            if(data.tap != undefined && !(window.location.pathname == '/'+messagebody.action_url)){
	              this.router.navigate(['/'+messagebody.action_url]);
	            }
		        else if(data.tap == undefined && !(window.location.pathname == '/'+messagebody.action_url)){
		          this.notify.notify(data);
		        }
			});
			
		});
  	}

  	setCallTime(){
  		var time = this.partnerEl.currentTime;
  		this.actTime = time;
  		time = Math.floor(time);
  		this.callTime = this.secondsToHms(time);
  		console.log(this.callTime);
  	}

  	secondsToHms(d) {
	    d = Number(d);

	    var h = Math.floor(d / 3600);
	    var m = Math.floor(d % 3600 / 60);
	    var s = Math.floor(d % 3600 % 60);

	    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
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
	  		this.orderDets = resp[0];
	  		this.showPage = 1;
	  		this.delLat = parseFloat(resp[0].delivery_lat);
	  		this.delLng = parseFloat(resp[0].delivery_lon);
	  		this.destination = { lat: this.delLat, lng: this.delLng };
	  		if(this.orderDets.status == 6){
				this.ratePop = 1;
				clearInterval(this.ordInt);
    			this.subscription.unsubscribe();
	  		}
	  		if(this.orderDets.status >= 6 && this.orderDets.shopper_rated == 1){
				this.router.navigate(['/dropper/home']);
	  		}
		})
		.catch(err => {

		});
  	}

  	getUpdatedOrderDetails(){
  		var data = {
	  		order_id: this.orderId
		};
		this.api.getOrderById(data)
		.then(resp => {
	  		this.orderDets = resp[0];
	  		if(this.orderDets.status == 6){
				this.ratePop = 1;
				clearInterval(this.ordInt);
    			this.subscription.unsubscribe();
	  		}
	  		if(this.orderDets.status >= 6 && this.orderDets.shopper_rated == 1){
				this.router.navigate(['/dropper/home']);
	  		}
		})
		.catch(err => {

		});
  	}

  	mapReady(){ }

  	setOrderItemStatus(id){
		var data = {
	  		order_detail_id: id
		};
		this.api.updateItemStatus(data)
		.then(resp => {
	  		this.getUpdatedOrderDetails();
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
	  		this.getUpdatedOrderDetails();
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
	  		this.getUpdatedOrderDetails();
		})
		.catch(err => {

		});
  	}
  
  	cancelOrder(rel=1){
  		if(this.cancModel.cancel_type){
			var data = this.cancModel;
			data['order_id'] = this.orderId;
			this.api.cancelOrder(data)
			.then(resp => {
		  		if(rel == 1){
					this.router.navigate(['/dropper/home']);
		  		}
			})
			.catch(err => {

			});
		}
	    else{
	      alert('Select a Reason to cancel');
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
		this.partnerEl.ontimeupdate = () => { this.setCallTime()};
		this.webRTC.init(this.userId, this.myEl, this.partnerEl);
  	}

  	call() {
  		const callSet = this.db.object('call'+this.orderId);
		callSet.set({ val: 0 });
  		this.showCallScreen = 1;
		this.webRTC.call(this.partnerId);
		this.listenToDisconnect();
  	}

  answerCall(){
    this.webRTC.answerCall();
	this.listenToDisconnect();

  }

  listenToDisconnect(){
    // this.prev_time = null;
    // var _myInterval = setInterval( () => {
    //     if(this.actTime > 0 && this.prev_time == this.actTime) {
    //         console.log("No change for 2 second", this.actTime)
    //         clearTimeout(_myInterval);
    //         this.webRTC.close();
    //         this.actTime = 0;this.prev_time = 0;
    //     } else {
    //         console.log("Value was changed between past 2 second prev: ", this.prev_time, " New: ", this.actTime)
    //         this.prev_time = this.actTime;
    //     }
    // }, 2000);
    this.itemRef = this.db.object('call'+this.orderId);
	this.itemRef.snapshotChanges().subscribe(action => {
		var data = action.payload.val();
		if(data.val == 0){

		}
		else if(data.val == 1){
			console.log("peer disconnected");
			this.callDisconnected();
		}
	});
  }


  	disconnectCall(){
    	this.webRTC.close();
		const CallSet = this.db.object('call'+this.orderId);
		CallSet.set({ val: 1 });
  	}

  	callDisconnected(){
  		this.webRTC.close();
  		const CallSet = this.db.object('call'+this.orderId);
		CallSet.set({ val: 0 });
		this.actTime = 0;
  	}

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
	      var filename = "";
	      // var filename = URL.createObjectURL(this.chatFile);
	    }
	    else{
	      fd.append('file', '');
	      var filename = "";
	    }
	    if(this.messages ==null){
	      this.messages = [];
	    }
	    this.messages.push({
			'to': 'shopper',
			'type': 1,
			'file': filename,
			'message': this.chatModel.message
		});
		// var data = this.chatModel;
		// data['to'] = this.partnerId;
		// data['order_id'] = this.orderId;
		this.api.sendMessage(fd)
		.then(resp =>{
			this.chatModel.message = "";
			this.chatFile = "";
			this.getMessages();
		})
		.catch(err => {

		});
  	}

  	onChange(files) {
	    this.chatFile = files[0];
	    this.sendMessage();
  	}

  	getMessages(){
		var data = {};
		data['order_id'] = this.orderId;
		this.api.getMessages(data)
		.then(resp =>{
	  		this.messages = resp.messages;
	  		console.log(this.messages);
		})
		.catch(err => {

		});
  	}

  	scrollToBottom(): void {
  		var messages = document.getElementById('scrollMe');
  		var scrHt = messages.scrollHeight+30;
    	messages.scrollTop = scrHt;
        // .scrollIntoView(false);                 
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
				// console.log("4");
				this.askToTurnOnGPS();
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
  	askToTurnOnGPS(){
		this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
		.then(() => {
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
		var lastUpdateTime, minFrequency = 5*1000;
		this.geolocation.getCurrentPosition(this.options)
		.then((resp) => {
			console.log('my loc');
	  		this.lat = resp.coords.latitude;
	  		this.lng = resp.coords.longitude;
	  		var apidata = { lat: this.lat, lon: this.lng};
			this.origin = { lat:apidata.lat, lng:apidata.lon };
			const itemRef = this.db.object('loc'+this.orderId);
			itemRef.set(apidata);
		})
		.catch((error) => {

		});
	
		var now;

		let watch = this.geolocation.watchPosition(this.options);
		this.subscription = watch.subscribe((data) => {
	  		if ("coords" in data) {
				var lat = data.coords.latitude;
				var lng = data.coords.longitude;
				var apidata = { lat: lat, lon: lng };
				now = new Date();
				if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
		  			return;
				}
				const itemRef = this.db.object('loc'+this.orderId);
				itemRef.set(apidata);
				this.origin = { lat:apidata.lat, lng:apidata.lon };
				this.distance(apidata.lat, apidata.lon, this.delLat, this.delLng);
				console.log('loc upd');
				lastUpdateTime = now;
  			} 
  			else {
				// ruh roh we have a PositionError
				console.log('error');
  			}
		});
  	}

  	distance(lat1, lon1, lat2, lon2) {
  		var p = 0.017453292519943295;    // Math.PI / 180
	  	var c = Math.cos;
	  	var a = 0.5 - c((lat2 - lat1) * p)/2 + 
	          c(lat1 * p) * c(lat2 * p) * 
	          (1 - c((lon2 - lon1) * p))/2;

	  	var dist = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	  	console.log(dist);
	  	if(dist < 0.05){
	  		this.showBtn = 1;
	  	}
	}

  	ionViewWillLeave(){
	    // alert('unsub');
	    // this.subscription.unsubscribe();
	    // clearInterval(this.shopInt);
  	}

  	ngOnDestroy(){
	    // alert('unsub');
	    // this.subscription.unsubscribe();
	    // clearInterval(this.shopInt);
  	}
}