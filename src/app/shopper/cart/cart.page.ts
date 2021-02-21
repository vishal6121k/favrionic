import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ApiService } from '../../services/api.service';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.page.html',
	styleUrls: ['./cart.page.scss'],
})
export class CartPage {
	selectedLoc:any = 0;
	locPop:any = 0;
	infoPop:any = 0;
	cartProd:any;
	cartLength:any = 0;
	cartTotalAmount = 0;
	delAmnt:any = "";
	payType:any = 0;
	payDrop:any = 0;
	loading:any;
	today:any;
	minDate:any;
	maxDate:any;
	order_date:any;
	showTime:any = "Today";
	showDate:any = "Select delivery slot";
	options : GeolocationOptions;
	currentPos : Geoposition;
	lat:any;
	lng:any;
	markLat:any;
	markLng:any;
	zoom:any = 18;
	backSub:any;
	addresses:any = "";
	selectedAddress:any = 0;
	
	location:any = "";
	landmark:any = "";
	loc_type:any = 3;
	formData:any = "";
	shopper_name:any = "";
	addressModel:any = {};
	address1:any;
	address2:any;
	slideOpts:any = {
		slidesPerView: 1,
		speed: 400,
		freeMode: true
	};
	map:any;
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
	constructor(private platform: Platform, private pagelocation: Location, private datePicker: DatePicker, private geolocation : Geolocation, private api: ApiService, private router: Router, public loadingController: LoadingController) {
		if(this.router.getCurrentNavigation().extras.state){
			if(this.router.getCurrentNavigation().extras.state.formVal != undefined){
				this.formData = this.router.getCurrentNavigation().extras.state.formVal;
				this.placeOrder();
			}
		}
	}

	ionViewDidEnter(){
		this.platform.ready().then(() => {
	      	if (this.platform.is('cordova')) {
	      		this.init();
	      		this.registerBackAction();
      		}
  		});
	}

	init(){
		this.locPop = 0;
		this.infoPop = 0;
		// var today = new Date();
		// var today1 = today;
		// // console.log(today);
		// // var minDate = today1.setHours(today1.getHours() + 1);
		// var minDate = new Date(today1.getTime() + 30*60*1000);
		// var maxDate = new Date(today1.getTime() + 24*60*60*1000);

		// this.today = today.toISOString();
		// this.minDate = new Date(minDate).toISOString();
		// this.maxDate = new Date(maxDate).toISOString();
		this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
		this.cartTotal();
		this.getUserAddress();
	}

	resetAllFields(){
		this.markLat = "";
		this.markLng = "";
		this.address1 = "";
		this.delAmnt = 0;
		this.landmark = "";
		this.order_date = "";
		this.cartTotalAmount = 0;
		this.payType = 0;
		this.shopper_name = "";
		// this.cartProd = {};
	}


	addProd(id, price, name){
		if(this.cartProd[id]){
			this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] + 1;
			this.cartProd[id]['unit_amount'] = price;
			this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
			this.cartProd[id]['name'] = name;
			this.cartProd[id]['product_id'] = id;
		}
		else{
			this.cartProd[id] = {};
			this.cartProd[id]['quantity'] = 1;
			this.cartProd[id]['unit_amount'] = price;
			this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
			this.cartProd[id]['name'] = name;
			this.cartProd[id]['product_id'] = id;
		}
		console.log(this.cartProd);
		this.cartTotal();
	}
	subProd(id){
		if(this.cartProd[id]['quantity'] > 1){
			this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] - 1;
		}
		else{
			delete this.cartProd[id];
		}
		console.log(this.cartProd);
		this.cartTotal();
	}


	cartTotal(){
		window.localStorage.setItem('cart', JSON.stringify(this.cartProd));
		this.cartLength = 0;
		this.cartTotalAmount = 0;

		for( var el in this.cartProd ) {
			if( this.cartProd.hasOwnProperty( el ) ) {
				this.cartLength += parseFloat( this.cartProd[el]['quantity'] );
				this.cartTotalAmount += parseFloat( this.cartProd[el]['total_amount'] );
			}
		}
		this.cartTotalAmount = Math.round(this.cartTotalAmount * 100) / 100;
	}

	addPrice(cartTotalAmount, delAmnt){
		var tot = cartTotalAmount + delAmnt;
		tot = Math.round(tot * 100) / 100;
		return tot;
	}

	showDatePicker(){
		var today = new Date();
		var today2 = new Date(today);
		// var minDate = today1.setHours(today1.getHours() + 1);
		var minDate = today.getTime();
		var maxDate = today.setDate(today.getDate() + 1);
		
		// var today2 = new Date(today);
		// console.log(today2);
		// var realMin = minDate.getTime();
		// var realMax = maxDate.getTime();
		// console.log(realMin);
		// console.log(minDate);
		
		this.datePicker.show({
			date: today2,
			mode: 'datetime',
			minDate: minDate,
			maxDate: maxDate,
			androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
		}).then( date => {
			console.log(date);
			var d = new Date(date);
			var finalDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
			this.showDate = d.getFullYear()+"/" + (d.getMonth()+1) + "/" + d.getDate();
			this.showTime = this.addDatePad(d.getHours())+":"+this.addDatePad(d.getMinutes());
			this.order_date = this.showDate+' '+this.showTime+":00";
			// this.order_date = finalDate;
		})
		.catch( err => {
			console.log('Error occurred while getting date: ', err)
		});
	}
	addDatePad(val){
		if(val < 10){
			val = "0"+val;
		}
		return val;
	}

	getUserPosition(){
		this.locPop = 1;
		this.options = {
				enableHighAccuracy : true
		};

		this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

				this.currentPos = pos;      
				console.log(pos);
				this.lat = pos.coords.latitude;
				this.markLat = pos.coords.latitude;
				this.markLng = pos.coords.longitude;
				this.lng = pos.coords.longitude;
				this.getAddress(this.markLat, this.markLng);
				this.map.panTo({'lat': this.markLat, 'lng': this.markLng});

		},(err : PositionError)=>{
				console.log("error : " + err.message);
		});
	}

	mapReady(map){
		this.map = map;
		console.log(this.map);
	}

	getAddress( lat: number, lng: number ) {
		console.log('Finding Address');
			if (navigator.geolocation) {
				let geocoder = new google.maps.Geocoder();
				let latlng = new google.maps.LatLng(lat, lng);
				let request = { 'location': latlng };
				geocoder.geocode(request, (results, status) => {
					if (status === google.maps.GeocoderStatus.OK) {
						// let result = results;
						// let rsltAdrComponent = result.address_components;
						// let resultLength = rsltAdrComponent.length;
						if (results != null) {
							this.address2 = results[1].formatted_address;
							this.address1 = "";
							// this.landmark = rsltAdrComponent[0].long_name;
							// this.address = rsltAdrComponent[resultLength - 8].short_name;
							// this.address = rsltAdrComponent[resultLength - 8].short_name;
							console.log(this.address1);
						} else {
							// alert('No address available!');
						}
					}
				});
		}
	}

	centerChange(event){
		// console.log(event.latLng.lat());

		this.markLat = event.latLng.lat();
		this.markLng = event.latLng.lng();

		this.getAddress( this.markLat, this.markLng );
	}



	placeOrder(){
		var data:any;
		if(this.formData!=""){
			data = JSON.parse(this.formData);
		}
		else{
			data = {
				'delivery_lat' : this.markLat,
				'delivery_lon' : this.markLng,
				'delivery_address' : this.address1,
				'delivery_pin' : 123,
				'delivery_charge': this.delAmnt,
				'delivery_landmark' : this.landmark,
				'shipment_timeslot' : this.order_date,
				'total_amount' : this.cartTotalAmount,
				'payment_type' : this.payType,
				'caller_name' : this.shopper_name,
				'caller_mobileno' : 1234,
				'order_details': this.cartProd
			};
		}

		if(data.delivery_lat == undefined || data.delivery_lat == "" || data.delivery_lon == undefined || data.delivery_lon == ""){
			alert('Please select address');
			return false;
		}

		if(data.delivery_address == undefined || data.delivery_address == ""){
			alert('Please select address');
			return false;
		}

		if(data.delivery_pin == undefined || data.delivery_pin == ""){
			alert('Please select address');
			return false;
		}

		if(data.delivery_charge == undefined || data.delivery_charge == 0 || data.delivery_charge == ""){
			alert('Please add delivery charge');
			return false;
		}

		if(data.shipment_timeslot == undefined || data.shipment_timeslot == ""){
			alert('Please add delivery time');
			return false;
		}

		if(data.payment_type == undefined || data.payment_type == 0){
			alert('Please select payment type');
			return false;
		}

		if(data.caller_name == undefined || data.caller_name == ""){
			alert('Please add Caller Details');
			return false;
		}

		var token = window.localStorage.getItem('token');
		if(!(window.localStorage.getItem('token'))) {
			this.router.navigate(['/login'], { state: { redirectAfterLogin: '/shopper/cart', formVal: JSON.stringify(data) } });
			return false;
		}

		this.presentLoading();

		this.api.placeOrder(data)
		.then( resp => {
				if(resp.status == 0){
					this.dismissLoading();
					this.router.navigate(['/shopper/favr']);
					return false;
				}
				this.cartProd = {};
				this.resetAllFields();
				window.localStorage.setItem('cart', JSON.stringify(this.cartProd));
				console.log(resp);
				this.dismissLoading();
				this.router.navigate(['/shopper/seldrop/'+resp.orderId]);
		})
		.catch( err => {
			console.log(err);
			alert('Something went wrong');
		});
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


	addAddress(){
		if(this.address1 == ""){
			alert('House number cannot be empty');
			return;
		}
		// if(this.landmark == ""){
		// 	alert('Landmark cannot be empty');
		// 	return;
		// }
		this.addressModel = {
			lat: this.markLat,
			lon: this.markLng,
			address1: this.address1,
			address2: this.address2,
			landmark: this.landmark,
			loc_type: this.selectedLoc
		};

		this.api.addAddress(this.addressModel)
		.then( resp => {
			this.selectedAddress = resp.id;
			this.locPop = 0;

		})
		.catch( err => {

		});

	}

	setAddress(address){
		this.selectedLoc = address.loc_type;
		this.markLat = address.lat;
		this.markLng = address.lon;
		this.address1 = address.address1;
		this.address2 = address.address2;
		this.landmark = address.landmark;
		this.selectedAddress = address.id;
		this.locPop = 0;
	}


	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...'
		});
		await this.loading.present();

		// const { role, data } = await this.loading.onDidDismiss();
		// this.locpop =0;
		// this.locClicked();
		// console.log('Loading dismissed!');
	}

	dismissLoading(){
		this.loading.dismiss();
	}

	registerBackAction(){
	    let a =0;
	    this.backSub = this.platform.backButton.subscribeWithPriority(9999, () => {
	      if(this.locPop == 1){
	        this.locPop = 0;
	      }
	      else if(this.infoPop == 1){
	        this.infoPop = 0;
	      }
	      else{
	      	this.router.navigate(['/shopper/home']);
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

	  ionViewWillLeave(){
	    this.backSub.unsubscribe();
	  }
	  ngOnDestroy(){
	    this.backSub.unsubscribe();
	  }


}
