import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RangeValue } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotifyService } from '../../services/notify.service';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Component({
  selector: 'app-seldrop',
  templateUrl: './seldrop.page.html',
  styleUrls: ['./seldrop.page.scss'],
})
export class SeldropPage implements OnDestroy {

	defDist:any = 5;
  orderId:any;
  orderDets:any;
  lat:any;
  lng:any;
  maplat:any;
  maplng:any;
  radius:RangeValue = 5000;
  zoom:any = 12;
  ordTim:any;
  loadMap:any = 0;
  map:any;
  radChangEvent:any;
  droppers:any = [];
  showDroppers:any = 0;
  selDropper:any;
  dropperPopInfo:any = {};
  infoPop:any = 0;
  showCircle:any = 0;
  site_config:any;
  ProdImgUrl:any = "http://admin.favr.ie/uploads/";
  constructor(private router: Router, private route: ActivatedRoute, 
    private api: ApiService, private notify: NotifyService,
    private firebase: FirebaseX, 
    private _ngZone: NgZone) {
    
  }

  ionViewDidEnter() {
    this.site_config = JSON.parse(window.localStorage.getItem('config'));
    this.radius = this.site_config.def_min_shop_radius;
    this.infoPop = 0;
    this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDets();
        this.getDroppersList();
        this.firebase.onMessageReceived()
          .subscribe(data => {
            var messagebody = JSON.parse(data.message);
            console.log(messagebody);
            if(data.tap != undefined && !(window.location.pathname == '/'+messagebody.action_url)){
              this.router.navigate(['/'+messagebody.action_url]);
            }
            else if(data.tap == undefined && !(window.location.pathname == '/'+messagebody.action_url)){
              this.notify.notify(data);
            }
            if(messagebody.type == 'offer_update'){
              console.log('dropperList update');
              this._ngZone.run(() => {
                  this.getDroppersList();
              })
            }
        });
        // this.ordTim = setInterval(()=>{
        //   this.getOrderDets();
        // }, 60000)
        // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  getOrderDets(){
    var data = {
      order_id: this.orderId
    };
    this.api.getOrderById(data)
    .then( resp => {
       console.log(resp);
       this.orderDets = resp[0];
       if(resp[0].status == -1){
          alert('No shopper accepted the order. Delivery time reached. Order has been cancelled.');
          clearInterval(this.ordTim);
          this.router.navigate(['/shopper/home']);
       }
       this.lat = parseFloat(resp[0].delivery_lat);
       this.maplat = parseFloat(resp[0].delivery_lat);
       this.lng = parseFloat(resp[0].delivery_lon);
       this.maplng = parseFloat(resp[0].delivery_lon);
       this.radius = resp[0].radius * 1000;
       this.loadMap = 1;
    })
    .catch( err => {

    });
  }

  centerChanged(event){
    // this.maplat = event.lat;
    // this.maplng = event.lng;
    // console.log(event);
  }

  centerMap(){
    this.maplat = parseFloat(this.orderDets.delivery_lat);
    this.maplng = parseFloat(this.orderDets.delivery_lon);
    this.map.panTo({ 'lat': this.maplat, 'lng': this.maplng });

  }

  changeDist(event){
    console.log(event);
  	this.defDist = event.detail.value;
    this.radius = this.defDist * 1000;
    
    clearTimeout(this.radChangEvent);

    this.radChangEvent = setTimeout(() => {
        this.updateRadius(); 
    }, 5000);

  }

  mapReady(map){
    this.showCircle = 1;
    this.map = map;
  }

  updateRadius(){
    var data = {
      order_id: this.orderId,
      radius: this.defDist
    };

    this.api.updateOrderRadius(data)
    .then( resp => {
      this.droppers = resp;
    })
    .catch( err => {

    });

  }

  getDroppersList(){
    
    var data = {
      order_id: this.orderId
    };

    this.api.getAcceptedDroppers(data)
    .then( resp => {
      if(resp.status == 0){
        alert('No shopper accepted the order. Delivery time reached. Orderhas been cancelled.');
        this.router.navigate(['/shopper/home']);
      }
      else{
        this.droppers = resp.response;
        if(resp.length ){
          console.log(this.droppers);
          this.showDroppers = 1;
        }
        else{
          this.showDroppers = 0
        }
      }
    })
    .catch( err => {

    });
  }

  acceptDropper(){
    var data = {
      order_id: this.orderId,
      dropper_id: this.selDropper
    };

    this.api.acceptDropper(data)
    .then( resp => {
       this.router.navigate(['/shopper/track/'+resp.order_id]);
      // this.droppers = resp;
    })
    .catch( err => {

    });
  }

  showDropperInfo(dropper){
    this.dropperPopInfo = {
      'avg_rating': dropper.all_reviews.original[0].avg_rating,
      'all_ratings': dropper.all_reviews.original[0].all_ratings,
      'first_name': dropper.first_name,
      'last_name': dropper.last_name,
      'image_url': dropper.image_url,
    };
    this.infoPop = 1;
  }

  ionViewWillLeave(){
    // alert('unsub');
    // this.subscription.unsubscribe();
    clearInterval(this.ordTim);
  }

  ngOnDestroy(){
    // alert('unsub');
    // this.subscription.unsubscribe();
    clearInterval(this.ordTim);
  }



}
