import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
	cancPop:any = 0;
	cancRes:any = 0;
	itemPur:any;
	chatOpen:any = 0;
  cancPopCont:any = 0;
  orderId:any;
  orderDets:any;
  showPage:any = 0;
  lat:any;
  lng:any;
  delLat:any;
  delLng:any;
  origin:any;
  destination:any;
  ratePop:any = 0;
  ratingUser:any = 1;
  ordInt:any;
  rateModel:any = {};
  cancModel:any = {};
  blockModel:any = {};
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDetails();
        this.ordInt = setInterval(() => {
          this.getOrderDetails();
        }, 10000);
        // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  getOrderDetails(){
    var data = {
      order_id: this.orderId
    };
    this.api.getOrderById(data)
    .then(resp => {
      console.log(resp);
      this.orderDets = resp[0];
      this.showPage = 1;
      this.lat = parseFloat(resp[0].dropper.current_loc[0].lat);
      this.lng = parseFloat(resp[0].dropper.current_loc[0].lon);
      this.delLat = parseFloat(resp[0].delivery_lat);
      this.delLng = parseFloat(resp[0].delivery_lon);
      this.origin = { lat: this.lat, lng: this.lng };
      this.destination = { lat: this.delLat, lng: this.delLng };
      if(this.orderDets.status == 6){
        this.ratePop = 1;
        clearInterval(this.ordInt);
      }
      if(this.orderDets.status >= 6 && this.orderDets.shopper_rated == 1){
          this.router.navigate(['/dropper/home']);
        }
      // this.shopperReq = resp.shopperlist;
    })
    .catch(err => {

    });
  }

  mapReady(){

  }

  setOrderItemStatus(id){
    var data = {
      order_detail_id: id
    };
    this.api.updateItemStatus(data)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {

    });
  }

  updateOrderStatus(status){
    var data = {
      order_id: this.orderDets.id
    };
    this.api.updateOrderStatus(status, data)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {

    });
  }

  confirmDelivery(){
    var data = {
      order_id: this.orderDets.id
    };
    this.api.updateOrderStatus(6, data)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {

    });
  }
  
  cancelOrder(rel=1){
    var data = this.cancModel;
    data['order_id'] = this.orderId;
    console.log(data);
    this.api.cancelOrder(data)
    .then(resp => {
      if(rel == 1)
        this.router.navigate(['/shopper/home']);
    })
    .catch(err => {

    });
  }

  blockUser(){
    this.cancModel = {
      cancel_type: 4,
      cancel_reason: "Blocked by User"
    };

    this.cancelOrder(0);

    var data = {
      reported_user_id: this.orderDets.dropper.id,
      reason: this.blockModel.reason
    };

    this.api.blockUser(data)
    .then(resp => {
      this.router.navigate(['/shopper/home']);
    })
    .catch(err => {

    });
  }

  saveRating(){
    var data = this.rateModel;
    data['order_id'] = this.orderId;
    console.log(data);
    this.api.saveShopperRating(data)
    .then(resp => {
      this.router.navigate(['/dropper/home']);
    })
    .catch(err => {

    });
  }

  

}
