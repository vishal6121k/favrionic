import { Component, OnInit, OnDestroy } from '@angular/core';
import { google } from '@google/maps';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Platform } from '@ionic/angular';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

declare var google:any;
declare var navigator: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
	notePop:any = 0;
	dropPop:any = 0;
	defDist:any = 5;
	map:any;
	backSub:any;
	showPage:any = 0;
	lat:any = 51.678418;
	lng:any = 7.809007;
	deflat:any = 51.678418;
	deflng:any = 7.809007;
	shopInt:any;
	showNote:any = 1;
	zoom = 12;
	infoPop:any=0;
	watchId:any;
	radius:any;
	address2:any = "Getting location. Please wait..";
	shopperReq:any = [];
	orderDets:any;
	subscription:any;
	options:any;
	saveLocation:any = true;
	showMap:any = 0;
	shopperAnimation:any;
	site_config:any;
	noteCount:any = 0;
	selectedShopper:any = 0;
	shopperPopInfo:any = {};
	onOrder:any;
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
	constructor(private androidPermissions: AndroidPermissions, private geolocation: Geolocation,
	private locationAccuracy: LocationAccuracy,
	private platform: Platform,
	private api: ApiService, 
	private router: Router,
	private firebase: FirebaseX
	) { }

	ionViewWillEnter(){
		console.log('will enter');
		// this.shopperReq = [];
		// this.notePop = 0;
		// this.dropPop = 0;
		// this.showMap = 0;
		// this.showPage = 0;
		// this.site_config = JSON.parse(window.localStorage.getItem('config'));
		// console.log(this.site_config);
		// this.radius = this.site_config.def_min_drop_radius;
		// this.platform.ready().then(() => {
		// 	this.init();
		// 	this.registerBackAction();
		// })
	}
	// ngOnInit(){
	// 	this.site_config = JSON.parse(window.localStorage.getItem('config'));
	// 	console.log(this.site_config);
	// 	this.radius = this.site_config.def_min_drop_radius;
	// 	// this.firebase.onMessageReceived()
	// 	// .subscribe(data => {
	// 	//   	console.log(data);
	// 	//   	var messagebody = JSON.parse(data.message);;
	// 	//   	if(messagebody.type == "new_order"){
	// 	//   		this.getShopperRequests();
	// 	//   	}

	// 	// });
	// 	this.platform.ready().then(() => {
	// 		if (this.platform.is('cordova')) {
	// 			this.registerBackAction();
	// 			this.init();
	// 		}
	// 	})
	// }
	ionViewDidEnter() {
		this.shopperReq = [];
		this.notePop = 0;
		this.dropPop = 0;
		this.showMap = 0;
		this.showPage = 0;
		this.site_config = JSON.parse(window.localStorage.getItem('config'));
		console.log(this.site_config);
		this.radius = this.site_config.def_min_drop_radius;
		this.platform.ready().then(() => {
			this.init();
			this.registerBackAction();
		})
	}

	init(){
		console.log('init');
		this.checkGPSPermission();
		this.notePop= 0;
		this.dropPop= 0;
		// alert('entered');
		var last_notify;
		if(last_notify = window.localStorage.getItem('last_notified')){ 

			var endTime = new Date();
			var startTime = new Date(last_notify);
			var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
			var resultInMinutes = Math.round(difference / 60000);
			console.log(resultInMinutes);
			var minInDays = 24*60;
			if(resultInMinutes > minInDays){
				this.showNote = 1;
			}
			else{
				this.showNote = 0;
			}
		}
		else{
			this.showNote = 1;
		}

	}



	notifyForOrder(){
		this.api.notifyForOrder()
		.then(resp => {
			if(resp.status == 0){
				alert('No shopper served till now.');
			}
			else{
				window.localStorage.setItem('last_notified', (new Date()).toString());
				this.noteCount = resp.count;
				this.notePop = 1;
				this.showNote = 0;
			}
			// console.log(resp);
			// this.shopperReq = resp.shopperlist;
		})
		.catch(err => {

		});
	}

	centerChange(){

	}

	getShopperRequests(){
		var data = {
			'radius': this.defDist
		};
		this.api.getShopperRequests(data)
		.then(resp => {
			// console.log(resp);
			if(resp.status == -1){
				this.onOrder = {
					'status': 0,
					'order_id': resp.order_id
				};
			}
			else{
				this.onOrder = {
					'status': 1
				};
			}

			console.log(this.onOrder);
			this.shopperReq = resp.shopperlist;
			for (let [key, value] of Object.entries(this.shopperReq)) {
			  this.shopperReq[key]['dist'] = this.distance(value['order_lat'], value['order_lon'], this.lat, this.lng);
			}
			this.showPage = 1;
			this.showMap = 1;
		})
		.catch(err => {

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
	  	return this.roundOff(dist);
	}

	
	mapReady(map){
		this.map = map;
		this.radius = this.defDist * 1000;
	}


	viewOrderDetails(order_id){
		this.selectedShopper = order_id;
		
		var data = {
			order_id: order_id
		};
		
		this.api.getOrderById(data)
		.then(resp => {
			// console.log(resp);
			this.orderDets = resp[0];
			this.orderDets.delivery_charge = parseFloat(this.orderDets.delivery_charge);
			this.orderDets.total_amount = parseFloat(this.orderDets.total_amount);
			this.dropPop = 1;
			// this.shopperReq = resp.shopperlist;
		})
		.catch(err => {

		});
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


	// centerChanged(event){
	// 	this.deflat = event.lat;
	// 	this.deflng = event.lng;
	// }


	setCenter(){
		this.geolocation.getCurrentPosition(this.options).then((resp) => {
			this.deflat = resp.coords.latitude;
			this.deflng = resp.coords.longitude;
			this.map.panTo({ 'lat': this.deflat, 'lng': this.deflng });
		})
		.catch((error) => {
			// console.log('Error getting location', error);
		});;
	}

	getAddress( lat: number, lng: number ) {
			
		console.log('Finding Address');
			if (navigator.geolocation) {
				let geocoder = new google.maps.Geocoder();
				let latlng = new google.maps.LatLng(lat, lng);
				let request = { 'location': latlng };
				geocoder.geocode(request, (results, status) => {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results != null) {
							this.address2 = results[1].formatted_address;
						} else {
							// alert('No address available!');
						}
					}
				});
		}
	}


	showShopperInfo(shopper){
		console.log(shopper);
	    this.shopperPopInfo = {
	      'avg_rating': shopper.ratings[0].avg_rating,
	      'all_ratings': shopper.ratings[0].all_ratings,
	      'first_name': shopper.first_name,
	      'last_name': shopper.last_name,
	      'image_url': shopper.image_url,
	    };
	    console.log(this.shopperPopInfo);
	    this.infoPop = 1;
	  }


	roundOff(num){
		return Math.round(num * 100) / 100;
	}

	getLocation(){
		// console.log("getting location");
		this.options = {
				enableHighAccuracy : true,
				maximumAge: 120*1000
		};

		var lastUpdateTime, minFrequency = 60*1000;

		this.geolocation.getCurrentPosition(this.options).then((resp) => {
			this.lat = resp.coords.latitude;
			this.lng = resp.coords.longitude;
			this.deflat = resp.coords.latitude;
			this.deflng = resp.coords.longitude;
			// this.shopperAnimation = "BOUNCE";
			// console.log('abc');

			// setTimeout(()=>{
			// 	this.shopperAnimation = null;
			// }, 2000);
			this.getAddress(this.lat, this.lng);
			this.getShopperRequests();
			this.firebase.onMessageReceived()
			.subscribe(data => {
			  	console.log(data);
			  	var messagebody = JSON.parse(data.message);;
			  	if(messagebody.type == "new_order"){
			  		this.getShopperRequests();
			  	}

			});
			// console.log(resp.coords.latitude);
		}).catch((error) => {
			// console.log('Error getting location', error);
		});


		let now;

		this.watchId = navigator.geolocation.watchPosition(data => {

			now = new Date().getTime();

			if(lastUpdateTime && ((now - lastUpdateTime) < minFrequency)){
				console.log("Ignoring position update");
				return false;
			}

			lastUpdateTime = now;
			

			console.log('getting location');
			if ("coords" in data) {
				// console.log(data.coords.latitude+" "+data.coords.longitude);
				this.lat = data.coords.latitude
				this.lng = data.coords.longitude
				var apidata = {
					'lat': this.lat,
					'lon': this.lng
				};

				this.api.addUserPolling(apidata)
				.then(resp => {
					console.log('add loc');
					this.saveLocation = false;
					this.getShopperRequests();
					this.getAddress(this.lat, this.lng);
				})
				.catch(err => {

				});

			} else {
				// ruh roh we have a PositionError
				// console.log('error');
			}
		});
	}

	acceptShopperOffer(order_id){
		var data = {
			order_id: order_id
		};

		this.api.acceptShopperOffer(data)
		.then(resp => {
			// console.log(resp);
			this.router.navigate(['/dropper/start/'+resp.order_id]);
			// routerLink="/dropper/start"
		})
		.catch(err => {

		});
	}

	ionViewDidLeave(){
		this.shopperReq = [];
		this.notePop = 0;
		this.dropPop = 0;
		this.showMap = 0;
		this.showPage = 0;
		// alert('unsub');
		this.backSub.unsubscribe();
		navigator.geolocation.clearWatch(this.watchId);
		// clearInterval(this.shopInt);
	}

	registerBackAction(){
	    let a =0;
	    this.backSub = this.platform.backButton.subscribeWithPriority(9999, () => {
	      if(this.notePop == 1){
	        this.notePop = 0;
	      }
	      else if(this.dropPop == 1){
	        this.dropPop = 0;
	      }
	      else{
	      	this.router.navigate(['/choose']);
	      }
	      // else{
	      //   a++;
	      //   if(a == 1){
	      //     //         this.toast.show('Press back again to exit..', '2000', 'bottom').subscribe(
	      //     //     toast => {
	      //     //       console.log(toast);
	      //     //     }
	      //     // );
	      //   }
	      //   if (a == 2) { // logic for double tap
	      //     navigator['app'].exitApp();
	      //   }
	      // }
	    });
  	}
  	ngOnDestroy(){
		this.shopperReq = [];
		this.notePop = 0;
		this.dropPop = 0;
		this.showMap = 0;
		this.showPage = 0;
  		// alert('unsub');
		navigator.geolocation.clearWatch(this.watchId);
	    this.backSub.unsubscribe();
  	}

	changeDist(event){
		this.defDist = event.detail.value;
		this.radius = this.defDist * 1000;
	}

}
