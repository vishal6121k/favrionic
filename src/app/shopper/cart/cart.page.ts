import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ApiService } from '../../services/api.service';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
	selectedLoc:any = 0;
	locPop:any = 0;
	infoPop:any = 0;
	cartProd:any;
	cartLength:any = 0;
	cartTotalAmount = 0;
	delAmnt:any = 0;
	payType:any = 0;
	payDrop:any = 0;
  loading:any;
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
  ProdImgUrl:any = "http://favr.coderpanda.tk/uploads/";
  constructor(private datePicker: DatePicker, private geolocation : Geolocation, private api: ApiService, private router: Router, public loadingController: LoadingController) {
    if(this.router.getCurrentNavigation().extras.state){
      if(this.router.getCurrentNavigation().extras.state.formVal != undefined){
        this.formData = this.router.getCurrentNavigation().extras.state.formVal;
        this.placeOrder();
      }
    }
  }

  ngOnInit(){
  	this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
    this.cartTotal();
    this.getUserAddress();
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
        this.cartTotalAmount = Math.round(this.cartTotalAmount * 100) / 100;
	    }
  	}
  }

  showDatePicker(){
    var today = new Date();
    var minDate = today.setHours(today.getHours() + 4);
  	this.datePicker.show({
	  	date: today,
	  	mode: 'time',
      minDate: minDate,
      maxDate: new Date(),
	  	androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then( date => {
        // console.log(date);
        var d = new Date(date);
        var finalDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
        this.order_date = finalDate;
        this.showDate = d.getDate()+"/" + (d.getMonth()+1) + "/" + d.getFullYear();
        this.showTime = d.getHours()+":"+d.getMinutes();
        console.log('Got date: ', finalDate);
      })
      .catch( err => {
        console.log('Error occurred while getting date: ', err)
      });
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

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
  }

  mapReady(){
    this.getAddress(this.markLat, this.markLng);
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
    console.log(event);
    this.markLat = event.lat;
    this.markLng = event.lng;

    this.getAddress( this.markLat, this.markLng );
  }



  placeOrder(){
    this.presentLoading();
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

    var token = window.localStorage.getItem('token');
    if(!(window.localStorage.getItem('token'))) {
      this.router.navigate(['/login'], { state: { redirectAfterLogin: '/shopper/cart', formVal: JSON.stringify(data) } });
      return false;
    }

    this.api.placeOrder(data)
    .then( resp => {
        window.localStorage.removeItem('cart');
        console.log(resp);
        this.dismissLoading();
        this.router.navigate(['/shopper/seldrop/'+resp.orderId]);
    })
    .catch( err => {

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


}
