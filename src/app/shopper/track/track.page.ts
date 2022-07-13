import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NotifyService } from '../../services/notify.service';
import { WebrtcService } from '../../providers/webrtc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
	selector: 'app-track',
	templateUrl: './track.page.html',
	styleUrls: ['./track.page.scss'],
})
export class TrackPage {
	cancPop:any = 0;
	cancRes:any = 0;
	itemPur:any;
	chatOpen:any = 0;
	orderId:any;
	cancPopCont:any = 0;
	orderDets:any;
	itemPurch:any=0;
	showPage:any = 0;
	lat:any;
	lng:any;
	delLat:any;
	delLng:any;
	zoom:any = 16;
	prev_time:any = 0;
	actTime:any = 0;
	origin:any;
	ordInt:any;
	chatFile:any = "";
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
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
	destination:any;
	ratePop:any = 0;
	purchasedPopup:any = 0;
	rateModel:any = {};
	cancModel:any = {};
	blockModel:any = {};
	userId: any;
	partnerId: any;
	myEl: HTMLMediaElement;
	partnerEl: HTMLMediaElement;
	webrtc_enb:any = 0;
	chatModel:any = {
		message:""
	};
	messages:any = [];
	comm:any;

	callTime:any;

	loc:Observable<any>;
	itemRef: AngularFireObject<any>;

	// call:Observable<any>;
	callRef: AngularFireObject<any>;

	constructor(private platform: Platform, private route: ActivatedRoute, private api: ApiService, private notify: NotifyService, private router: Router, public webRTC: WebrtcService,
		public elRef: ElementRef, private androidPermissions: AndroidPermissions,private nativeAudio: NativeAudio, 
		private firebase: FirebaseX,
		private db: AngularFireDatabase,
		private _ngZone: NgZone) {
		this.comm = this.webRTC.comm;
		}
	
	ionViewDidEnter() {
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
		this.ratePop = 0;
		this.cancPop = 0;
  		this.origin = { lat:0, lng:0 };
  		this.destination = { lat:0, lng:0 };

		this.route.params.subscribe(params => {
			this.nativeAudio.preloadComplex('231321321310', 'assets/sounds/note.mp3', 1, 1, 0).then(resp => {
			} , err => {console.log(err);});
				this.orderId = params['id'];
				this.itemRef = this.db.object('loc'+this.orderId);
				
				this.itemRef.snapshotChanges().subscribe(action => {
					var data = action.payload.val();
					if(data){
						this.origin = { lat: parseFloat(data.lat), lng: parseFloat(data.lon) };
						console.log(this.origin);
					}
				});
				
				console.log(this.orderId);
				this.getOrderDetails();
				this.getMessages();
				// this.ordInt = setInterval(() => {
				//   this.getOrderDetails();
				// }, 20000);
				this.firebase.onMessageReceived()
				.subscribe(data => {

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
				// this.initialiseState(); // reset and set based on new parameter this time
		});
	}


	getOrderDetails(){
		var data = {
			order_id: this.orderId
		};
		this.api.getOrderById(data)
		.then(resp => {
			console.log(resp);
			this.orderDets = resp[0];
			this.getItemPurchaseDets();
			this.lat = parseFloat(resp[0].dropper.current_loc[0].lat);
			this.lng = parseFloat(resp[0].dropper.current_loc[0].lon);
			this.origin = { lat: parseFloat(this.lat), lng: parseFloat(this.lng) };
			this.delLat = parseFloat(resp[0].delivery_lat);
			this.delLng = parseFloat(resp[0].delivery_lon);
			// this.orderId = params['id'];

			this.destination = { lat: this.delLat, lng: this.delLng };
			if(this.webrtc_enb == 0){
				this.userId = resp[0].user_id;
				this.partnerId = resp[0].dropper_id;
				this.init();
				this.webrtc_enb = 1;
			}
			this.showPage = 1;
			if(this.orderDets.status == 6){
				this.ratePop = 1;
				// clearInterval(this.ordInt);
			}
			if((this.orderDets.status >= 6 && this.orderDets.dropper_rated == 1) || (this.orderDets.status == 7)) {
				// clearInterval(this.ordInt);
				this.router.navigate(['/shopper/home']);
			}
			// this.shopperReq = resp.shopperlist;
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
			this.getItemPurchaseDets();
			if(this.orderDets.status == 6){
				this.ratePop = 1;
			}
			if((this.orderDets.status >= 6 && this.orderDets.dropper_rated == 1) || (this.orderDets.status == 7)) {
				// clearInterval(this.ordInt);
				this.router.navigate(['/shopper/home']);
			}
		})
		.catch(err => {

		});
	}

	getItemPurchaseDets(){
		var items = this.orderDets.orderDetails;
		this.itemPurch = 0;
		for (let [key, value] of Object.entries(items)) {
			if(value['status'] == 2){
				console.log('purchased');
		  		this.itemPurch = 1;
	  		}
		}
	}

	mapReady(){

	}

	cancelOrder(rel=1){
		if(this.cancModel.cancel_type){
			var data = this.cancModel;
			data['order_id'] = this.orderId;
			console.log(data);
			this.api.cancelOrder(data)
			.then(resp => {
				if(rel == 1)
					this.router.navigate(['/shopper/home']);
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
			reported_user_id: this.orderDets.dropper.id,
			reason: this.blockModel.reason
		};

		this.api.blockUser(data)
		.then(resp => {
			this.router.navigate(['/shopper/home']);
		})
		.catch(err => {

		});
	}

	saveRating(){
		// if(this.rateModel.)
		var data = this.rateModel;
		data['order_id'] = this.orderId;
		console.log(data);
		this.api.saveDropperRating(data)
		.then(resp => {
			this.router.navigate(['/shopper/home']);
		})
		.catch(err => {

		});
	}


	init() {
		this.myEl = this.elRef.nativeElement.querySelector('#myVideo');
		this.partnerEl = this.elRef.nativeElement.querySelector('#partnerVideo');

		this.webRTC.init(this.userId, this.myEl, this.partnerEl);
		this.partnerEl.ontimeupdate = () => { this.setCallTime()};
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

	call() {
		const callSet = this.db.object('call'+this.orderId);
		callSet.set({ val: 0 });
		this.webRTC.call(this.partnerId);
		console.log('callTo'+this.partnerId);
		this.listenToDisconnect();
		// this.swapVideo('my-video');
	}

	answerCall(){
		this.webRTC.answerCall();
		this.listenToDisconnect();
	}

	listenToDisconnect(){

		this.callRef = this.db.object('call'+this.orderId);
		this.callRef.snapshotChanges().subscribe(action => {
			var data = action.payload.val();
			if(data.val == 0){

			}
			else if(data.val == 1){
				this.callDisconnected();
			}
		});

		// var someValue = 1
		// this.prev_time = 0;
		// var _myInterval = setInterval( () => {
		// 		if(this.actTime > 0 && this.prev_time == this.actTime) {
		// 				console.log("No change for 2 second", this.actTime)
		// 				clearTimeout(_myInterval);
		// 				this.webRTC.close();
		// 				this.actTime = 0; this.prev_time = 0;
		// 		} else {
		// 				console.log("Value was changed between past 2 second prev: ", this.prev_time, " New: ", this.actTime)
		// 				this.prev_time = this.actTime;
		// 		}
		// }, 2000);
	}

	disconnectCall(){
    	this.webRTC.close();
		const callSet = this.db.object('call'+this.orderId);
		callSet.set({ val: 1 });
  	}
	callDisconnected(){
  		this.webRTC.close();
  		const callSet = this.db.object('call'+this.orderId);
		callSet.set({ val: 0 });
  		this.actTime = 0;
  	}

	sendMessage(){
		// var data = this.chatModel;
		// data['to'] = 'dropper';
		// data['order_id'] = this.orderId;
		if(this.chatModel.message == "" && this.chatFile == ""){
			alert('Message cannot be empty');
			return;
		}
		let fd= new FormData();
		fd.append('to', 'dropper');
		fd.append('order_id', this.orderId);
		fd.append('message', this.chatModel.message);
		if(!(this.chatFile == "")){
			fd.append('file', this.chatFile);
		}
		else{
			fd.append('file', '');
		}
		//   axios.post('/upload-image', fd)
		//     .then(resp => {
		//        this.imagePath = resp.data.path
		//     })
		// }
		//   data['file'] = this.chatFile;
		// }
		if(this.messages ==null){
			this.messages = [];
		}
		this.messages.push({
				'to': 'dropper',
				'file': "",
				'message': this.chatModel.message
		});
		console.log(fd);
		this.api.sendMessage(fd)
		.then(resp =>{
			this.chatModel.message = "";
			this.chatFile = "";
			this.getMessages();
		})
		.catch(err => {

		});
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
		var messages = document.getElementById('scrollMe');
		var scrHt = messages.scrollHeight+30;
		messages.scrollTop = scrHt;   
	}

	onChange(files) {
		this.chatFile = files[0];
	    this.sendMessage();
	}




}
