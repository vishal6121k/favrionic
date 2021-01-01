import { Component, OnInit } from '@angular/core';
import { RangeValue } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-seldrop',
  templateUrl: './seldrop.page.html',
  styleUrls: ['./seldrop.page.scss'],
})
export class SeldropPage implements OnInit {

	defDist:any = 5;
  orderId:any;
  lat:any;
  lng:any;
  radius:RangeValue = 5000;
  zoom:any = 12;
  loadMap:any = 0;
  radChangEvent:any;
  droppers:any = [];
  selDropper:any;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDets();
        setInterval(()=>{
          this.getDroppersList();
        }, 10000)
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
       this.lat = parseFloat(resp[0].delivery_lat);
       this.lng = parseFloat(resp[0].delivery_lon);
       this.radius = resp[0].radius * 1000;
       this.loadMap = 1;
    })
    .catch( err => {

    });
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

}
