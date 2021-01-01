import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
    subcat_id:any = 0;
    cats:any;
  	cartProd:any = {};
    favPrd:any = {};
	  cartLength:any = 0;
    showLoad:any = 1;
    popProds:any;
    reccProds:any;
    allProds:any;
    subcats:any;
    ProdImgUrl:any = "http://favr.coderpanda.tk/uploads/";
  constructor(private api: ApiService) { }

  ngOnInit(){
    console.log('HomePage: ngOnInit')
    this.getAllCategories();
    this.getPopularProds();
    if(window.localStorage.getItem('cart')){
      this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
      this.cartTotal();
    }
  }


  getAllCategories(){
    var data = {
      offset: 0,
      limit: 100
    };
    this.api.getAllCats(data)
    .then( resp => {
       this.cats = resp;
    })
    .catch( err => {

    });
  }

  getPopularProds(){
    var data = {
      offset: 0,
      limit: 100
    };
    this.api.getPopularProds(data)
    .then( resp => {
       this.popProds = resp;
       this.getReccProds();
    })
    .catch( err => {

    });
  }

  getReccProds(){
    var data = {
      offset: 0,
      limit: 100
    };
    this.api.getReccProds(data)
    .then( resp => {
        this.showLoad = 0
        this.reccProds = resp;
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
       // this.subcats = resp;
       // this.showLoad = 0;
       // console.log(resp);
    })
    .catch( err => {

    });
  }

  selectCategory(cat_id){
  	this.cat_id = cat_id;
    this.subcat_id = 0;
    var data = {
      categoryId: this.cat_id,
      offset: 0,
      limit: 100
    };

    this.allProds = [];
    this.subcats = [];
    this.showLoad = 1;

    this.api.getSubcatByCat(data)
    .then( resp => {
       this.subcats = resp;
       // this.showLoad = 0;
       // console.log(resp);
    })
    .catch( err => {

    });

    this.api.getAllProductByCategory(data)
    .then( resp => {
       this.allProds = resp;
       this.showLoad = 0;
    })
    .catch( err => {

    });
  }


  selectSubcategory(subcat_id){
    this.subcat_id = subcat_id;
    var data = {
      subcategoryId: this.subcat_id,
      offset: 0,
      limit: 100
    };

    this.allProds = [];
    this.showLoad = 1;

    this.api.getProdBySubcat(data)
    .then( resp => {
       this.allProds = resp;
       this.showLoad = 0;
    })
    .catch( err => {

    });
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
    window.localStorage.setItem('cart', JSON.stringify(this.cartProd));
  	this.cartLength = 0;
  	for( var el in this.cartProd ) {
	    if( this.cartProd.hasOwnProperty( el ) ) {
	      this.cartLength += parseFloat( this.cartProd[el]['quantity'] );
	    }
  	}
  }

}
