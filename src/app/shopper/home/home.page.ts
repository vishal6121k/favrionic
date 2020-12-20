import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	slideOpts:any = {
		slidesPerView: 4,
	    speed: 400,
	    freeMode: true
  	};
  	subcatSlideOpts:any = {
		slidesPerView: 3,
	    initialSlide: 0,
	    speed: 400,
	    freeMode: true
  	};
  	prodSlideOpts:any = {
		slidesPerView: 3,
	    initialSlide: 0,
	    speed: 400,
	    freeMode: true
  	};
  	cat_id:any = 0;

  	cartProd:any = {};
    favPrd:any = {};
	  cartLength:any = 0;
  constructor() { }

  ngOnInit() {
  }

  selectCategory(){
  	this.cat_id = 1;
  }

  addProd(id){
  	if(this.cartProd[id]){
  		this.cartProd[id] = this.cartProd[id] + 1;
  	}
  	else{
  		this.cartProd[id] = 1;
  	}
  	console.log(this.cartProd);
  	this.cartTotal();
  }
  subProd(id){
  	if(this.cartProd[id] > 1){
  		this.cartProd[id] = this.cartProd[id] - 1;
  	}
  	else{
  		delete this.cartProd[id];
  	}
  	console.log(this.cartProd);
  	this.cartTotal();
  }

  favProd(id){
    if(this.favPrd[id]){
      delete this.favPrd[id];
    }
    else{
      this.favPrd[id] = 1;
    }
    console.log(this.favPrd);
  }


  cartTotal(){
  	this.cartLength = 0;
  	for( var el in this.cartProd ) {
	    if( this.cartProd.hasOwnProperty( el ) ) {
	      this.cartLength += parseFloat( this.cartProd[el] );
	    }
  	}
  }

}
