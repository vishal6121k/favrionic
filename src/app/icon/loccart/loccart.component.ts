import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MiscService } from '../../services/misc.service';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Platform, LoadingController } from '@ionic/angular';
declare var google:any;
@Component({
	selector: 'app-loccart',
	templateUrl: './loccart.component.html',
	styleUrls: ['./loccart.component.scss'],
})
export class LoccartComponent implements OnInit {
	@Input() show:any;
	@Input() cart:any = 0;
	options:any;
	loading:any;
	userDets:any = "";
	address2:any = 'Getting user location';
	@Output() searchBtnClicked:EventEmitter<string> = new EventEmitter<string>();
	@Output() locBtnClicked:EventEmitter<string> = new EventEmitter<string>();
	addresses:any;
	locpop:any = 0;
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
	constructor(private platform: Platform, private misc: MiscService, private api: ApiService, private geolocation : Geolocation, public loadingController: LoadingController) { }

	ngOnInit(){
		this.init();
	}

	ionViewDidEnter(){
		this.init();
	}

	init() {
		console.log('loccart');
		this.platform.ready().then(() => {
			this.getLocations();
		});
		this.getUserDetails();
	}

	getLocations(){
		if(this.show == 0 || this.show == 1){
			console.log('abc');
			this.misc.getAllPermissions();
			this.getUserAddress();
			this.getUserPosition();
		}
	}


	getUserDetails(){
		this.api.getUserDetails()
		.then(resp => {
			this.userDets = resp;
		})
		.catch(err => {

		});
	}

	searchClicked(){
		this.searchBtnClicked.emit('1');
	}

	locClicked(){
		this.locBtnClicked.emit(this.locpop);
	}

	getUserAddress(){
		var data = {
			limit: 1000,
			offset: 0
		};
		this.api.getAddress(data)
		.then( resp => {
			this.addresses = resp;
		})
		.catch( err => {

		});
	}

	getUserPosition(clicked = 0){
		this.options = {
				enableHighAccuracy : true
		};
		if(clicked == 1){
			this.presentLoading();
		}

		this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
			var lat = pos.coords.latitude;
			var lng = pos.coords.longitude;
			this.getAddress(lat, lng, clicked);
		},(err : PositionError)=>{
				console.log("error : " + err.message);
		});
	}

	getAddress( lat: number, lng: number, clicked ) {
			
		console.log('Finding Address');
		if (navigator.geolocation) {
			let geocoder = new google.maps.Geocoder();
			let latlng = new google.maps.LatLng(lat, lng);
			let request = { 'location': latlng };
			geocoder.geocode(request, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					if (results != null) {
						this.address2 = results[1].formatted_address;
						this.locpop = 0;
						if(clicked == 1){
							this.dismissLoading();
						}
						this.locClicked();
					} else {
						// alert('No address available!');
					}
				}
			});
		}
	}


	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...'
		});
		await this.loading.present();

		const { role, data } = await this.loading.onDidDismiss();
		this.locpop =0;
		this.locClicked();
		console.log('Loading dismissed!');
	}

	dismissLoading(){
		this.loading.dismiss();
	}


} 
