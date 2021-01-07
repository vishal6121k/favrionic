import { Component, OnInit, NgZone } from '@angular/core';
import { RangeValue } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
@Component({
  selector: 'app-seldrop',
  templateUrl: './seldrop.page.html',
  styleUrls: ['./seldrop.page.scss'],
})
export class SeldropPage implements OnInit {

	defDist:any = 5;
  orderId:any;
  orderDets:any;
  lat:any;
  lng:any;
  radius:RangeValue = 5000;
  zoom:any = 15;
  loadMap:any = 0;
  radChangEvent:any;
  droppers:any = [];
  showDroppers:any = 0;
  selDropper:any;
  dropperPopInfo:any = {};
  infoPop:any = 0;
  showCircle:any = 0;
  constructor(private router: Router, private route: ActivatedRoute, 
    private api: ApiService,private firebase: FirebaseX, private _ngZone: NgZone) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDets();
        this.getDroppersList();
        this.firebase.onMessageReceived()
          .subscribe(data => {
            var messagebody = JSON.parse(data.message);
            console.log(messagebody);
            if(messagebody.type == 'offer_update'){
              console.log('dropperList update');
              this._ngZone.run(() => {
                  this.getDroppersList();
              })
            }
        });
        // setInterval(()=>{
        //   this.getDroppersList();
        // }, 10000)
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
       this.lat = parseFloat(resp[0].delivery_lat);
       this.lng = parseFloat(resp[0].delivery_lon);
       this.radius = resp[0].radius * 1000;
       this.loadMap = 1;
    })
    .catch( err => {

    });
  }

  centerMap(){
    this.lat = parseFloat(this.orderDets.delivery_lat);
   this.lng = parseFloat(this.orderDets.delivery_lon);
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

  mapReady(){
    this.showCircle = 1;
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
      this.droppers = resp;
      if(resp.length ){
        console.log(this.droppers);
        this.showDroppers = 1;
      }
      else{
        this.showDroppers = 0
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
      'last_name': dropper.last_name
    };
    this.infoPop = 1;
  }



}
