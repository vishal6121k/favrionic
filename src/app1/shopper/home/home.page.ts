import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MiscService } from '../../services/misc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

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
    userSaved:any = "";
    popProds:any;
    reccProds:any;
    allProds:any;
    subcats:any;
    userDets:any;
    showSearch:any = 0;
    search_query:any = "";
    searchRes:any = [];
    loading:any;
    cartPop:any = 1;
    backSub:any;
    ProdImgUrl:any = "http://admin.favr.ie/uploads/";
  constructor(private router: Router, private platform: Platform, private route: ActivatedRoute, private misc: MiscService, private api: ApiService, public loadingController: LoadingController) { }
 
  ionViewDidEnter(){
    console.log("ABC");

    this.platform.ready().then(() => {
      this.registerBackAction();
    });

    this.route.params.subscribe(params => {
        if(params['comm'] == 'search'){
          this.showSearch = 1;
        }
    });
    console.log('HomePage: ngOnInit')
    this.getAllCategories();
    this.getPopularProds();
    this.getUserDetails();
    if(window.localStorage.getItem('cart')){
      if((window.localStorage.getItem('cart')) == null){
        this.cartProd = {};
      }
      else{
        this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
      }
    }
    else{
      this.cartProd = {};
    }
    this.cartTotal();
  }


  search(){
    if(this.search_query.length > 2){
      var data = {
        'productName': this.search_query,
        'limit': 1000,
        'offset':0
      };
      this.api.search(data)
      .then(resp => {
        this.searchRes = resp;
      })
      .catch(err => {

      });
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

  clearCart(){
    this.cartProd = {};
    this.cartTotal();
  }

  showAllProds(){
    var data = {
      offset: 0,
      limit: 100,
      showAll: 1
    };
    this.api.getPopularProds(data)
    .then( resp => {
       this.allProds = resp;
       this.cat_id = -1;
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

      this.userSaved = resp.user_saved_prod.split(',');

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

  getUserDetails() {
    this.userDets = this.misc.getUserDets();
    this.userSaved = this.userDets.saved_items.split(',');
      // this.api.getUserDetails()
      //     .then(resp => {
      //     this.userDets = resp;
      //     this.userSaved = resp.saved_items.split(',');
      // })
      //     .catch(err => {
      // });
  }

  showSearchBlock(event){
    this.showSearch = 1;
  }

  showLocBlock(event){
    if(event == 1){
      this.cartPop = 0;
    }
    else{
      this.cartPop = 1;
    }
  }


  getFavStat(product_id){
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  dismissLoading(){
    this.loading.dismiss();
  }

  registerBackAction(){
    let a =0;
    this.backSub = this.platform.backButton.subscribeWithPriority(9999, () => {
      if(this.showSearch == 1){
        this.showSearch = 0;
        this.router.navigate(['shopper']);
      }
      
        else{
          this.router.navigate(['/choose']);
        }
      // else if(this.forgPop == 1){
      //   this.forgPop = 0;
      // }
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
