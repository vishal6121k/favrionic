import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {

	orders:any;
  constructor(private api:ApiService, private router: Router) { }


  ionViewWillEnter(){
    this.orders = [];
  }

  ionViewDidEnter() {
    this.getAllOrder();
  }

  getAllOrder(){
    // getFavrTransacList
    var data = {
      offset: 0,
      limit: 1000
    };
    this.api.getAllOrder(data)
    .then(resp => {
    	this.orders = resp;
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
  }


  cancelOrder(id){
    var data = {
      order_id: id
    };
    this.api.cancelOrderBefore(data)
    .then(resp => {
      alert('Order Cancelled');
      this.getAllOrder();
    })
    .catch(err => {
      console.log(err);
    });
  }

  reorder(dets){
    window.localStorage.setItem('cart', dets);
    this.router.navigate(['shopper/cart']);
  }

}
