import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {
	orders:any;
  constructor(private api:ApiService) { }

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
      this.api.getAllDropperOrder(data)
      .then(resp => {
      	this.orders = resp;
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
    }

}