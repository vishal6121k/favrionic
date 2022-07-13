import { Component, OnInit, OnDestroy } from '@angular/core';
import { google } from '@google/maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../../services/api.service';
import { NotifyService } from '../../services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Component({
	selector: 'app-start',
	templateUrl: './start.page.html',
	styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnDestroy {
	reqPop:any = 0;
	orderId:any;
	orderDets:any;
	showPage:any = 0;
	ordDetsInt:any;
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
	countDownTime:number = 60;
	min:any;
	sec:any;
	map:any;
	countTime:any;
	zoom:any = 14;
	deflat:any;
	deflng:any;
	options:any;
	lat:any;
	subscription:any;
	origin:any;
	destination:any;
	lng:any;
	shopperAnimation:any;
	showMap:any;
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
	constructor(private androidPermissions: AndroidPermissions, private geolocation: Geolocation,
	private locationAccuracy: LocationAccuracy, private api: ApiService, private notify: NotifyService, 
	private router: Router, private backgroundGeolocation: BackgroundGeolocation, 
	private firebase: FirebaseX,
	private route: ActivatedRoute) { }
	ionViewDidEnter() {
		this.reqPop = 0;
		this.route.params.subscribe(params => {
				this.orderId = params['id'];
				console.log(this.orderId);
				this.getOrderDetails();
				var config = JSON.parse(localStorage.getItem('config'));
				this.countDownTime = config.acceptance_time * 60;
				// this.initialiseState(); // reset and set based on new parameter this time
		});
	}

	addDels(c1,c2){
		var ch = parseFloat(c1) + parseFloat(c2);
		return Math.round(ch * 100) / 100;
	}


		getOrderDetails(){
			var data = {
				order_id: this.orderId
			};
			this.api.getOrderById(data)
			.then(resp => {
				console.log(resp);
				this.orderDets = resp[0];
				this.orderDets.total_amount = Math.round(this.orderDets.total_amount * 100) / 100;
				if(this.orderDets.status > 1){
					if(this.orderDets.status == 2 && this.orderDets.dropper_me == 1){
						// alert('Me Dropper');
						if(this.countTime){
							clearTimeout(this.countTime);
						}
						this.router.navigate(['/dropper/track/'+this.orderDets.id]);
					}
					else{
						if(this.countTime){
							clearTimeout(this.countTime);
						}
						alert('Order assigned to Other Dropper');
					}
				}
				this.checkGPSPermission();
				this.showPage = 1;
			})
			.catch(err => {

			});
		}
		waitForAccept(){
			var data = {
				order_id: this.orderId
			};

			this.api.acceptShopperOffer(data)
			.then(resp => {
				this.reqPop = 1;
				this.startCountdown();
				this.firebase.onMessageReceived()
				.subscribe(data => {
				    var messagebody = JSON.parse(data.message);
				    console.log(messagebody);
				    if(messagebody.type == 'order_update'){
				      this.getOrderDetails();
				    }
				    if(data.tap != undefined && !(window.location.pathname == '/'+messagebody.action_url)){
				      this.router.navigate(['/'+messagebody.action_url]);
				    }
				    else if(data.tap == undefined && !(window.location.pathname == '/'+messagebody.action_url)){
				      this.notify.notify(data);
				    }
				});
				// this.ordDetsInt = setInterval(()=>{
				//   if(this.orderDets.dropper_id != null){
				//     clearInterval(this.ordDetsInt);
				//     
				//   }
				//       // this.getOrderDetails();
				//   }, 2000);
			})
			.catch(err => {

			});
		}


		startCountdown(){
			// var count = this.countDownTime;
			this.min = Math.floor((this.countDownTime/60));
			this.sec = this.countDownTime % 60;
			if(this.min < 10){
				this.min = "0"+this.min;
			}
			if(this.sec < 10){
				this.sec = "0"+this.sec;
			}

			if(this.countDownTime == 0){
				var data = {
					'order_id' : this.orderId
				};
				this.api.removeDropperRequest(data)
				.then(resp => {
					if(resp.status == 1){
						alert('Sorry. The shoppper did not accept your request in the given time');
						this.router.navigate(['/dropper/home']);
					}
				})
				.catch(err => {

				});
				if(this.countTime){
					clearTimeout(this.countTime);
				}
				return;
			}
			this.countTime = setTimeout(()=>{
				this.countDownTime = this.countDownTime - 1;
				this.startCountdown();
			}, 1000)
		}

		acceptShopperOffer(order_id){
			
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
			}
		);
	}
	requestGPSPermission() {
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if (canRequest) {
				// console.log("4");
			} else {
				//Show 'GPS Permission Request' dialogue
				this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
					.then(
						() => {
							// call method to turn on GPS
							this.askToTurnOnGPS();
						},
						error => {
							//Show alert if user click on 'No Thanks'
							alert('requestPermission Error requesting location permissions ' + error)
						}
					);
			}
		});
	}
	askToTurnOnGPS() {
		this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
			() => {
				// When GPS Turned ON call method to get Accurate location coordinates
				this.getLocation()
			},
			error => alert('Error requesting location permissions ' + JSON.stringify(error))
		);
	}
	centerChanged(event){
		// console.log('center change');
		// this.deflat = event.lat;
		// this.deflng = event.lng;
	}


	setCenter(){
		console.log('center');
		this.deflat = parseFloat(this.orderDets.delivery_lat);
		this.deflng = parseFloat(this.orderDets.delivery_lon);
		this.map.panTo({ 'lat': this.deflat, 'lng': this.deflng });
	}

	getLocation(){
		this.options = {
				enableHighAccuracy : true
		};

		var lastUpdateTime, minFrequency = 20*1000;

		this.geolocation.getCurrentPosition(this.options).then((resp) => {
			this.lat = resp.coords.latitude;
			this.lng = resp.coords.longitude;
			this.deflat = resp.coords.latitude;
			this.deflng = resp.coords.longitude;
			this.shopperAnimation = "BOUNCE";
			this.origin = { lat: this.lat, lng: this.lng };
			this.destination = { lat: parseFloat(this.orderDets.delivery_lat), lng: parseFloat(this.orderDets.delivery_lon) };
			// console.log('abc');
			this.showMap = 1;
			setTimeout(()=>{
				this.shopperAnimation = null;
			}, 2000);
			// console.log(resp.coords.latitude);
		}).catch((error) => {
			// console.log('Error getting location', error);
		});

		// let watch = this.geolocation.watchPosition(this.options);
		// this.subscription = watch.subscribe((data) => {
			

		//   // console.log('getting location');
		//   if ("coords" in data) {
		//     // console.log(data.coords);
		//     this.lat = data.coords.latitude
		//     this.lng = data.coords.longitude
		//     var apidata = {
		//       'lat': this.lat,
		//       'lon': this.lng
		//     };

		//     now = new Date();
		//     if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
		//       // console.log("Ignoring position update");
		//       return;
		//     }
		//     lastUpdateTime = now;
		//     this.api.addUserPolling(apidata)
		//     .then(resp => {
		//       // console.log('abc');
		//       // this.firebase.onMessageReceived()
		//       // .subscribe(data => {
		//       //   console.log(data)
		//       //   var messagebody = data.body;
		//       //   if(messagebody.type == )
		//       //   this.getShopperRequests();
		//       // });
		//       // this.shopInt = setInterval(()=>{
		//       //   this.getShopperRequests();
		//       // }, 60000);
		//     })
		//     .catch(err => {

		//     });

		//   } else {

		//   }
		// });
	}

	roundOff(num){
		return Math.round(num * 100) / 100;
	}

	mapReady(map){
		this.map = map;
	}

	ionViewWillLeave(){
		// alert('unsub');
		// this.subscription.unsubscribe();
		if(this.countTime){
			clearTimeout(this.countTime);
		}
		// clearInterval(this.shopInt);
	}
	ngOnDestroy(){
		// this.subscription.unsubscribe();
		if(this.countTime){
			clearTimeout(this.countTime);
		}
	}

}
