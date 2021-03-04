import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MiscService } from '../services/misc.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage {
	cartProd:any;
	cartLength:any;
	allProds:any;
	userDets:any;
	userSaved:any;
	showPage:any = 0;
  ProdImgUrl:any = "http://admin.favr.ie/uploads/";
  constructor(private api:ApiService, private misc:MiscService) { }

  ionViewDidEnter() {
  	this.getUserDetails();
  	if(window.localStorage.getItem('cart')){
      this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
      this.cartTotal();
    }
  }

  clearCart(){
    this.cartProd = {};
    this.cartTotal();
  }

  getUserDetails() {
    console.log('hey');
      this.userDets = this.misc.getUserDets();
      this.userSaved = (this.userDets).saved_items.split(',');
      this.showAllProds();
      // this.api.getUserDetails()
      //     .then(resp => {
      //     this.userDets = resp;
      //     this.userSaved = resp.saved_items.split(',');
      //     this.showAllProds();
      // })
      //     .catch(err => {
      // });
  }

  showAllProds(){
    var data = {
      offset: 0,
      limit: 100,
      showAll: 1
    };
    this.api.getSavedItems(data)
    .then( resp => {
       this.allProds = resp;
       this.showPage = 1;
    })
    .catch( err => {

    });
  }

  saveUserProduct(product_id){
    var data = {
      'product_id': product_id
    };
    this.api.saveUserProduct(data)
    .then( resp => {

      this.userSaved = resp.user_saved_prod.split(',');
      this.showAllProds();
       // this.subcats = resp;
       // this.showLoad = 0;
       // console.log(resp);
    })
    .catch( err => {

    });
  }

  addProd(id, price, name, image_url){
  	if(this.cartProd[id]){
      this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] + 1;
      this.cartProd[id]['unit_amount'] = price;
      this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
      this.cartProd[id]['name'] = name;
      this.cartProd[id]['image_url'] = image_url;
  		this.cartProd[id]['product_id'] = id;
  	}
  	else{
      this.cartProd[id] = {};
  		this.cartProd[id]['quantity'] = 1;
      this.cartProd[id]['unit_amount'] = price;
      this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
      this.cartProd[id]['name'] = name;
      this.cartProd[id]['image_url'] = image_url;
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
  	for( var el in this.cartProd ) {
	    if( this.cartProd.hasOwnProperty( el ) ) {
	      this.cartLength += parseFloat( this.cartProd[el]['quantity'] );
	    }
  	}
  }

}
